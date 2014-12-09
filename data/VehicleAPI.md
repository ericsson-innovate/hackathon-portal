#AT&T Drive Vehicle API

##Interfaces
- [Vehicle Information](#vehicle-information)
- [Navigation](#navigation)
- [Identity](#identity)
- [Application and System Settings](#application-and-system-settings)
- [Notifications ](#notifications )
- [Media](#media)
- [SMS](#sms)
- [Search service](#search-service)
- [Site Automation (Digital Life](#site-automation)

## Context initialization
Application must call the init function to setup the context of a given SDK before usage.
The callback function will be called by DEC to notify the application of any changes made to its data store space made by external applications or components.
`callback InterfaceCallback = void(object value, EventType eventType); ();`

For instance, if an application wants to use the vehicle information SDK, the application would have to call:
`init(appId, callBack, ["vehicleinfo","navigation"]);`

---

## <a name="vehicle-information"></a>Vehicle Information
This Javascript SDK allows retrieving and setting vehicle information.
The following interface represents a base interface to all vehicle properties (from W3C):

```javascript
interface VehicleInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (VehicleInterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
    readonly attribute Zone[] zones;
};
callback VehicleInterfaceCallback = void(object value, EventType eventType); ();

interface Zone {
    const String Front = "Front";
    const String Middle = "Middle";
    const String Right = "Right";
    const String Left = "Left";
    const String Rear = "Rear";
    const String Center = "Center";
                attribute String[] value;
    readonly    attribute Zone        driver;
    readonly    attribute Zone        passenger;
    Boolean equals (Zone zone);
    Boolean contains (Zone zone);
};

enum Availability {
"available",
"readonly",
"not_supported",           
"not_supported_yet",       
"not_supported_security",
"not_supported_policy",
"not_supported_other"
};

enum EventType {
"create",
"read",
"update",
"delete"
};

interface VehicleCommonDataType {
    readonly    attribute Zone         zone;
    readonly    attribute DOMTimeStamp timeStamp;
};
```

Object options can be of type Zone or extended options (to keep compatibility with W3C).
Optional parameter "options" allows filtering the set of attributes the method is applied to. For instance, chose logical or physical vehicle zone.

VehicleCommonDataType interface represents common data type for all vehicle data types.

### Vehicle properties
Below properties is a subset of possible attributes that a Vehicle Information Controller may support. More attributes shall be added in the next version of this SDK.

Vehicle properties that are not supported by a given VIC will not be returned in a get method performed on parent object but will trigger an error if methods (get, set, delete, subscribe) are called on a specific unsupported property.

|Parameter            |Type        |Required   |Read only   |Description   |
|--- |--- |--- |--- |--- |
|**Vehicle identification** |
|identification.vin    |String        |True    |Yes            |Vehicle |identification number    |
|identification.wmi |String |False |Yes |World Manufacture Identifier|
|identification.iccid |String |False |Yes |Integrated Circuit Card Identifier|
|identification.imsi |String |False |Yes |International Mobile Subscriber Identity|
|identification.tcusn |String |False |Yes |TCU Serial Number|
|identification.vehicleType |String |False |Yes |Vehicle type|
|identification.brand |String |False |Yes |Vehicle brand|
|identification.model |String |False |Yes |Vehicle model|
|identification.description |String |False |Yes |Model name description|
|identification.year |Integer |False |Yes |Vehicle model year|
|identification.deliveryMileage |Long |False |Yes |Odometer at delivery|
|identification.deliveryDate |Date |False |Yes |Sale date (retail)|
|identification.licenseNumber |String |False |Yes |License plate number|
|identification.transmissionNumber |String |False |Yes |Transmission serial number|
|identification.engineNumber |String |False |Yes |Serial number of the engine|
|identification.ignitionKeyNumber |String |False |Yes |Vehicle ignition key number|
|identification.doorKeyNumber |String |False |Yes |Door key number|
|identification.category |String |True |Yes |Sedan, SUV, …|
|identification.owner.id |String |True |Yes |Owner ID|
|identification.owner.type |String |True |Yes |Owner Type: subscriber, dealer, oem|
|**Vehicle equipment**    |
|devices |{array} |False |Yes |Vehicle devices: HU, TCU, Rear screens, DAC, etc|
|devices.deviceId |String |True |Yes |Device identifier|
|devices.description |String |False |Yes |Device description|
|devices.metas |{array} |False |Yes |Device metadata (array of attribute:value)|
|**Vehicle life cycle**    |
|lifecycle.status |String |True |Yes |Inventory, demo, trial, retail, service, junk|
|lifecycle.condition |String |False |Yes |Vehicle condition. Excellent, Good, Poor, Unknown.|
|**Vehicle configuration** |
|configuration.totalDoors |Integer |False |Yes |Number of doors|
|configuration.fuelType |String |False |Yes |Fuel type|
|configuration.refuelPosition |String |False |Yes |Side of the vehicle with access to the fuel door|
|configuration.color.interior |{array} |False |Yes |Vehicle interior colors|
|configuration.color.interior.colorCode |String |True |Yes |Color code|
|configuration.color.interior.colorName |String |False |Yes |Color description|
|configuration.color.exterior |{array} |False |Yes |Vehicle exterior colors|
|configuration.color.exterior.colorCode |String |True |Yes |Color code|
|configuration.color.exterior.colorName |String |False |Yes |Color description|
|configuration.transmissionType |String |False |Yes |Vehicle transmission type|
|configuration.weight |Float |False |Yes |Vehicle weight|
|configuration.options |{array} |False |Yes |Vehicle options (array of attribute: value)|
|**Vehicle status** |
|vehicleSpeed.speed |Integer |False |Yes |Vehicle speed (KM/h or MP/h|
|vehicleSpeed.averageSpeed |Integer |False |Yes |Estimated average speed in KM/h |
|vehicleCompass.direction |Float |False |Yes |Degree direction of the vehicle compass to be used by navigation identify the car direction| inside garage or when it is not moving|
|engineSpeed.speed |Integer |False |Yes |Engine RPM 10X1000.|
|transmission.transmissionMode |String |False |Yes |Transmission mode: P R N D |
|chime.status |Boolean |False |Yes |Chime status when a door is open: T/F|
|fuel.level |Integer |False |Yes |Fuel level as a percentage of fullness|
|fuel.range |Integer |False |Yes |Estimated fuel range in kilometers/miles (depending on unit configuration)|
|engineOil.remaining |Integer |False |Yes |Remaining engine oil as percentage of fullness|
|engineOil.temperature |Long |False |Yes |Engine Oil Temperature(in degrees Celsius)|
|engineOil.pressure |Integer |False |Yes |Engine Oil Pressure in PSi|
|engineOil.change |Boolean |False |Yes |Engine oil change indicator status|
|engineCoolant.level |Integer |False |Yes |Engine coolant level as percentage of fullness|
|engineCoolant.temperature |Integer |False |Yes |Engine coolant temperature(in degrees Celsius)|
|**Vehicle climate control** |
|climateControl.airflowDirection |String |False |No |Airflow direction: "frontpanel", "floorduct",   "bilevel", "defrostfloor"|
|climateControl.fanSpeedLevel |Integer |False |No |Fan speed of the air flowing (0: off, 1: weakest ~ 10: strongest )|
|climateControl.targetTemperature |Integer |False |No |Desired temperature(in degrees Celsius)|
|climateControl.airConditioning |Boolean |False |No |Air conditioning system T/F|
|climateControl.heater |Boolean |False |No |Heating system T/F|
|climateControl.seatHeater |Integer |False |No |Seat warmer (0: off, 1: least warm ~ 10: warmest)|
|climateControl.seatCooler |Integer |False |No |Seat ventilation (0: off, 1: least warm ~ 10: warmest)|
|climateControl.airRecirculation |Boolean |False |No |Air recirculation. (True : on, False : pulling in outside air)|
|climateControl.steeringWheelHeater |Integer |False |No |Steering wheel heater (0: off, 1: least warm ~ 10: warmest)|
|sideWindow.lock |Boolean |False |No |Whether or not the window is locked T/F|
|sideWindow.openness |Integer |False |No |Side window as a percentage of openness. (0:Closed, 100:Fully Opened)|
|**Driving safety** |
|door.status |String |False |Yes |Door status enum: "open", "ajar", "close"|
|door.lock |Boolean |False |No |Whether or not the door is locked T/F|
|airBagStatus.activated |Boolean |False |Yes |Whether or not the airbag is activated T/F|
|airBagStatus.deployed |Boolean |False |Yes |Whether the airbag is deployed T/F|
|seat.occupant |String |False |Yes |Status of seat occupant enum: "adult", "child", "vacant"|
|seat.seatbelt |Boolean |False |Yes |Whether or not the seat belt is fasten T/F|

##Get Vehicle information
**Usage:** `drive.vehicleinfo.get(options).then(resolve, reject);`

**Description:** The get method returns vehicle information object.

**Parameters:**
- {function} resolve - Function called with vehicle information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving vehicle information.
- {object} options Optional - "options" object corresponds to a Zone (See Zone data structure below) or any other {attribute : value} that will be used as a filter for returned result.
    
**Returns:** Promise

####Example: GET vehicle speed
```javascript
var vehicleinfo = drive.vehicleinfo;

function getVehicleSpeed(data){
  console.log(data.timeStamp +":"+ data.speed);
}

function logError(err){
  console.log("code:"+err.error+" message:"+ err.message);
}

function getVehicleSpeed(){
    vehicleinfo.vehicleSpeed.get().then(getVehicleSpeed,logError);
}
```

####Example: GET vehicle climate information (HVAC)
```javascript
var vehicleinfo = drive.vehicleinfo;

function logHVAC(data){
  console.log(data.targetTemperature+","+data.airConditioning);
}

function logError(error){
  console.log(error);
}

function getClimateInfo(){
 vehicleinfo.climateControl.get(zone.driver).then(logHVAC,logError);
}
```

####Example: GET door status
```javascript
var vehicleinfo = drive.vehicleinfo;

function getDoorStatus(door){
  console.log(door.status);
}

function logError(error){
  console.log(error);
}

function getDoorStatus(){
 vehicleinfo.door.get(zone.passenger).then(getDoorStatus,logError);
}
```

####Example: GET all vehicle information
```javascript
var vehicleinfo = drive.vehicleinfo;

function logVehicleInfo(data){
  console.log(data);
}

function logError(error){
  console.log(error);
}

function getVehicleInfo(){
     vehicleinfo.get().then(logVehicleInfo,logError);
}
```

##Set Vehicle information
**Usage:** `drive.vehicleinfo.set(settings,options).then(resolve, reject);`

**Description:** The set method allows setting some vehicle parameters like climate control (HVAC).

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options - Optional "options" object corresponds to a Zone (See Zone data structure above) or any other attribute value that will be used as a filter to limite update scope.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

####Example: lock driver side door
```javascript
var zone = Zone;
var vehicleinfo = drive.vehicleinfo;

function resolve(){
///success 
}

function reject(error){
  console.log(error);
}

function setVehicleInfo(){
vehicleinfo.door.set({"lock":true},zone.driver).then(resolve,reject);
}
```

####Example: turn on AC
```javascript 
var zone = new Zone;
var vehicleinfo = drive.vehicleinfo;
var zones = vehicleinfo.climateControl.zones;

for(var i in zones)
{
   if(i.equals(zone.driver))
   {
      var value = {};
      value["acStatus"] = true;
      vehicleinfo.climateControl.set(value,zone.driver).then(   
          function(){
             console.log("successfully set acStatus");
          },
          function(error) {
              console.log("there was an error");
          }
      );
   }        
}
```

###Delete vehicle information settings
**Usage:** `drive.vehicleinfo.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

> Note: in the current data model there is no attribute that requires delete settings. This method should be supported for tha sake of uniformity and future use.

###Subscribe to vehicle information
**Usage:** `handle = drive.vehicleinfo.subscribe(callBack, options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with vehicle information data object. See data object format below.
- {object} options Optional - "options" object corresponds to a Zone or any other attribute value that will be used as a filter to limite subscription scope.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to vehicle speed
```javascript
function logSpeedInfo(vehicleSpeed){
  console.log(vehicleSpeed.speed);
}

function subscribe(){
     handle=drive.vehicleinfo.vehicleSpeed.subscribe(logSpeedInfo);
}
```

####Example: subscribe to any vehicle information
```javascript
function logVehicleInfo(data){
  console.log(data);
}

function subscribe(){
     handle=drive.vehicleinfo.subscribe(logVehicleInfo);
}
```

###Unsubscribe from vehicle information
**Usage:** `drive.vehicleinfo.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example:
```javascript
function unsubscribe(){
    drive.vehicleinfo.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.vehicleinfo.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes. See policy manager section for more details.

**Parameters:**
- None.

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example:
```javascript
function isAvailable(){
    return drive.vehicleinfo.vehicleSpeed.available();
}
```

## <a name="navigation"></a>Navigation
This Javascript SDK allows interacting with navigation system.
The following interface represents a base interface to all navigation properties:
```javascript
interface NavigationInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```
CommonDataType interface represents common data type for all data types

###Navigation properties

Below properties is a subset of possible attributes that a navigation system may support. More attributes shall be added in the next version of this SDK. Navigation properties that are not supported by a given navigation system will not be returned in a get method performed on parent object but will trigger an error if methods (get, set, subscribe, delete) are called on a specific unsupported property.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|**Current positon**|
|position.latitude|Float|False|Yes|
|position.longitude|Float|False|Yes|
|position.altitude|Float|False|Yes|Location altitude in meters|
|position.heading|Float|False|Yes|Azimuth values calculated in degree with reference to north |
|position.velocity|Integer|False|Yes|GPS estimated velocity (in km/h).|
|position.precision |Float|False|Yes|GPS position precision |
|**Current destination**|
|destination.id|String|False|No|Destination ID|
|destination.name|String|False|No|Destination name |
|destination.selected|Boolean|Yes|No|This flag is ture if the destination object is selected on the map, other wise false. The default is false|
|destination.street|String|False|No|Destination street including street number|
|destination.city|String|False|No|Destination city|
|destination.region|String|False|No|Destination state/province|
|destination.country|String|False|No|Destination Country|
|destination.postalCode|Integer|False|No|5 digits ZIP code or postalCode alphanumeric|
|destination.display.latitude|Float|False|No|Displayed latitude in degrees|
|destination.display.longitude|Float|False|No|Displayed longitude in degrees|
|destination.display.altitude|Float|False|No|Displayed altitude in meters|
|destination.routing.latitude|Float|False|No|Routing latitude in degrees|
|destination.routing.longitude|Float|False|No|Routing Longitude in degrees|
|destination.routing.altitude|Float|False|No|Routing altitude in meters|
|destination.phone|String|False|No|Primary destination phone number|
|destination.type |String|False|No|list of POI type|
|destination.categories|{array}|False|No|POI categories. Example: ["grossery", "gas station"]|
|destination.comments|String|False|No|Comments on distination|
|destination.link|String|False|No|POI URL|
|destination.symbol|String|False|No|Symbol (icon)|
|destination.formattedAddress|String|False|No|Full address format based on the country|
|destination.metas|{array}|False|No|Array of {attribute: value}|
|**Current location**|
|location.id|String|False|No|Current location ID|
|location.name|String|False|No|Current location name |
|location.street|String|False|No|Current location street including street number|
|location.city|String|False|No|Current location city|
|location.region|String|False|No|Current location state/province|
|location.country|String|False|No|Current location Country|
|location.postalCode|Integer|False|No|5 digits ZIP code or postalCode alphanumeric|
|**Navigation session information**|
|session.timeToDestination|Integer|False|Yes|Estimated remaining time to arrive at |destination in minutes |
|session.arrivalTime|Date|False|Yes|Estimated arrival time |
|session.distanceToDestination|Integer|False|Yes|Remaining distance to destination in km|
|session.speedLimit|Integer|False|Yes|Current speed limit in km/h|
|session.started|Boolean|True|No|Navigation session started|
|**Current routes**|
|routes|{array}|False|No|Current route|
|route.name|String|False|No|Route name|
|routes.selected|Boolean|Yes|No|This flag is ture if the route object is selected on the map, other wise false. The default is false|
|routes.bounds|{object}|False|No|Route bounding box|
|routes.distance|Float|False|No|Route distance in meters|
|routes.delay|Float|False|No|Total delay time in seconds|
|routes.waypoints|{array}|False|No|Way points array|
|routes.waypoints.latitude|Float|False|No|Track latitude in degrees|
|routes.waypoints.longitude|Float|False|No|Track Longitude in degrees|
|routes.waypoints.altitude|Float|False|No|Track altitude in meters|
|routes.waypoints.time|Date|False|No|Track Date/time|
|routes.waypoints.name|String|False|No|Track name|
|routes.waypoints.description|String|False|No|Track description|
|routes.waypoints.symbol|String|False|No|Track symbol: dot, crossing, etc.|
|routes.waypoints.type|String|False|No|Track type: crossing, intersection|
|routes.waypoints.visible|Boolean|False|No|When set to True route waypoint will be visible on the map|
|routes.metas|{array}|False|No|Array of {attribute: value}|
|**Tracking waypoints**|
|track|{object}|No|No|Tracking waypoints|
|track.name|String|Yes|Yes|
|track.selected|Boolean|Yes|No|This flag is ture if the track object is selected on the map, other wise false. The default is false|
|track.waypoints|{array}|Yes|No|Array of waypoints|
|track.waypoints.latitude|Float|False|Yes|Track latitude in degrees|
|track.waypoints.longitude|Float|False|Yes|Track Longitude in degrees|
|track.waypoints.altitude|Float|False|Yes|Track altitude in meters|
|track.waypoints.heading|Float|False|Yes|Azimuth values calculated in degree with reference to north|
|track.waypoints.velocity|Integer|False|Yes|Speed in km/h|
|track.waypoints.time|Date|False|Yes|Track Date/time|
|track.waypoints.name|String|False|Yes|Track name|
|track.waypoints.description|String|False|Yes|Track description|
|track.waypoints.symbol|String|False|Yes|Track symbol: dot, crossing, etc.|
|track.waypoints.type|String|False|Yes|Track type: crossing, intersection|
|track.waypoints.visible|Boolean|False|Yes|When set to True track waypoint will be visible on the map|
|track.metas|{array}|False|Yes|Array of {attribute: value}|
|**Current POIs**|
|pois|{array}|False|No|Array of POIs|
|pois.id|String|False|No|POI ID|
|pois.name|String|False|No|POI name |
|pois.selected|Boolean|Yes|No|This flag is ture if the POI object is selected on the map, other wise false. The default is false|
|pois.street|String|False|No|Street|
|pois.city|String|False|No|City|
|pois.region|String|False|No|state/province|
|pois.postalCode|String|False|No|5 digits ZIP code or postalCode alphanumeric|
|pois.country|String|False|No|Country|
|pois.formattedAddress|String|False|No|Full address format based on the country|
|pois.latitude|Float|False|Yes|
|pois.longitude|Float|False|Yes|
|pois.altitude|Float|False|Yes|Location altitude in meters|
|pois.heading|Float|False|Yes|Azimuth values calculated in degree with reference to north |
|pois.velocity|Integer|False|Yes|POI speed (in km/h).|
|pois.phone|String|False|No|Phone number|
|pois.type|String|False|No|POI type/category|
|poi.categories|{array}|False|No|POI categories. Example: ["grossery", "gas station"]|
|pois.comments|String|False|No|General comments|
|pois.link|String|False|No|POI URL|
|pois.symbol|String|False|No|POI symbol|
|pois.visible|Boolean|False|No|When set to True POI will be visible on the map|
|pois.|destination|{object}|False|No|POI object representing the |destination (same format as current |destination).|
|pois.timeToExpire|Integer|False|No|Time to expire the POI in seconds|
|pois.metas|{array}|False|No|Array of {attribute: value}|
|**POI Tracking Waypoints** |
|pois.track.name|String||Yes|
|pois.track.selected|Boolean|Yes|No|This flag is ture if the |track object is selected on the map, other wise false. The default is false|
|pois.track.waypoints|{array}|False|No|Waypoints array|
|pois.track.waypoints.latitude|Float|False|Yes|Track latitude in degrees|
|pois.track.waypoints.longitude|Float|False|Yes|Track Longitude in degrees|
|pois.track.waypoints.altitude|Float|False|Yes|Track altitude in meters|
|pois.track.waypoints.heading|Float|False|Yes|Azimuth values calculated in degree with reference to north|
|pois.track.waypoints.velocity|Integer|False|Yes|Speed in km/h|
|pois.track.waypoints.time|Date|False|Yes|Track Date/time|
|pois.track.waypoints.name|String|False|Yes|Track name|
|pois.track.waypoints.description|String|False|Yes|Track description|
|pois.track.waypoints.symbol|String|False|Yes|Track symbol: dot, crossing, etc.|
|pois.track.waypoints.type|String|False|Yes|Track type: crossing, intersection|
|pois.track.waypoints.visible|Boolean|False|Yes|When set to True |track waypoint will be visible on the map|
|pois.track.metas|{array}|False|Yes|Array of {attribute: value}|
|map.zoomLevel|Integer|False|No|0 to 20+ (20 is street level)|
|map.zoomToPoiType|{array}|False|No|"String array of POI types: This makes the map to zoom in/out so that all POI of specified types are visible. Values: Empty array/null: normal mode [“all”]: zoom to all POI types [“all”, “<me>”]: all POI type and include the vehicle. [“type1”,”type2”,…]: zoom to specified POI types (parking, restaurant, etc). POI type <me> refers to the vehicle."|
|map.zoomToPoiId|String|False|No|POI ID: This makes the map to zoom in/out so that specified poi ID becomes visible (center to).|
|map.follow|String|False|No|"Make map follow a specific POI name instead of following the car. Values: “<me>” empty null: follow vehicle <poi ID>: follow specified POI ID. This parameter should be ignored if the specified POI ID does not exist."|


###Get Navigation Information
**Usage:** `drive.navigation.get(options).then(resolve, reject);`

**Description:** The get method returns navigation information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with navigation information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving navigation information.

**Returns:** Promise

####Example: get current position
```javascript
function getPosition(position){
console.log(position.latitude+","+position.longitude+","+ position.altitude+","+position.direction;
}

function logError(error){
   console.log(error);
}

function getPositionInfo(){
     drive.navigation.position.get().then(getPosition,logError);
}
```

####Example: get all navigation information
```javascript
function getNavigationInfo(data){
   console.log(data);
}

function logError(error){
   console.log(error);
}

function getNavigationInfo(){
     drive.navigation.get().then(getNavigationInfo,logError);
}
```

###Set Navigation information
**Usage:** `drive.navigation.set(settings,options).then(resolve, reject)`

**Description:** The set method allows setting some navigation parameters like destination.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

####Example: set new destination by poi
```javascript
var settings = {"poi":"DFW Airport"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
   drive.navigation.destination.set(settings).then(resolve,reject);
}
```

####Example: set new destination by latitude and Longitude
```javascript
var settings = {"latitude":45.5009320, "longitude":-73.6628050};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
   drive.navigation.destination.routing.set(settings).then(resolve,reject);
}
```

####Example: add new poi to the map and make it visible
```javascript
var settings = {"poi":"DFW Airport", "visible": true};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
   drive.navigation.pois.set(settings).then(resolve,reject);
}
```

####Example: Hide POI
```javascript
var settings = {"poi":"DFW Airport", "visible": false};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
   drive.navigation.pois.set(settings).then(resolve,reject);
}
```

####Example: Start navigation session
```javascript
var settings = {"started":true};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
   drive.navigation.session.set(settings).then(resolve,reject);
}
```

###Delete Navigation settings
**Usage:** `drive.navigation.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting navigation information.

**Returns:** Promise

####Example: delete a specific poi
```javascript
var settings = {"poi":"DFW Airport"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
  drive.navigation.pois.delete(settings).then(resolve,reject);
}
```

####Example: delete all POIs by type (parking)
```javascript
var settings = {"type":"parking"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setNavigationInfo(){
  drive.navigation.pois.delete(settings).then(resolve,reject);
}
```

###Subscribe to navigation information
**Usage:** `handle = drive.navigation.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with navigation information data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle

Subscribe returns handle to subscription or 0 if error. 
####Example: subscribe to destination
```javascript
function getDestinationInfo(data){
  console.log(data.latitude+":"+data.Longitude);
}

function subscribe(){
handle=drive.navigation.destination.subscribe(getDestinationInfo);
}
```

###Unsubscribe from navigation information
**Usage:** `drive.navigation.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example:
```javascript
function unsubscribe(){
     drive.navigation.destination.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.navigation.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes.
See policy manager section for more details.

**Parameters:**
- None

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example:
```javascript
function isAvailable(){
    return drive.navigation.destination.available();
}
```

##<a name="identity"></a>Identity
This Javascript SDK allows interacting with Identity Manager.
The following interface represents a base interface to all identity properties:
```javascript
 interface IdentityInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```
- CommonDataType interface represents common data type for all data types.

###Identity properties
Below properties is a subset of possible attributes that identity manager supports. More attributes shall be added in the next version of this SDK.

|Parameter |Type |Required |Read only |Description|
|---    |---    |---    |---    |--- |
|**Current Session** |
|session.loggedInTime  |Long |False     |Yes |Session duration in milliseconds |
|session.timeOut |Long |False |Yes |Session timeout in milliseconds |
|session.loggedIn |Boolean |True |Yes |Set to true is user is logged in.|
|session.reset |Boolean |False |No |When reset is true, the user should be prompted to change PIN. Default is false.|
|session.login |{array} |False |No |Request to login. Identity manager will remove this request when processed and set loggedIn to true if susccessfull. |
|session.login.userId |String |True |No |userId |
|session.login.pin |String |True |No |PIN|
|session.login.oldPin |String |False |No |If specified, identity manager will change current oldPin with specified PIN.|
|session.status |String |False |Yes |Status of current login request. Possible values: connecting, connected or failure: with error message|
|**Current User**| 
|currentUser |{object} |True |Yes |Current user info|
|currentUser.uid |String |True |Yes |If not specified subscriber identifier is automatically generated (unique identifier).|
|currentUser.language |String |False |No |User preferred language|
|currentUser.firstName |String |False |Yes | 
|currentUser.lastName |String |False |Yes |
|currentUser.middleName |String |False |Yes |
|currentUser.namePrefix |String |False |Yes |
|currentUser.picture |String |False |Yes |URI (Link) to picture|
|currentUser.dob |Date |False |Yes |Date of birth|
|currentUser.owner |Boolean |False |Yes |Owner of the vehicle if set to true.|
|currentUser.company |String |False |Yes |Company name|
|currentUser.address.default |{object} |False |Yes |Default address|
|currentUser.address.default.addressType |String |True |Yes |Address type: home, work.|
|currentUser.address.default.street |String |False Yes |
|currentUser.address.default.city |String |True Yes |
|currentUser.address.default.region |String |False |Yes |State, province or region|
|currentUser.address.default.country |String |False |Yes| 
|currentUser.address.default.postalCode |String |False |Yes zip or postalCode|
|currentUser.address.default.metas |{array} |False |Yes, Array of {attribute: value}|
|currentUser.addresses |{array} |False |Yes |Array of other addresses. Same attributes as default address.|
|currentUser.default.phone |{object} |False |Yes | Default phone|
|currentUser.default.phone.phoneType |String |False |Yes | Phone type: mobile, home, work, etc.|
|currentUser.default.phone.phoneNumber |String |True |Yes| 
|currentUser.default.phone.deviceId |String |False |Yes |DeviceId from device repository|
|currentUser.default.phone.metas |{array} |False |Yes Array of {attribute: value}|
|currentUser.phones |{array} |False |Yes |Array of phones (same attribute as default phone).|
|currentUser.default.email |{object} |False |Yes |Default email.|
|currentUser.default.email.emailType |String |False |Yes | Email type: personal, work, etc.|
|currentUser.default.email.emailAddress |String |True |Yes| 
|currentUser.default.email.metas |{array} |False |Yes |Array of {attribute: value}|
|currentUser.emails |{array} |False |Yes |Other emails (same attributes as default email).|
|currentUser.metas |{array} |False |Yes |Array of {attribute: value}|
|currentUser.groups |{object} |False |Yes |Contact groups array|
|currentUser.groups.id |String |True |Yes |Group identifier|
|currentUser.groups.name |String |True |Yes |Group name|
|currentUser.contacts |{object} |False |Yes |Contacts array|
|currentUser.contacts.uid |String |True |Yes |User identifier|
|currentUser.contacts.firstName |String |False |Yes |First name|
|currentUser.contacts.lastName |String |False |Yes| Last name|
|currentUser.contacts.middleName |String False yes Middle name|
|currentUser.contacts.namePrefix |String |False |Yes |Name prefix|
|currentUser.contacts.picture |String |False |Yes |URI (link) to picture|
|currentUser.contacts.dob |Date |False |Yes |Date of birth|
|currentUser.contacts.company |String |False |Yes |Company name|
|currentUser.contacts.address |{object} |False |Yes Array of addresses|
|currentUser.contacts.address.id |String |True |Yes Address identifier|
|currentUser.contacts.address.type |String |False |Yes |Address type: home, work, ...|
|currentUser.contacts.address.street |String |False |Yes |Address street number, name, apartment, etc.|
|currentUser.contacts.address.city |String |False |Yes |City name|
|currentUser.contacts.address.region |String |False |Yes State, province, …|
|currentUser.contacts.address.country |String |False |Yes |Country name|
|currentUser.contacts.address.postalCode |String |False |Yes |Postal/Zip code|
|currentUser.contacts.address.metas |{array} |False |Yes |Array of {key, value} objects|
|currentUser.contacts.address.defaultAddress |{object} |False |Yes |Primary address object| 
|currentUser.contacts.phone |{object} |False |Yes |Array of phones|
|currentUser.contacts.phone.id |String |True |Yes |Phone identifier|
|currentUser.contacts.phone.type |String |False |Yes |Phone type: mobile, home, work, …|
|currentUser.contacts.phone.number |String |True |Yes |Phone number|
|currentUser.contacts.phone.deviceId |String |False |Yes |Device identifier. Refers to device repository.|
|currentUser.contacts.phone.metas |{array} |False |Yes |Array of {key, value} objects|
|currentUser.contacts.phone.defaultPhone |{object} |False |Yes |Primary phone object|
|currentUser.contacts.email |{object} |False |Yes |Array of emails|
|currentUser.contacts.email.id |String  |True |Yes |Email identifier|
|currentUser.contacts.email.type |String |False |Yes |Email type: mobile, home, work, …|
|currentUser.contacts.email.address |String |True |Yes |Email address|
|currentUser.contacts.email.metas |{array} |False |Yes |Array of {key, value} objects|
|currentUser.contacts.email.defaultEmail |{object} |False |Yes |Primary email object|
|currentUser.contacts.groupId |String |False |Yes |Group identifier|
|**User accounts** |
|users.accounts |{object} |False |Yes |Application accounts (credentials to login to application’s backend system)|
|users.accounts.appId |String |True |Yes |Application ID|
|users.accounts.userId |String |True |Yes |User identification|
|users.accounts.authToken |String |True |Yes |Password, PIN, token.|
|users.accounts.authMethod |String |True |Yes |Basic authentication, oAuth, etc.|
|users.accounts.reset |Boolean |True |Yes |When reset is true, the user should be prompted to change PIN. Default is false.|
|**vehicle users**| 
|users |{array} |False |Yes |Array of subscribers (vehicle users). Same attribute as currentUser.|


###Get Identity Information
**Usage:** `drive.identity.get(options).then(resolve, reject);`

**Description:** The get method returns identity information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with identity information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving identity information.

**Returns:** Promise

####Example: get current user
```javascript
function logIdentityInfo(currentUser){
   console.log("userId:"+currentUser.uid);
}

function logError(error){
   console.log(error);
}

function getIdentityInfo(){
  drive.identity.currentUser.get().then(logIdentityInfo,logError);
}
```

####Example: Check if user is logged in
```javascript
function logIdentityInfo(session){
   console.log("user logged in:"+session.loggedIn);
}

function logError(error){
   console.log(error);
}

function getIdentityInfo(){
  drive.identity.session.get().then(logIdentityInfo,logError);
}
```

###Set Identity information
**Usage:** `drive.identity.set(settings,options).then(resolve, reject);`

**Description:** The set method allows setting some identity parameters like user preferences.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

####Example: trigger user login
```javascript
var settings = {"loggedIn":true};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function login(){
   drive.identity.session.set(settings).then(resolve,reject);
}
```

###Delete Identity settings
**Usage:** `drive.identity.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

>Note: in the current data model there is no attribute that requires delete settings. This method should be supported for tha sake of uniformity and future use.

###Subscribe to Identity information
**Usage:** `handle = drive.identity.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with identity information data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: get notification when user logs in
```javascript
function userLoggedIn(loggedIn){
  if (loggedIn){ console.log("user logged in");}
}

function subscribe(){
handle=drive.identity.session.loggedIn.subscribe(userLoggedIn);
}
```

###Unsubscribe from Identity information
**Usage:** `drive.identity.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle -"handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.identity.currentUser.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.identity.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes.
See policy manager section for more details.

**Parameters:**
- None

**Returns:** String
- "available": resource is available (read/write).
-"readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit
-"not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.identity.currentUser.available();
}
```

## <a name="application-and-system-settings"></a>Application and System Settings
This Javascript SDK allows managing application and system settings. Applications can use this SDK to store and retrieve their own settings and benefit from built in data events handling.

The following interface represents a base interface to all system/application properties:
```javascript
interface SettingsInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```

- CommonDataType interface represents common data type for all data types.

###System properties
Below properties is a subset of possible attributes that system settings support. More attributes shall be added in the next version of this SDK.

|Parameter |Type |Required |Read only |Description|
|---    |---    |---    |---    |--- |
|system.baseUrl |String |True |Yes |ASDP base URL in the following format: https://asdphost:port/ |
|system.language |String |True |No |Default system language|
|system.metric |Boolean |True |No |Unit of mesure Metric (True)|

###Application properties
Application properties shall start with application name.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|{appname}|{object}|False|No|Application name: application specific properties.|
|{appname}.users|{array}|False|No|User preferences for appname|
|{appname}.users.{object}|{object}|False|No|User preferences|
|{appname}.{object}|{object}|False|No|Global application preferences|
|**Application user UI settings**|
|{appname}.ui|{object}|False|No|UI presentation|
|{appname}.ui.categories|{object}|False|No|UI presentation section|
|{appname}.ui.categories.uiType|String|Fase|No|UI type maps to a UI presentation construct or style|
|{appname}.ui.categories.title|String|False|No|Cateory title|
|{appname}.ui.categories.description|String|False|No|Cateory description or hint|
|{appname}.ui.categories.options|{object}|False|No|Category aspect option (future use)|
|{appname}.ui.categories.properties|{array}|False|No|Array of properties for a given category|
|{appname}.ui.categories.properties.propertyId|String|False|No|Refers to full qualified property (|{appname}.{object}…)|
|{appname}.ui.categories.properties.uiType|String|False|No|UI type maps to a UI presentation construct or style|
|{appname}.ui.categories.properties.title|String|False|No|Property title or label|
|{appname}.ui.categories.properties.defualtIndex|Integer|False|No|Position in the options or possible values|
|{appname}.ui.categories.properties.options|{array}|False|No|Possible values|
|{appname}.ui.categories.properties.options.name|String|False|No|Value name or label|
|{appname}.ui.categories.properties.options.value|{type}|False|No|Actual value |
|{appname}.ui.categories.properties.options.uiType|String|False|No|UI type maps to a UI presentation construct or style|
|{appname}.ui.categories.properties.validation|{object}|False|No|Validation object|
|{appname}.ui.categories.properties.validation.required|Boolean|False|No|True means required property|
|{appname}.ui.categories.properties.validation.min|Float|False|No|Min value for numeric and min length for alphanumeric |
|{appname}.ui.categories.properties.validation.max|Float|False|No|Max value for numeric and max length for alphanumeric|
|{appname}.ui.categories.properties.validation.type|String|False|No|Predefined types: email, password, url, date, number, digits|

###Vehicle information user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|Vehicleinfo|{object}|False|No|Vehicle information user settings|
|vehicleinfo.users.unitsOfMeasure|{object}|False|No|Units of mesure.|
|vehicleinfo.users.unitsOfMeasure.metric|Boolean|False|No|True: metric|
|vehicleinfo.users.unitsOfMeasure.unitsFuelVolume|String|False|No|litter or gallon|
|vehicleinfo.users.unitsOfMeasure.unitsDistance|String|False|No|km or mile|
|vehicleinfo.users.unitsOfMeasure.unitsSpeed|String|False|No|km/h or mph|
|vehicleinfo.users.unitsOfMeasure.unitsFuelConsumption|String|False|No|l/100, mpg, km/l|
|vehicleinfo.users.mirror.mirrorTilt|short|False|No|Mirror tilt position in percentage distance travelled, from downward-facing to upward-facing position (Unit: percentage, Resolution: 1, Min: -100, Max: 100, 0 represents center position)|
|vehicleinfo.users.mirror.mirrorPan|short|False|No|Mirror pan position in percentage distance travelled, from left to right position (Unit: percentage, Resolution: 1, Min: -100, Max: 100, 0 represents center position)|
|vehicleinfo.users.steeringWheel.steeringWheelTelescopingPosition|Integer|False|No|Steering wheel position as percentage of extension from the dash (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents steering wheel positioned closest to dash)|
|vehicleinfo.users.steeringWheel.steeringWheelPositionTilt|Integer|False|No|Steering wheel position as percentage of tilt (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents steering wheel tilted lowest downward-facing position)|
|vehicleinfo.users.driveMode|String|False|No|""comfort",  "auto", "sport", "eco", "manual""|
|vehicleinfo.users.seatAjustment.reclineSeatBack|short|False|No|Seat back recline position as percent to completely reclined (Unit: percentage, Resolution: 1, Min: -100, Max: 100, center 0 represents the seatback upright at a 90 degree angle)|
|vehicleinfo.users.seatAjustment.seatSlide|Integer|False|No|Seat slide position as percentage of distance travelled away from forwardmost position (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents seat position farthest forward)|
|vehicleinfo.users.seatAjustment.seatCushionHeight|Integer|False|No|Seat cushion height position as a percentage of upward distance travelled (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents the lowest seat position)|
|vehicleinfo.users.seatAjustment.seatHeadrest|Integer|False|No|Headrest position as a percentage of upward distance travelled (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents the lowest headrest position)|
|vehicleinfo.users.seatAjustment.seatBackCushion|Integer|False|No|Back cushion position as a percentage of lumbar curvature (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents flat, and 100 is maximum curvature)|
|vehicleinfo.users.seatAjustment.seatSideCushion|Integer|False|No|Sides of back cushion position as a percentage of curvature (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents flat, and 100 is maximum curvature)|
|vehicleinfo.users.dashboardIllumination|Integer|False|No|Illumination of dashboard as a percentage (Unit: percentage, Resolution: 1, Min: 0, Max: 100, 0 represents none and 100 maximum illumination)|
|vehicleinfo.users.vehicleSound.activeNoiseControlMode|Boolean|False|No|Active noise control status (False: not-activated, True: activated)|
|vehicleinfo.users.vehicleSound.engineSoundEnhancementMode|String|False|No|Engine sound enhancement mode where a null string means not-activated, and any other value represents a manufacture specific setting|

###Navigation user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|navigation|{object}|False|No|Navigation user settings|
|navigation.users.destinations|{array}|False|No|Favorite destinations (See navigation destination data type)|
|navigation.users.pois|{array}|False|No|Array of favorite POIs (See navigation POI data type)|
|navigation.users.routing.calculation|String|False|No|fastest, shortest, offroad|
|navigation.users.routing.avoiding|{array}|False|No|String array: ["tollways", "highways","parkways"]|

###Identity user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|identity|{object}|False|No|Indentity manager user settings|
|identity.users.session.autoLogout|Boolean|False|No|Auto logout when set to true|
|identity.users.session.timeout|Integer|False|No|Number of seconds being idle before logging out.|

###Notification user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|notification|{object}|False|No|Notification manager user settings|
|notification.users.silent|Boolean|False|No|When set to true, notifications will not be read out|
|notification.users.apps|{array}|False|No|Array of applications|
|notification.users.apps.silent|Boolean|False|No|When set to true, notifications will not be read out for specific application|
|notification.users.apps.keepNumber|Integer|False|No|Number of messages to keep|
|notification.users.apps.keepDays|Integer|False|No|Number of days messages are kept|

###Media user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|media|{object}|False|No|Media manager user settings|
|media.users.autoplay|Boolean|False|No|Autoplay after login|
|media.users.favorite|{array}|False|No|Array of favorite media files|

###Search user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|search|{object}|False|No|Search controller user settings|
|search.users.history.maxItem|Integer|False|No|Search request history max items|
|search.users.history.requests|{array}|False|No|Array of search requests|

###Application user settings

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|apps|{object}|False|No|Application manager user settings|
|apps.users.favorite|{array}|False|No|Array of favorite apps|

###Get System/Application User Settings
**Usage:** `drive.settings.get(options).then(resolve, reject);`

**Description:** The get method returns system information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters on returned data.
- {function} resolve - Function called with system/application information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving system/application information.

**Returns:** Promise

####Example: get default language
```javascript
function logLanguage(language){
   console.log(language);
}

function logError(error){
   console.log(error);
}

function getDefaultLanguage(){
  drive.settings.system.language.get().then(logLanguage,logError);
}
```

####Example: get baseURL
```javascript
function logBaseURL (baseUrl){
   console.log(language);
}

function logError(error){
   console.log(error);
}

function getBaseURL(){
  drive.settings.system.baseUrl.get().then(logBaseURL,logError);
}
```

####Example: get vehicle seat adjustment user preferences
```javascript
var userSettings = drive.settings.vehicleinfo.users;
var user = {"userId":"user1"};

function getSeatPrefs(seatAjustment){
   console.log(seatAjustment);
}

function logError(error){
   console.log(error);
}

function getUserSeatSettings(){

userSettings.seatAjustment.get(user).then(getSeatPrefs,logError);
}
```

####Example: get navigation latest destination user preferences
```javascript
var userSettings = drive.settings.navigation.users;
var user = {"userId":"user1"};

function getDestPrefs(dest){
   console.log(dest);
}

function logError(error){
   console.log(error);
}

function getUserLastDestination(){

userSettings.destination.get(user).then(getDestPrefs,logError);
}
```

###Set System/Application User Settings
**Usage:** `drive.settings.set(settings,options).then(resolve, reject);`

**Description:** The set method allows set system/application configuration (settings).

**Parameters:**
- {object} settings - Settings object value (attributes values).
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting policy information.

**Returns:** Promise

####Example: system settings
```javascript
var language = {"language":"en"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setDefaultLanguage(){
   drive.settings.system.set(language).then(resolve,reject);
}
```

####Example: Application global settings
```javascript
var settings = {"timeout":2000};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setTimeout(){
   drive.settings.sms.set(settings).then(resolve,reject);
}
```

####Example: Application user preference
```javascript
var settings = {"name":"home", "userId":"user1"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setVehicleSpeedInfo(){
   drive.settings.navigation.users.set(settings).then(resolve,reject);
}
```

###Delete System/Application User Settings
**Usage:** `drive.settings.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

####Example: Delete settings of a given user
```javascript
var user = {"userId":"user1"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteUserSettings(){
   drive.settings.navigation.users.delete(user).then(resolve,reject);
}
```

###Subscribe to System/Application User Settings
**Usage:** `handle = drive.settings.subscribe(callBack, options)`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} callBack - Function called on value change with settings data object. See data object format below.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to all system properties
```javascript
function logSystemSettings(data){
  console.log(data);
}

function subscribe(){
  handle=drive.settings.system.subscribe(logSystemSettings);
}
```

####Example: subscribe to application properties
```javascript
var userSettings = drive.settings.navigation.users;

function destSettings(data){
  console.log(data);
}

function subscribe(){
  handle= userSettings.destination.subscribe(destSettings);
}
```

###Unsubscribe from System/Application User Settings
**Usage:** `drive.settings.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.settings.system.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.settings.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes. See policy manager section for more details.

**Parameters:**
- None.

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.settings.system.available();
}
```

## <a name="notifications"></a>Notifications
This Javascript SDK allows interacting with notifications service.
The following interface represents a base interface to all notification properties:
```javascript
interface NotificationInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```

CommonDataType interface represents common data type for all data types.

###Notification properties
Below properties is a subset of possible attributes that a notification service may support. More attributes shall be added in the next version of this SDK:

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|messages|{array}|False|No|Array of messages|
|messages.id|String|False|No|Message ID|
|messages.userURI|String|False|No|Target user|
|messages.priority|String|False|No|Normal/High|
|messages.sender|String|False|No|Contact or service provider name|
|messages.subject|String|False|No|Message subject|
|messages.type|String|False|No|Category of message (weather, sms, tracking, siteautomation, …)|
|messages.data|{object}|False|No|Message body depends on message (see format below)|
|messages.read|Boolean|False|No|True means that messages were read.|
|messages.spokenText|String|False|No|Text that should be sent to TTS (text to speech)|
|messages.displayText|String|False|No|Text corresponding to spoken text that should be displayed while TTS is playing.|

###SMS data format

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|data.sms|{object}|False|No|Text message object|
|data.sms.contactId|String|False|No|Sender contact ID from user contacts (if sender is one of user’s contacts). More information could be retreieved from identity contacts (name, picture, etc).|
|data.sms.text|String|False|No|Text message|
|data.sms.type|String|False|No|TEXT or MMS|
|data.sms.attachments|{array}|False|No|MMS content|
|data.sms.attachments.contentName|String|False|No|File name|
|data.sms.attachments.contentType|String|False|No|Content MIME type: audio/wav for instance|
|data.sms.attachments.content|String|False|No|File binary in RIFF format.|

###Weather alert data format

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|data.weather|{object}|False|No|Weather alert object|
|data.weather.alerts|{array}|False|No|Weather alerts array|
|data.weather.alerts.alertId|String|False|No|Alert ID|
|data.weather.alerts.description|String|False|No|Alert description|
|data.weather.alerts.category|String|False|No|Alert category|
|data.weather.alerts.priority|Integer|False|No|Priority number (lowest number is highest priority)|
|data.weather.alerts.type|String|False|No|Alert short description|
|data.weather.alerts.typeId|String|False|No|Alert type ID|
|data.weather.alerts.alertClass|Integer|False|No|Classification of alert|
|data.weather.alerts.level|Integer|False|No|Alert level|
|data.weather.alerts.color.name|String|False|No|Alert color name: red, green, blue.|
|data.weather.alerts.color.code|String|False|No|Hexa decimal value of color|
|data.weather.alerts.source|String|False|No|Source of the alert|
|data.weather.alerts.sourceId|String|False|No|Source ID of the alert|
|data.weather.alerts.area|{array}|False|No|Array of areas|
|data.weather.alerts.area.name|String|False|No|Location name|
|data.weather.alerts.area.startTime|Date|False|No|Alert start time|
|data.weather.alerts.area.endTime|Date|False|No|Alert end time|
|data.weather.alerts.area.status|String|False|No|Status of alert|
|data.weather.alerts.area.text|String|False|No|Full text description of the alert|

###Tracking data format

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|data.tracking|{object}|False|No|Tracking object|
|data.tracking.contactId|String|False|No|Sender contact ID from user contacts (if sender is one of user’s contacts). More information could be retreieved from identity contacts (name, picture, etc).|
|data.tracking.provider|String|False|No|Provider name: e.g. glympse|
|data.tracking.startTime|Date|False|No|Tracking start time|
|data.tracking.endTime|Date|False|No|Tracking expiry time|
|data.tracking.picture|String|False|No|Avatar or picture URL. If sender is a registered contact then you can find more details about the sender in the identity.users.contacts|
|data.tracking.text|String|False|No|Personal message sent as part of the tracking invite|
|data.tracking.position|{object}|False|
|data.tracking.position.latitude|Float|False|No|
|data.tracking.position.longitude|Float|False|No|
|data.tracking.position.altitude|Float|False|No|Location altitude in meters|
|data.tracking.position.heading|Float|False|No|Azimuth values calculated in degree with reference to north |
|data.tracking.position.velocity|Integer|False|No|GPS estimated velocity (in km/h).|
|data.tracking.position.precision|Float|False|No|GPS position precision |
|data.tracking.destination|{object}|False|No|Destination of tracked device.|
|data.tracking.destination.id|String|False|No|Destination ID|
|data.tracking.destination.name|String|False|No|Destination name| 
|data.tracking.destination.selected|Boolean|Yes|No|This flag is ture if the destination object is selected on the map, other wise false. The default is false|
|data.tracking.destination.street|String|False|No|Destination street including street number|
|data.tracking.destination.city|String|False|No|Destination city|
|data.tracking.destination.region|String|False|No|Destination state/province|
|data.tracking.destination.country|String|False|No|Destination Country|
|data.tracking.destination.postalCode|Integer|False|No|5 digits ZIP code or postalCode alphanumeric|
|data.tracking.destination.display.latitude|Float|False|No|Displayed latitude in degrees|
|data.tracking.destination.display.longitude|Float|False|No|Displayed longitude in degrees|
|data.tracking.destination.display.altitude|Float|False|No|Displayed altitude in meters|
|data.tracking.destination.routing.latitude|Float|False|No|Routing latitude in degrees|
|data.tracking.destination.routing.longitude|Float|False|No|Routing Longitude in degrees|
|data.tracking.destination.routing.altitude|Float|False|No|Routing altitude in meters|
|data.tracking.destination.phone|String|False|No|Primary destination phone number|
|data.tracking.destination.type |String|False|No|list of POI type|
|data.tracking.destination.categories|{array}|False|No|POI categories. Example: ["grossery", "gas station"]|
|data.tracking.destination.comments|String|False|No|Comments on distination|
|data.tracking.destination.link|String|False|No|POI URL|
|data.tracking.destination.symbol|String|False|No|Symbol (icon)|
|data.tracking.destination.formattedAddress|String|False|No|Full address format based on the country|
|data.tracking.destination.metas|{array}|False|No|Array of {attribute: value}|
|data.tracking.track|{object}|False|No|
|data.tracking.track.name|String|No|
|data.tracking.track.selected|Boolean|Yes|No|This flag is ture if the track object is selected on the map, other wise false. The default is false|
|data.tracking.track.waypoints|{array}|False|No|Waypoints array|
|data.tracking.track.waypoints.latitude|Float|False|No|Track latitude in degrees|
|data.tracking.track.waypoints.longitude|Float|False|No|Track Longitude in degrees|
|data.tracking.track.waypoints.altitude|Float|False|No|Track altitude in meters|
|data.tracking.track.waypoints.heading|Float|False|No|Azimuth values calculated in degree with reference to north|
|data.tracking.track.waypoints.velocity|Integer|False|No|Speed in km/h|
|data.tracking.track.waypoints.time|Date|False|No|Track Date/time|
|data.tracking.track.waypoints.name|String|False|No|Track name|
|data.tracking.track.waypoints.description|String|False|No|Track description|
|data.tracking.track.waypoints.symbol|String|False|No|Track symbol: dot, crossing, etc.|
|data.tracking.track.waypoints.type|String|False|No|Track type: crossing, intersection|

###Site automation data format
|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|data.sites|{array}|False|Yes|Tracking object|
|data.sites.siteId|String|True|Yes|Site ID.|
|data.sites.provider|String|False|Yes|Provider name: e.g. Digital life|
|data.sites.startTime|Date|False|Yes|Notification start time|
|data.sites.endTime|Date|False|Yes|Notification end time|
|data.sites.picture|String|False|Yes|Picture sent by alarm system for instance|
|data.sites.text|String|False|Yes|Notification description (for instance incident description).|
|data.sites.groups|{array}|False|Yes|Array resource groups related to the notification. See Site automation section for data structure.|
|data.sites.resources|{array}|False|Yes|Array resources related to the notification. See Site automation section for data structure.|
|data.sites.resourcetypes|{array}|False|Yes|Array resource types related to the notification. See Site automation section for data structure.|

###Get Notification Information
**Usage:** `drive.notification.get(options).then(resolve, reject);`

**Description:** The get method returns navigation information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with notification information data object if the operation is successful. 
- {function} reject Optional - Function called in case of error retrieving navigation information.

**Returns:** Promise

####Example: get sms messages
```javascript
interface NotificationInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```

###Set Notification information
**Usage:** `drive.notification.set(settings,options).then(resolve, reject)`

**Description:** The set method allows setting some notification parameters like read flag.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting notification information.

**Returns:** Promise

####Example:
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function setMessageInfo(){
drive.notification.messages.set({"read":true}).then(resolve,reject);
}
```

###Delete Notification settings
**Usage:** `drive.notification.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting vehicle information.

**Returns:** Promise

####Example:
```javascript
var filter = {"type":"sms"};

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteSMSMessages(){
  drive.notification.messages.delete(filter).then(resolve,reject);
}
```

###Subscribe to notification information
**Usage:** `handle = drive.notification.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with notification information data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to incoming sms
```javascript
function showSMS(messages){
  console.log(messages);
}

function subscribe(){
handle=drive.notification.messages.subscribe(showSMS,{"type":"sms"});
}
```

###Unsubscribe from notification information
**Usage:** `drive.notification.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle = "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.notification.messages.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.notification.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes. See policy manager section for more details.

**Parameters:**
- None.

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.notification.available();
}
```

## <a name="media"></a>Media
This Javascript SDK allows interacting with media player.
The following interface represents a base interface to all media player properties:

```javascript
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
}; 
```

CommonDataType interface represents common data type for all data types.

###Media properties
Below properties is a subset of possible attributes that a Media service may support. More attributes shall be added in the next version of this SDK.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|**Current media**|
|currentMedia|{object}|False|Yes|Currently playing media|
|currentMedia.id|String|False|Yes|Media ID|
|currentMedia.title|String|False|Yes|Media title|
|currentMedia.artist|String|False|Yes|Media artist|
|currentMedia.type|String|False|Yes|Media type (video/mp4, audio/mp3, wav, etc)|
|currentMedia.genre|String|False|Yes|
|currentMedia.source|String|False|No|File source (URI)|
|currentMedia.status|String|False|No|True if currently playing|
|currentMedia.position|Integer|False|No|Last position before pausing or switching.|
|currentMedia.duration|Integer|False|Yes|Length of media|
|playlist|{array}|False|Yes|Array of Media objects (same attributes as currentMedia).|
|**Player parameters**|
|player.action|String|False|No|play, pause, resume, stop, seek, load, nextTrack, previousTrack|
|player.controls|Boolean|False|No|Media player controls|
|player.audio|String|No|No|Muted|
|player.autoplay|Boolean|No|No|True for autoplay.|
|player.controls|Boolean|No|No|Show control buttons|
|player.height|Integer|No|No|Height of the video player|
|player.width|Integer|No|No|Width of the video player|
|player.loop|Boolean|No|No|Start over media evrytime it finishes|
|player.preloaded|Boolean|No|No|Preload the media for a fast start. Ignored if autoplay is on.|
|player.poster|String|No|No|Poster image|
|player.status|String|No|Yes|Playing, Paused, Loading, Progress, Seeking, Canplay, Stopped, Looping|
|player.volume|insigned short|No|No|Percentage: 0 to 100|
|player.muted|Boolean|No|No|True means muted.|
|player.position|Integer|False|No|Current position|
|player.duration|Integer|False|Yes|Duration|
|player.error|String|False|Yes|Error code/message|

###Get Media Information
**Usage:** `drive.media.get(options).then(resolve, reject);`

**Description:** The get method returns media information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with media information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving media information.

**Returns:** Promise

####Example: get current media
```javascript
function logMedia(currentMedia){
   console.log(currentMedia);
}

function logError(error){
   console.log(error);
}

function getCurrentMedia(){
   drive.media.currentMedia.get().then(logMedia,logError);
}
```

###Set Media information
**Usage:** `drive.media.set(settings,options).then(resolve, reject)`

**Description:** The set method allows setting some media parameters like audio/video source URI.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting notification information.

**Returns:** Promise

####Example: Request/Release media player
```javascript
var granted = false;
var handle=drive.policy.resources.subscribe(isGranted, {"name":"media"});

function requestAccess(){
drive.policy.resources.set({"access":{"appId":"radio","exclusive":true}},{"name":"media"}).then(resolve,reject);
}

function releaseResource(){
drive.policy.resources.set({"release":"radio"},{"name":"media"})
.then(resolve,reject);
}

function isGranted(resource){
if (resource.granted.indexOf("radio")>-1) { granted = true; } else { granted = fale;}
}

function resolve(){
///success
}

function reject(error){
  console.log(error);
}
```

####Example: set source URI and start media player
```javascript
var granted = false;
var handle=drive.policy.resources.subscribe(isGranted, {"name":"media"});

function isGranted(resource){
if (resource.granted.indexOf("radio")>-1) { granted = true; } else { granted = fale;}
}

function setMedia(){
if (granted){     
drive.media.currentMedia.set({"source":"http://cdn/stream1"})
.then(resolve,reject);
}
}

function playMedia(){
if (granted){
  drive.media.player.set({"action":"play"}).then(resolve,reject);
}
}

function resolve(){
///success
}

function reject(error){
  console.log(error);
}
```

###Delete Media settings
**Usage:** `drive.media.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting media information.
**Returns:** Promise
####Example:
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteMediaPlaylist(){
  drive.media.playlist.delete().then(resolve,reject);
}
```

Subscribe to media information
**Usage:** `handle = drive.media.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with media information data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to destination
```javascript
function whatsPlaying(currentMedia){
  console.log(currentMedia);
}

function subscribe(){
handle=drive.media.currentMedia.subscribe(whatsPlaying);
}
```

Unsubscribe from media information
**Usage:** `drive.media.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example:
```javascript
function unsubscribe(){
     drive.media.currentMedia.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.media.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes.
See policy manager section for more details.

**Parameters:**
- None

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.media.playlist.available();
}
```

## <a name="sms"></a>SMS
This Javascript SDK allows interacting with SMS/MMS Messaging.
The following interface represents a base interface to all SMS/MMS properties:
```javascript
interface SmsInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```
CommonDataType interface represents common data type for all data types.

###SMS/MMS properties
Below properties is a subset of possible attributes that SMS/MMS may support. More attributes shall be added in the next version of this SDK.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|**sms**|
|sms|{object}|False|Yes|Application name|
|sms.outbox|{array}|False|Yes|Outgoing messages set by other applications|
|sms.inbox|{array}|False|Yes|Incoming messages|
|sms.draft|{array}|False|Yes|Draft messages|
|sms.scheduled|{array}|False|Yes|Scheduled message|
|sms.locked|{array}|False|Yes|Locked messages|
|sms.spam|{array}|False|Yes|Spam messages|
|sms.inbox.messages|{array}|False|Yes|Messages in inbox folder|
|sms.outbox.messages|{array}|False|Yes|Messages in outbox folder|
|sms.draft.messages|{array}|False|Yes|Messages in draft folder|
|sms.scheduled.messages|{array}|False|Yes|Messages in scheduled folder|
|sms.locked.messages|{array}|False|Yes|Messages in locked folder|
|sms.outbox.messages.type|String|False|Yes, sms or mms|
|sms.outbox.messages.refId|Float|False|Yes, unique referenceID. Should be the same for all segments of a multi part message|
|sms.outbox.messages.sender|String|False|Yes, sender phone number|
|sms.outbox.messages.destination|String|False|Yesestination phone number|
|sms.outbox.messages.data|String|False|Yes|Message body|
|sms.outbox.messages.attachments|{array}|False|Yes|MMS attachments|
|sms.outbox.messages.attachments.contentType|String|False|Yes|MMS attachments|
|sms.outbox.messages.attachments.contentName|String|False|Yes|MMS attachments|
|sms.outbox.messages.attachments.content|String|False|Yes, MMS attachments|
|sms.outbox.messages.priority|String|False|Yes|Message priority (high or low)|
|sms.outbox.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.outbox.messages.time|Date|False|Yes, date and time message sent|
|sms.outbox.messages.segmentNumber|Integer|False|No|"Segment order of multi part message ( start at 1).|0 mean message not segmented"|
|sms.inbox.messages.type|String|False|Yes, sms or mms|
|sms.inbox.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.inbox.messages.sender|String|False|Yes|Sender phone number|
|sms.inbox.messages.destination|String|False|Yes|Destination phone number|
|sms.inbox.messages.data|String|False|Yes|Message body|
|sms.inbox.messages.priority|String|False|Yes, message priority (high or low)|
|sms.inbox.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.inbox.messages.time|Date|False|Yes, arrival date and time |
|sms.inbox.messages.segmentNumber|Integer|False|No|"Segment order of multi part message ( start at 1). 0 mean message not segmented"|
|sms.draft.messages.type|String|False|Yes, sms or mms|
|sms.draft.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.draft.messages.sender|String|False|Yes, Sender phone number|
|sms.draft.messages.destination|String|False|Yes|Destination phone number|
|sms.draft.messages.data|String|False|Yes, message body|
|sms.draft.messages.priority|String|False|Yes|Message priority (high or low)|
|sms.draft.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.draft.messages.time|Date|False|Yes|creation date and time |
|sms.draft.messages.segmentNumber|Integer|False|No|"Segment order of multi part message ( start at 1). 0 mean message not segmented"|
|sms.scheduled.messages.type|String|False|Yes, sms or mms|
|sms.scheduled.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.scheduled.messages.sender|String|False|Yes, sender phone number|
|sms.scheduled.messages.destination|String|False|Yes, destination phone number|
|sms.scheduled.messages.data|String|False|Yes|Message body|
|sms.scheduled.messages.priority|String|False|Yes|Message priority (high or low)|
|sms.scheduled.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.scheduled.messages.time|Date|False|Yes|scheduled date and time |
|sms.scheduled.messages.segmentNumber|Integer|False|No|"Segment order of multi part message ( start at 1). 0 mean message not segmented"|
|sms.locked.messages.type|String|False|Yes sms or mms|
|sms.locked.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.locked.messages.sender|String|False|Yes|Sender phone number|
|sms.locked.messages.destination|String|False|Yes|Destination phone number|
|sms.locked.messages.data|String|False|Yes|Message body|
|sms.locked.messages.priority|String|False|Yes, message priority (high or low)|
|sms.locked.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.locked.messages.time|Date|False|Yes, arrival date and time |
|sms.locked.messages.segmentNumber|Integer|False|No|"Segment order of multi part message ( start at 1).|0 mean message not segmented"|
|sms.spam.messages.type|String|False|Yes||sms or mms|
|sms.spam.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.spam.messages.sender|String|False|Yes|Sender phone number|
|sms.spam.messages.destination|String|False|Yes|Destination phone number|
|sms.spam.messages.data|String|False|Yes|Message body|
|sms.spam.messages.priority|String|False|Yes|Message priority (high or low)|
|sms.spam.messages.read|Boolean|False|no|Flag that indicates if messages was read (true) or not (false)|
|sms.spam.messages.time|Date|False|Yes|arrival date and time |
|sms.sent.messages.type|String|False|Yes, sms or mms|
|sms.sent.messages.refId|Float|False|Yes|Unique referenceID. Should be the same for all segments of a multi part message|
|sms.sent.messages.sender|String|False|Yes|Sender phone number|
|sms.sent.messages.destination|String|False|Yes, destination phone number|
|sms.sent.messages.data|String|False|Yes|Message body|
|sms.sent.messages.priority|String|False |Yes. message priority (high or low)|
|sms.sent.messages.time |Date|False |Yes, date and time message sent|

###Get SMS/MMS Messages
**Usage:** `drive.sms.get(options).then(resolve, reject);`

**Description:** The get method returns SMS information object.

**Parameters:**
- {object} options Optional -Options object allows specifying filters.
- {function} resolve - Function called with sms information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving SMS information.

**Returns:** Promise

####Example: get inbox messages
```javascript
function logMessages(messages){
   console.log(messages);
}

function logError(error){
   console.log(error);
}

function getInbox(){
   drive.sms.inbox.get().then(logMessages,logError);
}
```

###Set SMS/MMS messages
**Usage:** `drive.sms.set(settings,options).then(resolve, reject)`

**Description:** The set method allows interact with SMS/MMS messaging service for instance send SMS message.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting SMS information.

**Returns:** Promise

####Example: Send SMS
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function sendSMS(){
drive.sms.outbox.set({"type":"sms", "destination":"5556667777", "data":"hello"}).then(resolve,reject);
}
```

###Delete SMS messages
**Usage:** `drive.sms.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete SMS messages.

**Parameters:** 
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting sms data.

**Returns:** Promise

####Example:
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteDrafts(){
  drive.sms.draft.messages.delete().then(resolve,reject);
}
```

###Subscribe to SMS
**Usage:** `handle = drive.sms.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with SMS data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** - {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: receive SMS
```javascript
function newMessages(messages){
  console.log(messages);
}

function subscribe(){
handle=drive.sms.inbox.messages.subscribe(newMessages);
}
```

Unsubscribe from SMS
**Usage:** `drive.sms.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.sms.inbox.messages.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:**  `drive.sms.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes.
See policy manager section for more details.

**Parameters:**
- None.

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.sms.outbox.available();
}
```

## <a name="search-service"></a>Search service
This Javascript SDK allows interacting with search service.
The following interface represents a base interface to all Search properties:
```javascript
interface SearchInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```

CommonDataType interface represents common data type for all data types.

###Search properties
Below properties is a subset of possible attributes that Search service may support. More attributes shall be added in the next version of this SDK.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|search|{object}|False|yes|Application name|
|search.requests|{array}|False|yes|Search requests|
|search.requests.requestId|String|False|No|Request Identifier. If not specified the requestId will be set to the same value as <serviceType>.<contentType>. This allows sharing results among apps.|
|search.requests.action|String|False|No|first, next, previous|
|search.requests.serviceType|String|True|No|Target service type: weather, poi, app|
|search.requests.provider|String|False|No|Specify content provider. If not specified content is aggregated.|
|search.requests.contentType|String|False|No|"Content type: Weather: current, forecast, daily-forecast, hourly-forecast, suggestions, alerts, POI: poi, suggestions, parking, address, App: suggestions, html, hybrid, native"|
|search.requests.query|String|True|No|Request query|
|search.requests.filter|{array}|False|No|Request filter: array of string.|
|search.requests.maxItems|Integer|False|No|Maxium number of items in the result set.|
|search.requests.includes|{array}|False|No|Limit the search result returned to specified attributes|
|search.requests.sort|{array}|False|No|Sort by attributes and sorting order|
|search.requests.sort.fieldName|String|False|No|Field name to be sorted|
|search.requests.sort.reverse|Boolean|False|No|"Specifies the order that the items will be sorted. If the value is set to true, the items are sorted in the descending order. If the value is set to false, the items are sorted in the ascending order."|
|search.requests.metas|{array}|False|No|Array of {attribute: value}|
|search.requests.metas.currentPosition|Boolean|False|No|Search for content near by current position|
|search.requests.metas.position|{object}|False|No|Search for content near by specified position|
|search.requests.metas.position.latitude|Float|False|No|Latitude|
|search.requests.metas.position.longitude|Float|False|No|Longitude|
|search.requests.metas.radius|Float|False|No|Search radius|
|search.requests.metas.details|Boolean|False|No|Return detailed result|
|search.history.requests|{array}|True|Yes|"Array of previous requests (same format as search.requests).Up to 10 requests should be saved in the history. The search history maximum size should be configurable in drive.settings namespace."|
|search.results|{array}|True|Yes|Array of results.|
|search.results.requestId|String|True|Yes|Request ID.|
|search.results.pagination|Boolean|False|Yes|Set to true if pagination is supported.|
|search.results.isFirstPage|Boolean|False|Yes|Set to true if first page.|
|search.results.isLastPage|Boolean|False|Yes|Set to true if last page.|
|search.results.items|{array}|False|Yes|Result set.|
|search.results.items.provider|String|False|Yes|Content provider if available.|
|search.results.items.id|String|False|Yes|Result item ID|
|**POIs**|
|search.results.items.poi|{object}|Yes|
|search.results.items.poi.name|String|False|Yes|POI name. Example Mike’s garage|
|search.results.items.poi.street|String|False|Yes|Full street description with number and apartment/suit if any.|
|search.results.items.poi.city|String|False|Yes|City name.|
|search.results.items.poi.region|String|False|Yes|state/province|
|search.results.items.poi.postalCode|String|False|Yes|5 digits ZIP code or postalCode alphanumeric|
|search.results.items.poi.country|String|False|Yes|Country name.|
|search.results.items.poi.formattedAddress|String|False|Yes|Full address format based on the country|
|search.results.items.poi.latitude|Float|False|Yes|Latitude in degree|
|search.results.items.poi.longitude|Float|False|Yes|Longitude in degree|
|search.results.items.poi.altitude|Float|False|Yes|Altitude in meters|
|search.results.items.poi.heading|Float|False|Yes|Azimuth values calculated in degree with reference to north|
|search.results.items.poi.velocity|Integer|False|Yes|Speed in km/h|
|search.results.items.poi.phone|String|False|Yes|Default phone number|
|search.results.items.poi.type|String|False|Yes|POI type|
|search.results.items.poi.categories|{array}|False|Yes|"POI categories (Array of string). Example: ["grossery", "gas station"]. For Parking: categories possible values are: off-street, block, facility"|
|search.results.items.poi.comments|String|False|Yes|General comments|
|search.results.items.poi.link|String|False|Yes|POI URL|
|search.results.items.poi.symbol|String|False|Yes|POI symbol|
|search.results.items.poi.timezone|String|False|Yes|POI local time zone|
|search.results.items.poi.metas|{array}|False|Yes|An array of key value pairs.|
|search.results.items.poi.metas.distance|Float|False|Yes|Distance from search position|
|search.results.items.poi.metas.phones|{array}|False|Yes|Other phone numbers|
|search.results.items.poi.metas.capacity|Integer|False|Yes|Place capacity (parking or hotel for instance)|
|search.results.items.poi.metas.availability|Integer|Flase|Yes|Place availability|
|search.results.items.poi.metas.accuracy|String|False|Yes|Estimation accuracy low, medium, high.|
|search.results.items.poi.metas.payment|{array}|False|Yes|Array of string. Possible values: Bills, Coins, Mastercard, Visa, Amex, Discover, Debit|
|search.results.items.poi.metas.rateLowest|Float|False|Yes|Lowest known rate|
|search.results.items.poi.metas.rateHighest|Float|False|Yes|Highest known rate|
|search.results.items.poi.metas.currency|String|False|Yes|Currency code|
|search.results.items.poi.metas.hours|{array}|False|Yes|Array of strings (lines representing the business hours for instance).|
|**POI suggestions**|
|search.results.items.poi.suggestions|{array}|False|Yes|POI sugestions|
|search.results.items.poi.suggestions.id|String|False|Yes|Suggestion rank or Id|
|search.results.items.poi.suggestions.name|String|False|Yes|Suggestion text|
|search.results.items.poi.suggestions.type|String|False|Yes|Suggestion type or category|
|search.results.items.poi.suggestions.metas|{object}|False|Yes|Suggestion metas|
|search.results.items.poi.suggestions.metas.distance|Float|False|Yes|POI distance from specified position|
|search.results.items.poi.suggestions.metas.filter|String|False|Yes|Filter to be used in subsequent search filter|
|**Weather**|
|search.results.items.weather|{object}|Yes|
|**Weather – Current conditions**|
|search.results.items.weather.current|{object}|False|Yes|Current weather|
|search.results.items.weather.current.time|Date|False|Yes|Observation date time|
|search.results.items.weather.current.description|String|False|Yes|Weather text|
|search.results.items.weather.current.icon|String|False|Yes|Weather icon|
|search.results.items.weather.current.isDayTime|Boolean|False|Yes|True if day time.|
|search.results.items.weather.current.temperature.value|Float|False|Yes|Current temperature value|
|search.results.items.weather.current.temperature.unit|String|False|Yes|Current temperature unit|
|search.results.items.weather.current.feelTemperature.value|Float|False|Yes|Current feel temperature value|
|search.results.items.weather.current.feelTemperature.unit|String|False|Yes|Current felt temperature unit|
|search.results.items.weather.current.shadeTemperature.value|Float|False|Yes|Current temperature in shade value|
|search.results.items.weather.current.shadeTemperature.unit|String|False|Yes|Current temperature in shade unit|
|search.results.items.weather.current.dewPoint.value|Float|False|Yes|Dew point temperature value|
|search.results.items.weather.current.dewPoint.unit|String|False|Yes|Dew point temperature unit|
|search.results.items.weather.current.humidity|Integer|False|Yes|Humidity percentage|
|search.results.items.weather.current.wind.direction.value|Float|False|Yes|Wind direction in azimuth degrees|
|search.results.items.weather.current.wind.direction.description|String|False|Yes|Wind direction description|
|search.results.items.weather.current.wind.speed.value|Float|False|Yes|Wind speed value|
|search.results.items.weather.current.wind.speed. unit|String|False|Yes|Wind speed unit|
|search.results.items.weather.current.windGust.speed.value|Float|False|Yes|Wind gust speed value|
|search.results.items.weather.current.windGust.speed.unit|String|False|Yes|Wind gust speed unit|
|search.results.items.weather.current.uvindex.value|Integer|False|Yes|UV Index value|
|search.results.items.weather.current.uvindex.description|String|False|Yes|UV Index description|
|search.results.items.weather.current.visibility.value|Float|False|Yes|Visibility value|
|search.results.items.weather.current.visibility.unit|String|False|Yes|Visibility unit|
|search.results.items.weather.current.visibility.value|Float|False|Yes|Visibility value|
|search.results.items.weather.current.visibility.unit|String|False|Yes|Visibility unit|
|**Weather – Forecast**|
|search.results.items.weather.forecast|{object}|False|Yes|Weather forecast|
|search.results.items.weather.forecast.daily|{object}|False|Yes|Weather daily forecast|
|search.results.items.weather.forecast.daily.time|Date|False|Yes|Date time|
|search.results.items.weather.forecast.daily.sun.rise|Date|False|Yes|Sun rise time|
|search.results.items.weather.forecast.daily.sun.set|Date|False|Yes|Sun set time|
|search.results.items.weather.forecast.daily.moon.rise|Date|False|Yes|Moon rise time|
|search.results.items.weather.forecast.daily.moon.set|Date|False|Yes|Moon set time|
|search.results.items.weather.forecast.daily.temperature.min.value|Float|False|Yes|Minimum temperature value|
|search.results.items.weather.forecast.daily.temperature.min.unit|String|False|Yes|Minimum temperature unit|
|search.results.items.weather.forecast.daily.temperature.min.value|Float|False|Yes|Minimum temperature value|
|search.results.items.weather.forecast.daily.temperature.min.unit|String|False|Yes|Minimum temperature unit|
|search.results.items.weather.forecast.daily.feelTemperature.min.value|Float|False|Yes|Feel minimum temperature value|
|search.results.items.weather.forecast.daily.feelTemperature.min.unit|String|False|Yes|Feel minimum temperature unit|
|search.results.items.weather.forecast.daily.feelTemperature.max.value|Float|False|Yes|Feel maximum temperature value|
|search.results.items.weather.forecast.daily.feelTemperature.max.unit|String|False|Yes|Feel maximum temperature unit|
|search.results.items.weather.forecast.daily.shadeTemperature.min.value|Float|False|Yes|Shade minimum temperature value|
|search.results.items.weather.forecast.daily.shadeTemperature.min.unit|String|False|Yes|Shade minimum temperature unit|
|search.results.items.weather.forecast.daily.shadeTemperature.max.value|Float|False|Yes|Shade maximum temperature value|
|search.results.items.weather.forecast.daily.shadeTemperature.max.unit|String|False|Yes|Shade maximum temperature unit|
|search.results.items.weather.forecast.daily.hoursOfSun|Float|False|Yes|Hours of sun|
|**Weather – Forecast day**|
|search.results.items.weather.forecast.daily.day.icon|Integer|False|Yes|Icon number|
|search.results.items.weather.forecast.daily.day.forecast.shortDescription|String|False|Yes|Forecast short description|
|search.results.items.weather.forecast.daily.day.forecast.LongDescription|String|False|Yes|Forecast Long description|
|search.results.items.weather.forecast.daily.day.precipitationProbability|Integer|False|Yes|Probability of precipitations|
|search.results.items.weather.forecast.daily.day.thunderstormProbability|Integer|False|Yes|Probability of thunderstorms|
|search.results.items.weather.forecast.daily.day.rainProbability|Integer|False|Yes|Probability of rain|
|search.results.items.weather.forecast.daily.day.rain.value|Integer|False|Yes|Rain accumulation value|
|search.results.items.weather.forecast.daily.day.rain.unit|String|False|Yes|Rain accumulation unit|
|search.results.items.weather.forecast.daily.day.snowProbability|Integer|False|Yes|Probability of snow|
|search.results.items.weather.forecast.daily.day.snow.value|Integer|False|Yes|Snow accumulation value|
|search.results.items.weather.forecast.daily.day.snow.unit|String|False|Yes|Snow accumulation unit|
|search.results.items.weather.forecast.daily.day.iceProbability|Integer|False|Yes|Probability of ice|
|search.results.items.weather.forecast.daily.day.ice.value|Integer|False|Yes|Ice accumulation value|
|search.results.items.weather.forecast.daily.day.ice.unit|String|False|Yes|Ice accumulation unit|
|search.results.items.weather.forecast.daily.day.wind.direction.value|Float|False|Yes|Wind direction in azimuth degrees|
|search.results.items.weather.forecast.daily.day.wind.direction.description|String|False|Yes|Wind direction description|
|search.results.items.weather.forecast.daily.day.wind.speed.value|Float|False|Yes|Wind speed value|
|search.results.items.weather.forecast.daily.day.wind.speed. unit|String|False|Yes|Wind speed unit|
|search.results.items.weather.forecast.daily.day.windGust.speed.value|Float|False|Yes|Wind gust speed value|
|search.results.items.weather.forecast.daily.day.windGust.speed.unit|String|False|Yes|Wind gust speed unit|
|search.results.items.weather.forecast.daily.day.hoursOfPrecipitation|Float|False|Yes|Hours of precipitation|
|search.results.items.weather.forecast.daily.day.hoursOfRain|Float|False|Yes|Hours of rain|
|**Weather – Forecast night**|
|search.results.items.weather.forecast.daily.night|{object}|False|Yes|Same attributes as day|
|**Weather – hourly forecast**|
|search.results.items.weather.forecast.hourly|{object}|False|Yes|Weather hourly forecast.|
|search.results.items.weather.forecast.hourly.time|Date|False|Yes|Date time|
|search.results.items.weather.forecast.hourly.icon|Integer|False|Yes|Icon number|
|search.results.items.weather.forecast.hourly.forecastDescription|String|False|Yes|Forecast description|
|search.results.items.weather.forecast.hourly.isDayLight|Boolean|False|Yes|True if day light|
|search.results.items.weather.forecast.hourly.temperature.value|Float|False|Yes|Hourly temperature value|
|search.results.items.weather.forecast.hourly.temperature.unit|String|False|Yes|Hourly temperature unit|
|search.results.items.weather.forecast.hourly.feelTemperature.value|Float|False|Yes|Hourly feel temperature value|
|search.results.items.weather.forecast.hourly.feelTemperature.unit|String|False|Yes|Hourly feel temperature unit|
|search.results.items.weather.forecast.hourly.dewPoint.value|Float|False|Yes|Hourly dew point value|
|search.results.items.weather.forecast.hourly.dewPoint.unit|String|False|Yes|Hourly dew point unit|
|search.results.items.weather.forecast.hourly.wind.direction.value|Float|False|Yes|Wind direction in azimuth degrees|
|search.results.items.weather.forecast.hourly.wind.direction.description|String|False|Yes|Wind direction description|
|search.results.items.weather.forecast.hourly.wind.speed.value|Float|False|Yes|Wind speed value|
|search.results.items.weather.forecast.hourly.wind.speed. unit|String|False|Yes|Wind speed unit|
|search.results.items.weather.forecast.hourly.windGust.speed.value|Float|False|Yes|Wind gust speed value|
|search.results.items.weather.forecast.hourly.windGust.speed.unit|String|False|Yes|Wind gust speed unit|
|search.results.items.weather.forecast.hourly.relativeHumidity|Integer|False|Yes|Relative humidity|
|search.results.items.weather.forecast.hourly.visibility.value|Float|False|Yes|Visibility value|
|search.results.items.weather.forecast.hourly.visibility.unit|String|False|Yes|Visibility unit|
|search.results.items.weather.forecast.hourly.ceiling.value|Float|False|Yes|Cloud ceiling value|
|search.results.items.weather.forecast.hourly.ceiling.unit|String|False|Yes|Cloud ceiling unit|
|search.results.items.weather.forecast.hourly.rainProbability|Integer|False|Yes|Probability of rain|
|search.results.items.weather.forecast.hourly.rain.value|Integer|False|Yes|Rain accumulation value|
|search.results.items.weather.forecast.hourly.rain.unit|String|False|Yes|Rain accumulation unit|
|search.results.items.weather.forecast.hourly.snowProbability|Integer|False|Yes|Probability of snow|
|search.results.items.weather.forecast.hourly.snow.value|Integer|False|Yes|Snow accumulation value|
|search.results.items.weather.forecast.hourly.snow.unit|String|False|Yes|Snow accumulation unit|
|search.results.items.weather.forecast.hourly.iceProbability|Integer|False|Yes|Probability of ice|
|search.results.items.weather.forecast.hourly.ice.value|Integer|False|Yes|Ice accumulation value|
|search.results.items.weather.forecast.hourly.ice.unit|String|False|Yes|Ice accumulation unit|
|**Weather – Alerts**|
|search.results.items.weather.alerts|{array}|False|Yes|Weather alerts array|
|search.results.items.weather.alerts.alertId|String|False|Yes|Alert ID|
|search.results.items.weather.alerts.description|String|False|Yes|Alert description|
|search.results.items.weather.alerts.category|String|False|Yes|Alert category|
|search.results.items.weather.alerts.priority|Integer|False|Yes|Priority number (lowest number is highest priority)|
|search.results.items.weather.alerts.type|String|False|Yes|Alert short description|
|search.results.items.weather.alerts.typeId|String|False|Yes|Alert type ID|
|search.results.items.weather.alerts.alertClass|Integer|False|Yes|Classification of alert|
|search.results.items.weather.alerts.level|Integer|False|Yes|Alert level|
|search.results.items.weather.alerts.color.name|String|False|Yes|Alert color name: red, green, blue.|
|search.results.items.weather.alerts.color.code|String|False|Yes|Hexa decimal value of color|
|search.results.items.weather.alerts.source|String|False|Yes|Source of the alert|
|search.results.items.weather.alerts.sourceId|String|False|Yes|Source ID of the alert|
|search.results.items.weather.alerts.area|{array}|False|Yes|Array of areas|
|search.results.items.weather.alerts.area.name|String|False|Yes|Location name|
|search.results.items.weather.alerts.area.startTime|Date|False|Yes|Alert start time|
|search.results.items.weather.alerts.area.endTime|Date|False|Yes|Alert end time|
|search.results.items.weather.alerts.area.status|String|False|Yes|Status of alert|
|search.results.items.weather.alerts.area.text|String|False|Yes|Full text description of the alert|
|**Weather suggestions**|
|search.results.items.weather.suggestions|{array}|False|Yes|Weather sugestions|
|search.results.items.weather.suggestions.id|String|False|Yes|Suggestion rank or Id|
|search.results.items.weather.suggestions.name|String|False|Yes|Suggestion city name|
|search.results.items.weather.suggestions.type|String|False|Yes|Suggestion type or category|
|search.results.items.weather.suggestions.metas|{object}|False|Yes|Suggestion metas|
|search.results.items.weather.suggestions.metas.distance|Float|False|Yes|City/location distance from specified position|
|search.results.items.weather.suggestions.metas.filter|String|False|Yes|Filter to be used in subsequent search filter|
|**Apps**|
|search.results.items.app|{object}|False|No|Media/app|
|search.results.items.app.appId|String|False|Yes|app identifier|
|search.results.items.app.ownerAppId|String|False|Yes|App identifier as specified by app provider.|
|search.results.items.app.type|String|True|Yes|Type of the app|
|search.results.items.app.version|String|True|Yes|Application version|
|search.results.items.app.providerId|String|True|Yes|The ID of the provider of the app|
|search.results.items.app.serviceId|String|True|Yes|The ID of the service|
|search.results.items.app.created|String|True|Yes|The time when the app is created|
|search.results.items.app.modified|String|True|Yes|The time when the app is modified|
|search.results.items.app.startTime|String|False|Yes|The start time of the app|
|search.results.items.app.state|String|True|Yes|The state of the app|
|search.results.items.app.validUntil|String|False|Yes|"The end time of the validation for the App"|
|search.results.items.app.metas|{array}|False|Yes|Array of {attribute:value}|
|search.results.items.app.category|{array}|False|Yes|The category that the app belongs to.|
|search.results.items.app.category.categoryId|String|True|Yes|The ID of the category|
|search.results.items.app.category.name|String|True|Yes|The name of the category|
|search.results.items.app.category.created|String|True|Yes|The time when the category is created|
|search.results.items.app.category.modified|String|True|Yes|The latest time when the category is modified|
|search.results.items.app.category.metas|{array}|False|Yes|Array of {attribute:value}|
|search.results.items.app.group|{array}|False|Yes|Array of groups of the app|
|search.results.items.app.group.metas|{array}|False|Yes|Array of {attribute:value}|
|search.results.items.app.group.type|String|True|Yes|The type of the group|
|search.results.items.app.group.deviceFiltered|String|True|Yes|If the devices are filtered in the Group|
|search.results.items.app.group.deviceCompatible|Boolean|True|Yes|"If the devices are compatible with the group"|
|search.results.items.app.group.preferredItem|{object}|False|Yes|The preferred item in the group|
|search.results.items.app.group.item|{array}|False|Yes|The items belong to the group|
|search.results.items.app.group.item.metas|{array}|False|Yes|Array of {attribute:value}|
|search.results.items.app.group.item.type|String|False|Yes|The type of the item|
|search.results.items.app.group.item.uri|String|True|Yes|The URI of the item|
|search.results.items.app.group.item.contentType|String|True|Yes|The type of the content in the item|
|search.results.items.app.group.item.filename|String|True|Yes|The file name of the content in the item|
|search.results.items.app.group.item.size|Long|True|Yes|The file size of the content in the item|
|search.results.items.app.group.item.downloadUri|String|True|Yes|The download URI of the item|
|search.results.items.app.group.item.accessUri|String|True|Yes|The access URI of the item|
|search.results.items.app.group.item.giftUri|String|True|Yes|The gift URI of the item|
|search.results.items.app.group.item.devicePreferred|String|False|Yes|The item to be preferred by the device|
|search.results.items.app.group.item.referencedItem|{object}|False|Yes|The item to be referenced by the current item. The reference item and the current item must be in the same group|
|search.results.items.app.group.item.device|{object}|False|Yes|The valid devices for the item|
|search.results.items.app.group.item.device.deviceId|String|True|Yes|The ID of the device|
|search.results.items.app.group.item.device.brand|String|True|Yes|The brand of the device|
|search.results.items.app.group.item.device.model|String|True|Yes|The model of the device|
|search.results.items.app.group.item.device.userAgent|String|True|Yes|The user agent of the device|
|search.results.items.app.purchase|{object}|False|Yes|Purchase transaction details (returned only if the app was purchased by specified user).|
|search.results.items.app.purchase.purchaseId|String|True|Yes|The purchase ID that is given when a purchase is done.|
|search.results.items.app.purchase.price|Long|False|Yes|The price.|
|search.results.items.app.purchase.description|String|False|Yes|The product description.|
|search.results.items.app.purchase.created|String|False|Yes|The product description.|
|search.results.items.app.purchase.serviceId|String|False|Yes|The service ID.|
|search.results.items.app.purchase.productId|String|False|Yes|The product ID.|
|search.results.items.app.purchase.providerId|String|False|Yes|The Provider ID.|
|search.results.items.app.purchase.vatCode|String|False|Yes|The VAT code.|
|search.results.items.app.purchase.vatPrice|Long|False|Yes|The VAT price.|
|search.results.items.app.purchase.type|String|False|Yes|"The purchase type. It is an enumeration type and defined as follows: NORMAL, GIFT_PURCHASE, GIFT"|
|search.results.items.app.purchase.state|String|False|Yes|"The purchase state. It is an enumeration type and defined as follows: OPEN, OFFERED, CLOSED|
|search.results.items.app.purchase.recurrentPurchaseId|String|False|Yes|The ID of the recurrent purchase. If the purchase is a recurrent purchase then it has a value, otherwise it is empty.|
|search.results.items.app.purchase.recurrentIntervalExpirationTime|String|False|Yes|The time when the recurrent purchase is expired.|
|search.results.items.app.purchase.recurrenceCancelTime|String|False|Yes|The time when the recurrent purchase is canceled.|
|search.results.items.app.purchase.recurrenceExpirationTime|String|False|Yes|The time when the recurrence is expired.|
|search.results.items.app.purchase.renewalsAllowed|Integer|False|Yes|Total allowed renewal times of the current product.|
|search.results.items.app.purchase.renewalsDone|Integer|False|Yes|Number of renewals done.|
|search.results.items.app.purchase.metas|{array}|False|Yes|Array of {attribute:value}.|
|search.results.items.app.rating|{object}|False|Yes|Rating information|
|search.results.items.app.rating.rating|Float|True|Yes|The average rating scores|
|search.results.items.app.rating.ratingDetails|{array}|False|Yes|Array of rating details object.|
|search.results.items.app.rating.ratingDetails.level|Integer|False|Yes|The rating level (From level 1 to 5 in 5 star rating).|
|search.results.items.app.rating.ratingDetails.number|Integer|False|Yes|The number of raters for each level.|
|search.results.items.app.search.score|Float|True|Yes|"Specifies the score of search results. The range of the score value is from 0 to 1. The app search results will be sorted as the descending order of the score. The larger the score is, the better the searching result is matched.|
|search.results.items.app.permissions|{array}|False|Yes|Permission info|
|search.results.items.app.permissions.permission.description|String|False|Yes|Resource description|
|search.results.items.app.permissions.permission.icon|String|False|Yes|URI to the icon representing the resource|
|search.results.items.app.permissions.permission.label|String|True|Yes|Display text of the resource|
|search.results.items.app.permissions.permission.name|String|True|Yes|Resource unique name (permission ID)|
|search.results.items.app.permissions.permission.permissionGroup|String|True|Yes|Permission group or category refers to permission-group|
|search.results.items.app.permissions.permission.protectionLevel|String|False|Yes|["normal", "dangerous", "signature", "signatureOrSystem"]|
|search.results.items.app.permissions.permissionGroup.description|String|False|Yes|Permission group description|
|search.results.items.app.permissions.permissionGroup.icon|String|False|Yes|URI to the icon representing the permission group|
|search.results.items.app.permissions.permissionGroup.label|String|True|Yes|Display text of the permission group|
|search.results.items.app.permissions.permissionGroup.name|String|True|Yes|Permission group unique name (permission group ID)|
|search.results.items.app.permissions.permissionTree.icon|String|False|Yes|Icon representing all permissions in the tree|
|search.results.items.app.permissions.permissionTree.label|String|True|Yes|Displayed permission tree name|
|search.results.items.app.permissions.permissionTree.name|String|True|Yes|Permission tree name (ID)|
|search.results.items.app.permissions.usesPermission.name|String|True|Yes|Permission name application is requesting access to.|
|search.results.items.app.permissions.usesPermission.maxSdkVersion|String|False|Yes|Applicable only for Android |search.results.items.app and Android related permissions.|
|**App suggestions**|
|search.results.items.app.suggestions|{array}|False|Yes|App sugestions|
|search.results.items.app.suggestions.id|String|False|Yes|Suggestion rank or Id|
|search.results.items.app.suggestions.name|String|False|Yes|Suggestion app name|
|search.results.items.app.suggestions.type|String|False|Yes|Suggestion type or category|
|search.results.items.app.suggestions.metas|{object}|False|Yes|Suggestion metas|

###Get search results
**Usage:** `drive.search.get(options).then(resolve, reject);`

**Description:** The get method returns search results object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with contact information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving search result information.

**Returns:** Promise

####Example: get contacts
```javascript
function logResults(items){
   console.log(items);
}

function logError(error){
   console.log(error);
}

function getResults(){
   drive.search.results.get().then(logResults,logError);
}
```

###Set search request
**Usage:** `drive.search.set(settings,options).then(resolve, reject)`

**Description:** The set method allows interact with search service for instance get places.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting search information.

**Returns:** Promise

####Example: Search POIs
```javascript
var handle=
drive.search.results.subscribe(getResults,{"requestId":"poi-1"});

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function searchPOIs(){
drive.search.request.set({"requestId":"poi-1", "serviceType":"poi", "query":"gas station", "metas":{"currentPostion":true,"radius":5000}}).then(resolve,reject);
}

function getResults(results){
console.log(results);
}
```

####Example: Search current weather
```javascript
var handle=
drive.search.results.subscribe(getResults,{"requestId":"w-1"});

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function getCurrentWeather(){
drive.search.request.set({"requestId":"w-1", "serviceType":"weather", "query":"", "contentType":"current", "metas":{"currentPostion":true}}).then(resolve,reject);
}

function getResults(results){
console.log(results);
}
```

####Example: Search forecast weather
```javascript
var handle=
drive.search.results.subscribe(getResults,{"requestId":"w-1"});

function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function getCurrentWeather(){
drive.search.request.set({"requestId":"w-1", "serviceType":"weather", "query":"", "contentType":"forecast", "metas":{"currentPostion":true}}).then(resolve,reject);
}

function getResults(results){
console.log(results);
}
```

###Delete search requests/results
**Usage:** `drive.search.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete search requests/results.

**Parameters:**
- {object} settings - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting search data.

**Returns:** Promise

####Example:
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteContcats(){
  drive.search.results.delete().then(resolve,reject);
}
```

###Subscribe to search service
**Usage:** `handle = drive.search.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with search results/request object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to running apps
```javascript
function getResults(results){
  console.log(results);
}

function subscribe(){
handle=drive.search.results.subscribe(getResults);
}
```

###Unsubscribe from search service
**Usage:** `drive.search.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
- {object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.search.results.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.search.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes. See policy manager section for more details.

**Parameters:**
- None

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example
```javascript
function isAvailable(){
    return drive.search.requests.available();
}
```

## <a name="site-automation"></a>Site Automation (Digital Life)
This Javascript SDK describes how to interact with site automation.
The following interface represents a base interface to all site automation properties:
```javascript
interface SiteAutomationInterface {
    Promise get (optional object options);
    Promise set (object value, optional object options);
    Promise delete (object value, optional object options);
    Integer subscribe (InterfaceCallback callback, optional object options);
    void unsubscribe (Integer handle);
    Availability available ();
};
callback InterfaceCallback = void(object value, EventType eventType); ();

enum EventType {
"create",
"read",
"update",
"delete"
};

interface CommonDataType {
    readonly    attribute DOMTimeStamp timeStamp;
};
```
CommonDataType interface represents common data type for all data types.

###Site automation properties
Below properties is a subset of possible attributes that site automation may support. More attributes shall be added in the next version of this SDK.

|Parameter|Type|Required|Read only|Description|
|--- |--- |--- |--- |--- |
|sa|{object}|False|yes|Application name|
|**Requests**|
|sa.requests|{array}|False|yes|Site automation requests|
|sa.requests.requestId|String|False|No|Request Identifier. If not specified the requestId will be set to the same value as action. This allows sharing results among apps.|
|sa.requests.action|String|True|No|set, get, reset, delete, cancel, trigger,…|
|sa.requests.type|String|True|No|resource, resourcetype, group, event|
|sa.requests.id|String|True|No|ID of the resource, group, resource type or event.|
|sa.requests.siteIds|{array}|False|No|Array of site IDs. E.g. ["home", "office"]. If not specified, all sites will be returned.||
|sa.requests.state|String|False|No|on|off|disable|enable|
|sa.requests.metas|{array}|False|No|Array of {attribute: value}|
|**Results**|
|sa.results|{array}|True|Yes|Array of results.|
|sa.results.requestId|String|False|Yes|Site automation Request ID|
|sa.results.status|String|True|Yes|Status code for the operation: success | failure : error code|
|sa.results.requestTime|Date|True|Yes|Request date time|
|sa.results.responseTime|Date|True|Yes|Response date time|
|**Sites**|
|sa.results.sites|{array}|False|Yes|Array of sites.|
|sa.results.sites.id|String|True|Yes|The site ID.|
|sa.results.sites.name|String|False|Yes|The site name.|
|sa.results.sites.description|String|False|Yes|The site description.|
|sa.results.site.state|String|False|Yes|"The site state. It is an enumeration type and defined as follows: enabled|disabled|unkown|error:code"|
|sa.results.sites.metas|{array}|False|Yes|Meta data of the resource. Array of {attribute: value}|
|sa.results.sites.groups|{array}|False|Yes|Array of resource groups the resource belongs to.|
|sa.results.sites.resourcetypes|{array}|False|Yes|Array of resource types the resource belongs to.|
|sa.results.sites.resources|{array}|False|Yes|Array of resources.|
|**Resource**|
|sa.results.resources|{array}|False|Yes|Current resources|
|sa.results.resources.id|String|True|Yes|The resource ID.|
|sa.results.resources.name|String|False|Yes|The resource name.|
|sa.results.resources.description|String|False|Yes|The resource description.|
|sa.results.resources.state|String|False|Yes|"The resource state. It is an enumeration type and defined as follows: on, off, starting, stopping, disabled, unkown, error:code"|
|sa.results.resources.metas|{array}|False|Yes|Meta data of the resource. Array of {attribute: value}|
|sa.results.resources.groups|{array}|False|Yes|Array of resource groups the resource belongs to.|
|sa.results.resources.resourcetypes|{array}|False|Yes|Array of resource types the resource belongs to.|
|sa.results.resources.site|{object}|False|Yes|Site the resource belongs to (see |sa.results.sites for object structure).|
|**Resource features**|
|sa.results.resources.settings|{array}|False|Yes|Represents resource features or settings.|
|sa.results.resources.settings.id|String|False|Yes|Setting/Feature ID.|
|sa.results.resources.settings.name|String|False|Yes|Setting/Feature name.|
|sa.results.resources.settings.description|String|False|Yes|Setting/Feature description.|
|sa.results.resources.settings.state|String|False|Yes|"The resource feature state. It is an enumeration type and defined as follows: on, off, starting, stopping, disabled, unkown, error:code"|
|sa.results.resources.settings.metas|{array}|False|Yes|Meta data of the resource setting/feature. Array of {attribute: value}|
|**Resource type**|
|sa.results.resourcetypes|{array}|False|Yes|Resource types|
|sa.results.resourcetypes.id|String|True|Yes|The resource type ID.|
|sa.results.resourcetypes.name|String|True|Yes|The resource type name.|
|sa.results.resourcetypes.description|String|False|Yes|The resource type description.|
|sa.results.resourcetypes.state|String|False|Yes|"The resource type state. It is an enumeration type and defined as follows: on, off, starting, stopping. disabled, unkown, error:code"|
|sa.results.resourcetypes.metas|{array}|False|Yes|Resource type metadata. Array of {attribute: value}|
|sa.results.resourcetypes.resources|{array}|False|Yes|Array of resources under this resource type|
|sa.results.resourcetypes.groups|{array}|False|Yes|Array of resources groups under this resource type|
|**Resource groups**|
|sa.results.groups|{array}|False|Yes|Current resource groups|
|sa.results.groups.id|String|True|Yes|The resource group ID.|
|sa.results.groups.name|String|True|Yes|The resource group name.|
|sa.results.groups.description|String|False|Yes|The resource group description.|
|sa.results.groups.state|String|False|Yes|"The resource group state. It is an enumeration type and defined as follows: on, off, starting, stopping, disabled, unkown, error:code"|
|sa.results.groups.metas|{array}|False|Yes|Resource group metadata. Array of {attribute: value}|
|sa.results.groups.resources|{array}|False|Yes|Array of resources under this resource group|
|sa.results.groups.groups|{array}|False|Yes|Array of resources groups under this resource group|
|sa.results.groups.resourcetypes|{array}|False|Yes|Array of resources types under this resource group|

###Get Site Automation Information
**Usage:** `drive.sa.get(options).then(resolve, reject);`

**Description:** The get method returns site automation information object.

**Parameters:**
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called with site automation information data object if the operation is successful. See data object format below.
- {function} reject Optional - Function called in case of error retrieving site automation information.

**Returns:** Promise

####Example: get site automation resource status
```javascript
function logStatus(results){
   console.log(results.status);
}

function logError(error){
   console.log(error);
}

function getResourceStatus(){
   drive.sa.results.get().then(logStatus,logError);
}
```

###Set site automation Information
**Usage:** `drive.sa.set(settings,options).then(resolve, reject)`

**Description:** The set method allows setting some site automation parameters.

**Parameters:**
- {object} settings - Settings object value (attributes values) 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting site automation information.

**Returns:** Promise

####Example: Send request
```javascript
function resolve(){
///success
}

function reject(error){
   console.log(error);
}

function sendRequest(){
   drive.sa.requests.set({"action":"get", "type":"resource", "id":"garagedoor-1", "siteIds":["home"]}).then(resolve,reject);
}
```

###Delete Site automation Settings
**Usage:** `drive.sa.delete(settings,options).then(resolve, reject)`

**Description:** The delete method allows delete previous settings.

**Parameters:**
- {object} setting - Settings attribute names 
- {object} options Optional - Options object allows specifying filters.
- {function} resolve - Function called if the operation is successful. 
- {function} reject Optional - Function called in case of error setting site automation information.

**Returns:** Promise

####Example:
```javascript
function resolve(){
///success
}

function reject(error){
  console.log(error);
}

function deleteResults(){
  drive.sa.results.delete().then(resolve,reject);
}
```

##Subscribe to site automation
**Usage:** `handle = drive.sa.subscribe(callBack,options);`

**Description:** The subscribe method allows registering for value change events. Specified callback function will be called when that event occurs.

**Parameters:**
- {function} callBack - Function called on value change with site automation information data object. See data object format below.
- {object} options Optional - Options object allows specifying filters.

**Returns:** {Integer} handle
Subscribe returns handle to subscription or 0 if error. 

####Example: subscribe to site automation result
```javascript
function resourcesResult(results){
  console.log(results.resources);
}

function subscribe(){
handle=drive.sa.results.subscribe(resourcesResult, {"requestId":"set.alarm"});
}
```

###Unsubscribe from site automation
**Usage:** `drive.sa.unsubscribe(handle);`

**Description:** The unsubscribe method allows application to stop data notifications.

**Parameters:**
{object} handle - "handle" corresponds to subscription handle object returned by subscribe method. 

**Returns:** void

####Example
```javascript
function unsubscribe(){
     drive.sa.results.unsubscribe(handle);
}
```

###Access/Availability check
**Usage:** `drive.sa.available();`

**Description:** This method allows to check whether a given attribute or object is supported and accessible. 
When available method returns not_supported_policy, application can subscribe to policy manager to get notifications when resource state changes. See policy manager section for more details.

**Parameters:**
- None.

**Returns:** String
- "available": resource is available (read/write).
- "readonly": resource is available in read only mode.
- "not_supported": resource is not supported by current vehicle or head unit.
- "not_supported_yet": resource is not currently supported by current vehicle or head unit but planned to be supported in future releases.
- "not_supported_security": the resource is not accessible by other applications (private access).
- "not_supported_policy": resource cannot be accessed at this time because of policy constraints. Application can subscribe to policy events to get notified when state of resource changes (allowed, denied or restricted).

####Example:
```javascript
function isAvailable(){
    return drive.sa.requests.available();
}
```

**Error object format**

|Parameter |Type |Required |Description|
|---    |---    |---    |---    |
|error |String |True |Error code|
|message |String |False |Error message|

**Common error codes**

|Code |Description|
|---    |---    |
|invalid_parameter |Invalid parameters|
|not_authenticated |Not authenticated|
|not_authorized |Not authorized|
|connection_timeout |Communication error|


