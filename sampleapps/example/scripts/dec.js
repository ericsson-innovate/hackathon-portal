/*
1. Set subscriptions
2. Add parsing for all subscriptions and attach result to the $rootScope
3. Set watchers on $rootScope, where received data is going to be consumed(controllers)
*/

function decSetSubscriptions() {
    //*** TODO: Set here subscription to all namespaces you are interested in
    drive.vehicleinfo.subscribe(decCallback, logError);
    drive.navigation.subscribe(decCallback, logError);
    drive.notification.subscribe(decCallback, logError);
    drive.identity.users.subscribe(decCallback, logError);
    drive.commerce.subscribe(decCallback, logError);
    drive.settings.subscribe(decCallback, logError);
}

function decCallback(decResponse) {
    console.info("sample-app: Calling back Dec with response: " + JSON.stringify(decResponse));
    process(decResponse);
};

function process(data) {
    console.info("sample-app: Process = ", data);

    if (data.pois != null) {
        $rootScope.pois = data.pois;
    }
    if (data.position != null) {
        $rootScope.position = data.position;
    }
    if (data.identification != null) {
        $rootScope.identification = data.identification;
    }
    if (data.fuel != null) {
        $rootScope.fuel = data.fuel;
    }
    if (data.ignition != null) {
        $rootScope.ignition = data.ignition;
    }
    if (data.parkingBreak != null) {
        $rootScope.parkingBreak = data.parkingBreak;
    }
    if (data.diagnostic != null) {
        $rootScope.diagnostic = data.diagnostic;
    }
    if (data.climateControl != null) {
        $rootScope.climateControl = data.climateControl;
    }
    if (data.sideWindow != null) {
        $rootScope.sideWindow = data.sideWindow;
    }
    if (data.door != null) {
        $rootScope.door = data.door;
    }
    if (data.tire != null) {
        $rootScope.tire = data.tire;
    }
    if (data.lightStatus != null) {
        $rootScope.lightStatus = data.lightStatus;
    }

    //*** TODO: Add parsing for all made subscriptions

    $rootScope.$apply();
};

function logError(errorMsg) {
    console.log("sample-app: Error = ", errorMsg);
};