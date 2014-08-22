// ## START COMMON
function sendRequest(requestParams, successCallback, errorCallback) {
  var xhr;

  requestParams.headerParams['Content-Type'] = 'application/json';

  xhr = new XMLHttpRequest();

  xhr.addEventListener('load', onRequestLoad, false);
  xhr.addEventListener('error', onRequestError, false);
  xhr.addEventListener('abort', onRequestAbort, false);

  xhr.open(requestParams.verb, requestParams.url + requestParams.route, true);
  setHeaderParams(xhr, requestParams.headerParams);
  xhr.send();

  // --- Helper functions --- //

  function setHeaderParams(xhr, headerParams) {
    for (var key in headerParams) {
      xhr.setRequestHeader(key, headerParams[key]);
    }
  }

  function onRequestLoad() {
    var data, message;

    console.log('The transfer is complete: status="' + xhr.statusText + '"');

    // Check whether we received an HTTP status code of 2xx
    if (parseInt(xhr.status / 100) === 2) {
      console.log('Our request was successful');

      try {
        // Try to parse the response as JSON data
        data = JSON.parse(xhr.responseText);
      } catch (error) {
        message = 'Unable to parse response body as JSON: responseText=' + xhr.responseText;
        console.error(message);
        errorCallback(message);
        return;
      }

      successCallback(data);
    } else {
      message = 'The server responded with an error code';
      console.error(message);
      errorCallback(message);
    }
  }

  function onRequestError() {
    var message = 'An error occurred while transferring the data';
    console.error(message);
    errorCallback(message);
  }

  function onRequestAbort() {
    var message = 'The transfer has been cancelled by the user';
    console.error(message);
    errorCallback(message);
  }
}
// ## END COMMON
