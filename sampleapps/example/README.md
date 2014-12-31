##Prerequisites
Before you start development make sure you have the following installed:
[NodeJS](http://nodejs.org) (.exe or .dmg installers are available)
Once Node is installed and running, using terminal as sudo (Node shell running as Administrator on Windows):
Install globally Grunt, Karma, Bower and Grunt-Cli: $npm install -g grunt bower karma grunt-cli http-server

Clone sample-app
`git clone https://github.com/ericsson-innovate/sample-app.git`

###Start sample-app
cd sample-app
run `http-server`
Go to localhost:8080 and verify that application is running

###Run Head Unit App - On Android
Open AT&T drive
Open Settings
Open Development Tab
- Enable App Development Mode
- Input your local ip/port (ifconfig on your local machine) to your local machine to get sample app
- Click into “Test App” or whatever name you’ve given it into main menu

###Simulate Navigation - On Android
On Android -> Click into nServices
- Set Routing On
- Set Starting Location (address)
- Set Destination (address)
- Set transmission to Drive
- Set Speed to what speed is desired

###Simulate Diagnostics - On Laptop
Go to [http://mafalda.hack.att.io/](http://mafalda.hack.att.io/)
Set values

Start development
- For each application update don’t forget to go into AT&T Drive -> Settings -> Development -> Refresh

