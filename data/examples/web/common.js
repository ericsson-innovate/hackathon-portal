// ## START COMMON
/*
  Ajax Request Method

  The below method gives you a generic AJAX interface between you
  and the Ericsson Server. Please note there are several variables
  in the beginning of the code that you may need to change in order
  for your requests to be successful (they all start with "_")

  This self-executing block with return the sendRequest method, which
  will then be assigned to AJAX, for your use. Simply include this file
  before any of your own custom logic.


  Sample Use and config object overview:

  // my ajax request
  AJAX({
    type : "POST || GET || DELETE || PUT", (request type)
    url  : "/subscriber/v1/subscriber/update/1234", (url route *without* protocal/domain/etc...)
    data : { firstName : "Joe" }, (request parameters as a JS Object)
    success : function(responseJSON){}, (your callback to fire on success)
    error : function(xhrObject){}, (your callback to fire on error)
  });



*/

var AJAX = (function(){


  // These 4 variables below can be edited by you if necessary
  var _domain = "http://car2.hack.att.io:3000";
  var _authUser = "provider";
  var _authPass = "1234";
  var _apiKey = "1234";



  // generic method to parse JSON without fatally erroring
  // @return: json object or null if parse was unsuccessful
  var parseJSON = function(data){
    var jsonData = null;

    try{
      jsonData = JSON.parse(data);
    }
    catch(e){};

    return jsonData;
  };


  // this is the actual method that will be assigned to AJAX
  var sendRequest = function(reqObj){

    // if no request object was passed, return false
    if(!reqObj || typeof(reqObj) !== "object"){
      return false;
    }

    // this block goes through some of the request configs
    // and sets them to defaults if necessary
    reqObj.type = reqObj.type || "GET";
    reqObj.url  = _domain + (reqObj.url || "/");
    reqObj.data = reqObj.data || false;

    // stringify the data object (if its an object)
    if(reqObj.data && typeof(reqObj.data) === "object"){
      reqObj.data = JSON.stringify(reqObj.data);
    }

    // on success callback
    // this parses the response data before passing it on to any
    // custom success callback given in the request configs
    var onSuccess = function(data){
      console.log("Request Successful",data);
      if(reqObj.success && typeof(reqObj.success) === "function"){
        var respData = parseJSON(data.responseText)
        reqObj.success(respData);
      }
    };

    // on error callback
    // this simply calls any error callback given in the request configs
    // and passes along the xhr request object for you to utilize
    var onError = function(xhr){
      console.log("Request Error",xhr);
      if(reqObj.error && typeof(reqObj.error) === "function"){
        reqObj.error(xhr);
      }
    };

    // lets start creating the request
    var xhr = new XMLHttpRequest();

    // when the state changes, we'll check to see its status
    xhr.onreadystatechange = function(){
      // if request is DONE
      if(xhr.readyState === 4){
        // if the status code is in the 200 range, we'll accept as successful
        if(parseInt(xhr.status / 100) === 2){
          onSuccess(xhr);
        }
        // otherwise, we'll reject as unsuccessful
        else{
          onError(xhr);
        }
      }
    };

    // open the request and add some headers before sending off
    xhr.open(reqObj.type, reqObj.url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(_authUser + ":" + _authPass));
    xhr.setRequestHeader("APIKey", _apiKey);
    xhr.setRequestHeader('Accept', 'application/json');

    // send the request
    xhr.send(reqObj.data);

    console.log("DONE:",reqObj);

    return true;

  };
  // end sendRequest method


  // return the sendRequest method to expose it publicly
  return sendRequest;


})();
// ## END COMMON
