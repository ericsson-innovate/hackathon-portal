// ## START 2.6.1-sign-up
var vin, requestParams;

vin = 'vin-1234';

requestParams = {
  url: 'http://lightning.att.io:3000',
  route: '/remoteservices/v1/vehicle/signup/' + vin,
  verb: 'POST',
  headerParams: {
    authString: 'Basic cHJvdmlkZXI6MTIzNA==',
    apiKey: 'api-key-1234'
  }
};

sendRequest(requestParams, function (data) {
  // SUCESS
}, function (errorMessage) {
  // ERROR
});
// ## END 2.6.1-sign-up
