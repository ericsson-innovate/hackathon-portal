// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// ## START 2.6.1-sign-up
var xhr, url, route, vin, authString, apiKey;

url = 'http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com/';

vin = 'vin-1234';// TODO: where does this come from?
authString = 'dXNlcm5hbWU6cGFzc3dvcmQ=';// TODO: where does this come from? base64 encoded, right?
apiKey = 'api-key-1234';// TODO: where does this come from?

route = '/remoteservices/v1/vehicle/signup/' + vin;

xhr = new XMLHttpRequest();

xhr.addEventListener('load', onLoad, false);
xhr.addEventListener('error', onError, false);
xhr.addEventListener('abort', onAbort, false);

xhr.open('POST', url + route, true);
xhr.setRequestHeader('Authorization', authString);
xhr.setRequestHeader('APIKey', apiKey);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

function onLoad() {
  console.log('The transfer is complete: status="' + xhr.statusText + '"');

  if (xhr.status === 200) {
    // SUCCESS
  } else {
    // ERROR
  }
}

function onError() {
  console.error('An error occurred while transferring the data');
}

function onAbort() {
  console.error('The transfer has been cancelled by the user');
}
// ## END 2.6.1-sign-up

// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example
// TODO: add example