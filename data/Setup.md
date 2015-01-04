# Head Unit development environment setup
AT&T Head Unit apps are built with HTML5 for AngularJS framework. Sample apps contain directives for UI and essential functionality like app menu, app routes, init and hooks into the middle-ware data and event controller.

App framework contains automation and helper tools for which we need to install NodeJS, and some of its libraries. You can get started in two ways; Using Virtual Machine or by installing developer environment manually into your local environment.


## Installing developer environment using virtual machine 
This is the fastes way to get coding as application framework and its dependencies are preconfigured. Using Vagrant is simple and upon installation all you need to do is SSH into the VM and start coding.

### AT&T Drive App Development VM 
This virtual machine will get you up and running with development very fast. If you are planing on continuing building you app for AT&T Drive its best if you setup your local development environment locally following the steps below.

## Installing developer environment manually into local environment
Suggested method if you intent to get serius about developing apps for AT&T Drive.

### Step 1: 
#### Before you start
Before you start development make sure you have the following installed:
- NodeJS [http://nodejs.org](http://nodejs.org) (.exe or .dmg installers are available)

Once Node is installed and running, using terminal as sudo (Node shell running as Administrator on Windows): 
- Install globally Grunt, Karma, Bower and Grunt-Cli: `npm install -g grunt bower karma grunt-cli http-server`

### Step 2: 
#### Install Head Unit simulator and DEC service
> Hackaton participants: Request hardware from the organizers. See AT&T or Ericsson booth for help. You will skip this step.

#### Configure Head Unit Simulator
> Hackaton participants: Request hardware from the organizers. See AT&T or Ericsson booth for help.
Note: There has been some issues with network latency at the Developer Summit that causes slow response of the Head Unit. We are looking for a workaround. 

### Step 3: 
#### Installing App Framework
- Verify you have performed **Step 1**
- Download UI Kit Framework [github](https://github.com/ericsson-innovate/ATT-Drive-UI-Framework)
- Change directory to Connected-Car-SDK folder 
- Run: `npm install`
- Then: `bower install`

#### Building apps for Head Unit
App framework contains all the essentials to build standardized head unit apps, and starting your app from the sample apps is the fastest way to get started. Then take advantage of the [UI Kit API Docs](http://attgarage.msg.betelab.ericy.com:443/ui-toolkit/) to visualize the UX, and get the example code. You may also install the UI Kit reference site locally by following the instructions below. 

Now you are ready to build your first app, and the API is readily available. 

#### Seed your first app
Once you download the SDK, using terminal in "Connected-Car-SDK" folder run this command: `grunt seed --dec-host=YOUR_LAPTOP_IP --dec-port=4412 -name=/full/path/to/your/app` Make sure you provide the full path to where you want to place your seed app. You only need to run this once to compile the seed of the app framework. (you can change the default IP and port if needed in DEC-SDK folder). You can always change this later (see optional commands).

Go to the app you just seeded and from with the folder run `http-server` command. This will serve the app on 127.0.0.1:8080 (it will show the port number). 

If you see a message in the app: Deck Status [OFFLINE] that means that your app is not communicating with the DEC on the Head Unit simulator. Check for the services running on the Head Unit and make sure IP adresses are mapping correctly between the Head Unit and the app on your laptop. 

If you see Deck Status [ONLINE], the app is connected to DEC and you are ready for development. 

Now get familiar with APIs: 
- [In-car Apps API Docs](http://attgarage.msg.betelab.ericy.com:443/driveSdk/#/api-docs/vehicle-apps-api)
- [UI Kit API Docs](http://attgarage.msg.betelab.ericy.com:443/ui-toolkit/)

# Optional stuff
### Running the docs website locally 
Default browser should auto-start and open your localhost URL: [http://localhost:9000](http://localhost:9000) after you execute grunt serve command. `grunt serve`

### Sample apps
Sample apps are the best place to start and you can download them from [github](https://github.com/ericsson-innovate/sample-app). Sample apps contain directives for UI and essential functionality like app menu, app routes, init and hooks into the middle-ware data and event controller.

#### Following sample apps are available:
- Hello World - Blank app with hooks to DEC API
- Navigation app - With an example function to pass an events to navigation app via DEC
- Vehicle Info app - Passes the vehicle information from TCU via the DEC

Once you download the sample app locally, in terminal CD to that directory and inside the app folder of the app you wish to load, run `http-server`. Browser should pop-up showing you the app running, If your browser is able to communicate with the DEC service you should be able start building your apps.

### Helper commands (run in terminal inside the Connected-Car-SDK folder)
- Change SPAN Host IP: `grunt seed --dec-host=myHost`
- Change SPAN Port: `grunt seed --dec-port=12345`
- Launch UI Kit preview site locally: `grunt serve`
- Start your app (indide the app root folder) `http-server`
- Rebuild SDK (if updated) `grunt build` then copy & paste the dist/ATT-SDK folder to your app

## Building apps on Hand-held device
You can build the external apps to interface with in-vehicle Head Unit and exchange information over [REST API](http://attgarage.msg.betelab.ericy.com:443/driveSdk/#/api-docs/web-apps-api/getting-started). You can also simulate (override) the TCU data via [Luigi](http://mafalda.hack.att.io) interface and see the result in the vehicle app and hand-held app alike.

- [Out-of-car Apps API](http://attgarage.msg.betelab.ericy.com:443/driveSdk/#/api-docs/web-apps-api/getting-started)
- [Luigi Sandbox](http://mafalda.hack.att.io) 

> Example: You can build a wearable app to send navigation instructions to the vehicle Head Unit navigation app, or to remotely control the vehicle.

