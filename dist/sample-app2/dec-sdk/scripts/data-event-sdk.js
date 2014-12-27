function handleDeleteWithOptions(e,t,o,n,a){var l="";if(!o||n||a)if(n)handleDeleteOfArrayTypes(e,t);else if(a)handleDeleteOfMapTypes(e,t);else{console.log("Delete items at the parent level"),console.log("JSON: "+t);var r=JSON.stringify(t),s=JSON.parse(r);console.log("json parse"+s);for(attrKey in s){attrKey=attrKey,l=s[attrKey],console.log("ATTRIBUTE KEY::  "+attrKey),console.log("ATTRIBUTE VALUE::  "+l);var i=e+"."+attrKey,c=getCurrentObject(getComponent(i),getNameSpace(i));null!=c&&c.isArray&&handleDeleteOfArrayTypes(i,l)}}else console.log("Delete items at the leaf level for non array types"),l=localStorage.removeItem(e)}function handleDeleteOfArrayTypes(e,t){var o=localStorage.getItem(e);if(null!=o){var n=JSON.parse(o);console.log("JSON: "+t);var a=JSON.stringify(t),l=JSON.parse(a);console.log("json parse"+l);var r=new Array,s=new Array,i=0;for(attrKey in l)r[i]=attrKey,s[i]=l[attrKey],i++;for(var c=(new Array,0);c<n.length;c++)for(var g=0;i>g;g++){var d=r[g],p=s[g],u=n[c];u[d]===p&&(console.log("Item matches, deleting from the array"),delete n[c])}n=n.filter(function(e){return null!==e}),localStorage.setItem(e,JSON.stringify(n))}}function handleDeleteOfMapTypes(e,t){for(var o=localStorage.getItem(e),n=JSON.parse(o),a=JSON.parse(t),l=(new Object,0);l<a.length;l++){var r=a[l];null!==n[r]&&delete n[r]}}function handleDeleteWithNoOptions(e,t){var o="";if(t)console.log("Delete called at leaf level with no options"),o=localStorage.removeItem(e);else{console.log("Delete called at parent level with no options");for(var n=Object.keys(localStorage),a=(new Array,0);a<n.length;a++)isNaN(parseInt(n[a]))&&-1!=n[a].indexOf(e)&&localStorage.removeItem(n[a])}}function showLocalStorage(){var e="",t="<table><tr><th>Name</th><th>Value</th></tr>",o=0;for(console.log("Local Storage length is"+localStorage.length),o=0;o<=localStorage.length-1;o++)e=localStorage.key(o),t+="<tr><td>"+e+"</td><td>"+localStorage.getItem(e)+"</td></tr>";t+="</table>",document.write(t)}function checkPermissions(e,t,o,n){console.log(e+t+o+n);var a=e+o;localStorage.setItem(a,n);var l=localStorage.getItem(a);return console.log("keyid from localstorage"+l),null!=l?!0:!0}function getHashCode(e){var t=0;if(0==e.length)return t;for(i=0;i<e.length;i++)char=e.charCodeAt(i),t=(t<<5)-t+char,t&=t;return t}function createHandle(e,t,o){var n=e+o,a=hashCode(n);console.log("callbackIdentyHashCode ::::::::::::: "+a);var l=e+t+o+a;return console.log("handle ::::::::::::: "+l),l}function addLocalSubscriptions(e,t){localStorage.setItem(e,t)}function checkLocalSubscriptions(e){var t=localStorage.getItem(e);return null!=t?!0:!1}function logResult(e){if(e instanceof Array){var t=JSON.parse(JSON.stringify(e)),o=JSON.parse(t[0]);console.log("GET Array Value: "+o)}console.log("Success Result:::"+e)}function logError(e){console.log("Error:::"+e)}function notifySystems(e){"span"==connectionType?(console.log("Connection Type is Span. Notify Span"),notifySpan(e)):(console.log("Connection Type is MB bridge. Notifying DEC Core about changes"),notifyDECCore(e))}function notifySpan(e){console.log("Notifying Span about change in property value");var t=getProperties();console.log("Host received to open the socket is "+t.host),console.log("Port received to open the socket is "+t.port);var o="ws://"+t.host+":"+t.port+"/",n=new WebSocket(o),a=createDataHandle(e.component,e.namespace);console.log("datahandle "+a),n.onopen=function(){console.log("inside wsopen");var t={component:e.component,nameSpace:e.namespace,handle:a,method:e.method,value:e.value,options:e.options},o=JSON.stringify(t);encodedData=encodeURI(o);var l=getApplicationId(e.component),r={"dec.SetRequest":{sender:{sender:l,receivers:["DECCore"],data:encodedData}}};console.log(JSON.stringify(r)),console.log("Sending msg is ::: "+JSON.stringify(r)),n.send(JSON.stringify(r)),n.close()},n.onclose=function(){console.log("Connection is closed...")}}function getApplicationId(e){try{if(null!=drive[e])return drive[e].getAppId()}catch(t){}return"DECJSSDK"}function createSubscriptionHandle(e){var t=getHashCode(e)+e;return t}function createDataHandle(e,t){var o=e+"."+t;return getHashCode(o)}function initializeComponents(e,t){console.log("Initializing the Components");for(var o in t){e[o]=new DecCommon;var n=e.getNodeLevel();e[o].setNodeLevel(""+n+"."+o);var a=e[o].getNodeLevel();console.log("Component "+a),"java.util.Map"===t[o].type?(e[o].isMap=!0,console.log("Setting isMap to true")):"java.util.List"===t[o].type&&(e[o].isArray=!0,console.log("Setting isArray to true")),null!=t[o].properties?(e[o].setLeafStatus(!1),initializeComponents(e[o],t[o].properties)):e[o].setLeafStatus(!0)}}function notifyDECCore(e){console.log("Notifying DEC Core::::"+e);var t=getApplicationId(e.component),o=["DECCore"],n=createDataHandle(e.component,e.namespace);console.log("datahandle "+n);var a={component:e.component,nameSpace:e.namespace,handle:n,method:e.method,value:e.value,options:e.options},l=JSON.stringify(a);encodedData=encodeURI(l),console.log("encodedData::::"+encodedData),sendMessage(t,o,encodedData)}function showLocalStorageForData(){var e="",t="<H3>Data Stored in local Storage for components</H3>\n<table><tr><th>Name</th><td><td><td><td></td></td></td></td><th>Value</th></tr>",o=0;for(console.log("Local Storage length is"+localStorage.length),o=0;o<=localStorage.length-1;o++){e=localStorage.key(o);var n=/\d/g;n.test(e)||(t+="<tr><td>"+e+"</td><td><td><td><td></td></td></td></td><td>"+localStorage.getItem(e)+"</td></tr>")}t+="</table>",document.write(t)}function showLocalStorageForSubscriptions(){var e="",t="<H3>Subscription Details Stored in local Storage for components</H3>\n<table><tr><th>Name</th><td><td><td><td></td></td></td></td><th>Value</th></tr>",o=0;for(console.log("Local Storage length is"+localStorage.length),o=0;o<=localStorage.length-1;o++){e=localStorage.key(o);var n=/\d/g;n.test(e)&&(t+="<tr><td>"+e+"</td><td><td><td><td></td></td></td></td><td>"+localStorage.getItem(e)+"</td></tr>")}t+="</table>",document.write(t)}function setItemsOfMapType(e,t){var o=JSON.parse(t),n=new Array,a=new Array,l=0;for(attrKey in o)n[l]=attrKey,a[l]=o[attrKey],l++;for(var r=localStorage.getItem(this.nodeLevel),s=JSON.parse(r),i=0;i<n.length;i++){var c=n[i],g=a[i];s[c]=g}return localStorage.setItem(this.nodeLevel,JSON.stringify(s)),s}function setItemsOfArrayType(e,t,o){console.log("Entering method setItemsOfArrayType");var n=!1,a=!1,l=JSON.stringify(t),r=JSON.parse(l);console.log("json parse"+r);var s=localStorage.getItem(e),i=JSON.parse(s);if(null===i||0===i.length){if(console.log("Items Array is empty. Initialising and setting the values"),i=[],t instanceof Array)for(var c=i.length,g=0;g<t.length;g++){var d=t[g];i[c]=d,c++}else i[0]=t;i=uniqBy(i,JSON.stringify),localStorage.setItem(e,JSON.stringify(i)),a=!0,console.log("Array length "+i.length)}else if(null===o){if(console.log("No Filter options. Adding the item to array"),t instanceof Array)for(var c=i.length,g=0;g<t.length;g++){var d=t[g];i[c]=d,c++}else i[i.length]=t;i=uniqBy(i,JSON.stringify),localStorage.setItem(e,JSON.stringify(i)),a=!0,console.log("Array length "+i.length)}else{console.log("Filter options present. Updating the Array");var p=JSON.stringify(o),u=JSON.parse(p),f=new Array,v=new Array,h=0;for(filterKey in u)f[h]=filterKey,v[h]=u[filterKey],h++;for(var y=f[0],S=v[0],m=0;m<i.length;m++){var d=i[m];if(d[y]===S)for(attrKey in r){var b=attrKey,N=r[attrKey];d[b]=N,i[m]=d,n=!0}}n&&(i=uniqBy(i,JSON.stringify),localStorage.setItem(e,JSON.stringify(i)),a=!0)}return i}function uniqBy(e,t){var o={};return e.filter(function(e){var n=t(e);return o.hasOwnProperty(n)?!1:o[n]=!0})}function setItemsOfLeafOrNonLeafType(e,t,o){console.log("Entering method setItemsOfLeafOrNonLeafType");var n=!1;if(e[t].isLeaf())localStorage.setItem(e.getNodeLevel()+"."+t,o),n=!0;else for(key in o){newKey=key,newVal=o[key],console.log("ATTRIBUTE KEY::  "+newKey),console.log("ATTRIBUTE VALUE::  "+newVal);var a=e[t];n=setItemsOfLeafOrNonLeafType(a,newKey,newVal)}return n}function getValueForHandle(e,t){if(e)attrVal=localStorage.getItem(t);else{{var o=Object.keys(localStorage);new Array}attrVal="{";for(var n=0,a=0;a<o.length;a++)isNaN(parseInt(o[a]))&&-1!=o[a].indexOf(t)&&(0!==n&&(attrVal+=","),attrVal+=o[a]+":'"+localStorage.getItem(o[a])+"'",n++);attrVal+="}"}return attrVal}function getComponent(e){return-1!=e.indexOf(".")?e.substring(0,e.indexOf(".")):e}function getNameSpace(e){return-1!=e.indexOf(".")?e.substring(e.indexOf(".")+1):""}function executeSubscriptionCallbackAfterSet(handle,value){var subscriptionHandle=createSubscriptionHandle(handle),isAlreadySubscribed=checkLocalSubscriptions(subscriptionHandle);if(isAlreadySubscribed){var fn=eval("("+localStorage.getItem(subscriptionHandle)+")");fn.call(null,value)}else console.log("Component is not subscribed yet.So not sending subscription callback")}var Availability={available:0,readonly:1,not_supported:2,not_supported_yet:3,not_supported_security:4,not_supported_policy:5,not_supported_other:6},DecErrorCodes={invalid_parameter:{errorcode:"invalid_parameter",errormessage:"Invalid parameter"},not_authenticated:{errorcode:"not_authenticated",errormessage:"Not authenticated"},not_authorized:{errorcode:"not_authorized",errormessage:"Not authorized"},connection_timeout:{errorcode:"connection_timeout",errormessage:"Communication error"},not_subscribed:{errorcode:"not_subscribed",errormessage:"Not subscribed"},not_supported:{errorcode:"not_supported",errormessage:"Not Supported"}},DecCommon=function(){this.callback=null,this.isMap=!1,this.appId="DECJSSDK";var nodeLevel="",leaf=!1,availableStatus=Availability.available,isArray=!1;this.setAppId=function(e){this.appId=e},this.getAppId=function(){return this.appId},this.setNodeLevel=function(e){this.nodeLevel=e},this.getNodeLevel=function(){return this.nodeLevel},this.setLeafStatus=function(e){this.leaf=e},this.isLeaf=function(){return this.leaf},this.setAvailableStatus=function(e){this.availableStatus=e},this.getAvailableStatus=function(){return this.availableStatus},this.subscribe=function(subscriptionCallBack,options){console.log("Processing subscribe functionality"),this.availableStatus=Availability.available;var operation="READ",handle=this.nodeLevel;console.log("HANDLE is :::"+handle);var subscriptionHandle=createSubscriptionHandle(handle);console.log("SUBSCRIPTION HANDLE "+subscriptionHandle);var isAlreadySubscribed=checkLocalSubscriptions(subscriptionHandle);if(console.log("Is Already Subscribed "+isAlreadySubscribed),isAlreadySubscribed){var fn=eval("("+localStorage.getItem(subscriptionHandle)+")");if(null!=fn){var value=getValueForHandle(this.isLeaf(),handle);console.log("Value for the handle "+handle+" : "+value),console.log("calling subscription callback function"),fn.call(null,value)}else console.log("Error in getting the subscription callback from local storage")}else{addLocalSubscriptions(subscriptionHandle,subscriptionCallBack),console.log("Subscription is done");var data={component:getComponent(handle),namespace:getNameSpace(handle),method:"subscribe",value:{}};console.log("Notifying Systems"),notifySystems(data)}return subscriptionHandle},this.unsubscribe=function(e){localStorage.removeItem(e),console.log("Unsubscribed..."),this.availableStatus=Availability.not_supported},this.get=function(e){if(this.availableStatus===Availability.not_supported)return console.log("Not Supported!"),new Promise(function(e,t){var o=JSON.stringify(DecErrorCodes.not_supported);t(Error(o))});var t=e||null,o="";if(console.log("Get Called for NodeLevel = "+this.nodeLevel+", leaf = "+this.isLeaf()),t){if(!this.isLeaf()){var n=Object.keys(localStorage),a=(new Array,localStorage.getItem(this.nodeLevel)),l=JSON.parse(a);if(this.isArray){console.log("JSON: "+e);var r=JSON.stringify(e),s=JSON.parse(r);console.log("json parse"+s);var i=new Array,c=new Array,g=0;for(attrKey in s)i[g]=attrKey,c[g]=s[attrKey],g++;for(var d=new Array,p=0,u=0;u<l.length;u++){for(var f=!0,v=0;g>v;v++){var h=i[v],y=c[v],S=l[u];if(S[h]!==y){f=!1;break}}f&&(d[p]=JSON.stringify(l[u]),p++)}return console.log("GET Array Result: "+d),new Promise(function(e){e(d)})}if(this.isMap){for(var s=JSON.parse(e),m=new Object,v=0;v<s.length;v++){var y=s[v];null!==l[y]&&(m[y]=l[y])}o=JSON.stringify(m)}else{if(o="{",t instanceof Array)for(var b=0,N=0;N<t.length;N++)0!==b&&(o+=","),o+="'"+this.nodeLevel+"."+t[N]+"':'"+localStorage.getItem(this.nodeLevel+"."+t[N])+"'",b++;else for(var b=0,O=0;O<n.length;O++)isNaN(parseInt(n[O]))&&-1!=n[O].indexOf(this.nodeLevel)&&(0!==b&&(o+=","),o+=n[O]+":'"+localStorage.getItem(n[O])+"'",b++);o+="}"}return console.log("GET Result: "+o),console.log("GET Result: "+o.length),new Promise(function(e){e(o)})}o=localStorage.getItem(this.nodeLevel)}else if(this.isLeaf())o=localStorage.getItem(this.nodeLevel);else{{var n=Object.keys(localStorage);new Array}o="{";for(var b=0,O=0;O<n.length;O++)isNaN(parseInt(n[O]))&&-1!=n[O].indexOf(this.nodeLevel)&&(0!==b&&(o+=","),o+=n[O]+":'"+localStorage.getItem(n[O])+"'",b++);o+="}"}return console.log("Retreived JSON: "+o),new Promise(function(e){e(o)})},this.set=function(e,t){var o=t||null,n=e||null;if(null===n)return console.log("Set called without options!"),new Promise(function(e,t){var o=JSON.stringify(DecErrorCodes.invalid_parameter);t(Error(o))});try{if(console.log("JSON: "+e),console.log("NodeLevel: "+this.nodeLevel),!this.isLeaf()||this.isArray||this.isMap)if(this.isArray){console.log("Set called for array types"),setItemsOfArrayType(this.nodeLevel,e,o);var a=null;if(e instanceof Array)a=e;else if(null==o){var l=[];l[0]=e,a=l}var r={component:getComponent(this.nodeLevel),namespace:getNameSpace(this.nodeLevel),method:"set",value:a,options:o};console.log("Executing Subscription callback method"),executeSubscriptionCallbackAfterSet(this.nodeLevel,e),console.log("Notifying Systems"),notifySystems(r)}else if(this.isMap){console.log("Set called at parent level for map type"),setItemsOfMapType(this.nodelLevel,e,o);var r={component:getComponent(this.nodeLevel),namespace:getNameSpace(this.nodeLevel),method:"set",value:e,options:o};console.log("Executing Subscription callback method"),executeSubscriptionCallbackAfterSet(this.nodeLevel,e),console.log("Notifying Systems"),notifySystems(r)}else{console.log("Set called at parent level for non-array types");var s=!1,i=JSON.stringify(e),c=JSON.parse(i);console.log("json parse"+c);for(p in c)if(p=p,attrVal=c[p],console.log("ATTRIBUTE KEY::  "+p),console.log("ATTRIBUTE VALUE::  "+attrVal),this[p].isArray){var g=this.nodeLevel+"."+p,l=setItemsOfArrayType(g,attrVal,o);null!=l&&(s=!0)}else s=setItemsOfLeafOrNonLeafType(this,p,attrVal);if(s){var d=this.nodeLevel;-1==d.indexOf(".")&&(d+=".");var r={component:getComponent(d),namespace:getNameSpace(d),method:"set",value:e,options:o};console.log("Executing Subscription callback method"),executeSubscriptionCallbackAfterSet(this.nodeLevel,e),console.log("Notifying Systems"),notifySystems(r)}}else{console.log("Set called at leaf level"),localStorage.setItem(this.nodeLevel,e);var d=this.nodeLevel,p=d.substring(d.lastIndexOf(".")+1),a={};a[p]=e;var r={component:getComponent(d),namespace:d.substring(d.indexOf(".")+1,d.lastIndexOf(".")),method:"set",value:a,options:o};console.log("Executing Subscription callback method"),executeSubscriptionCallbackAfterSet(this.nodeLevel,e),console.log("Notifying Systems"),notifySystems(r)}}catch(u){return console.log("Exception: "+u.message),new Promise(function(e,t){t(Error("Error: "+u.message))})}return new Promise(function(e){e("success")})},this.delete=function(e){var t=e||null;console.log("Delete Called for NodeLevel = "+this.nodeLevel+", leaf = "+this.isLeaf()),t?handleDeleteWithOptions(this.nodeLevel,e,this.isLeaf(),this.isArray,this.isMap):handleDeleteWithNoOptions(this.nodeLevel,this.isLeaf());var o={component:getComponent(this.nodeLevel),namespace:getNameSpace(this.nodeLevel),method:"clear",options:t};return console.log("Notifying Systems"),notifySystems(o),new Promise(function(e){e("Successfully removed")})}},Drive=function(){this.policy=null},drive=new Drive;init=function(callback1,components,applicationId){console.log("Connection Type is :::"+connectionType),drive.callback=callback1;for(var index=0;index<components.length;index++){var component=components[index];console.log("Initializing "+component),drive[component]=new DecCommon,drive[component].setLeafStatus(!1),drive[component].setNodeLevel(components[index]),drive[component].setAvailableStatus(Availability.available),null!=applicationId&&drive[component].setAppId(applicationId);var jsonComp=eval("("+component+")");initializeComponents(drive[component],jsonComp)}"span"==connectionType?(console.log("Connection Type is Span. Initializing Web Socket"),RunSpanMessageBroker()):console.log("Connection Type is MB bridge")};var Operation={READ:"read",WRITE:"write",PRIVATE:"private",POLICY:"policy"},EventType={ALL:"all",CREATE:"create",UPDATE:"update",DELETE:"delete"};
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
'use strict';

var asap = require('asap')

module.exports = Promise
function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
  if (typeof fn !== 'function') throw new TypeError('not a function')
  var state = null
  var value = null
  var deferreds = []
  var self = this

  this.then = function(onFulfilled, onRejected) {
    return new Promise(function(resolve, reject) {
      handle(new Handler(onFulfilled, onRejected, resolve, reject))
    })
  }

  function handle(deferred) {
    if (state === null) {
      deferreds.push(deferred)
      return
    }
    asap(function() {
      var cb = state ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        (state ? deferred.resolve : deferred.reject)(value)
        return
      }
      var ret
      try {
        ret = cb(value)
      }
      catch (e) {
        deferred.reject(e)
        return
      }
      deferred.resolve(ret)
    })
  }

  function resolve(newValue) {
    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
          doResolve(then.bind(newValue), resolve, reject)
          return
        }
      }
      state = true
      value = newValue
      finale()
    } catch (e) { reject(e) }
  }

  function reject(newValue) {
    state = false
    value = newValue
    finale()
  }

  function finale() {
    for (var i = 0, len = deferreds.length; i < len; i++)
      handle(deferreds[i])
    deferreds = null
  }

  doResolve(fn, resolve, reject)
}


function Handler(onFulfilled, onRejected, resolve, reject){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}

},{"asap":4}],3:[function(require,module,exports){
'use strict';

//This file contains then/promise specific extensions to the core promise API

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise

/* Static Functions */

function ValuePromise(value) {
  this.then = function (onFulfilled) {
    if (typeof onFulfilled !== 'function') return this
    return new Promise(function (resolve, reject) {
      asap(function () {
        try {
          resolve(onFulfilled(value))
        } catch (ex) {
          reject(ex);
        }
      })
    })
  }
}
ValuePromise.prototype = Object.create(Promise.prototype)

var TRUE = new ValuePromise(true)
var FALSE = new ValuePromise(false)
var NULL = new ValuePromise(null)
var UNDEFINED = new ValuePromise(undefined)
var ZERO = new ValuePromise(0)
var EMPTYSTRING = new ValuePromise('')

Promise.from = Promise.cast = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return NULL
  if (value === undefined) return UNDEFINED
  if (value === true) return TRUE
  if (value === false) return FALSE
  if (value === 0) return ZERO
  if (value === '') return EMPTYSTRING

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex)
      })
    }
  }

  return new ValuePromise(value)
}
Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop()
      }
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      fn.apply(self, args)
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    try {
      return fn.apply(this, arguments).nodeify(callback)
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        asap(function () {
          callback(ex)
        })
      }
    }
  }
}

Promise.all = function () {
  var args = Array.prototype.slice.call(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { res(i, val) }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

/* Prototype Methods */

Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    asap(function () {
      throw err
    })
  })
}

Promise.prototype.nodeify = function (callback) {
  if (callback === null || typeof callback == 'undefined') return this

  this.then(function (value) {
    asap(function () {
      callback(null, value)
    })
  }, function (err) {
    asap(function () {
      callback(err)
    })
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}


Promise.resolve = function (value) {
  return new Promise(function (resolve) { 
    resolve(value);
  });
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { 
    reject(value);
  });
}

Promise.race = function (values) {
  return new Promise(function (resolve, reject) { 
    values.map(function(value){
      Promise.cast(value).then(resolve, reject);
    })
  });
}

},{"./core.js":2,"asap":4}],4:[function(require,module,exports){
(function (process){

// Use the fastest possible means to execute a task in a future turn
// of the event loop.

// linked list of tasks (single, with head node)
var head = {task: void 0, next: null};
var tail = head;
var flushing = false;
var requestFlush = void 0;
var isNodeJS = false;

function flush() {
    /* jshint loopfunc: true */

    while (head.next) {
        head = head.next;
        var task = head.task;
        head.task = void 0;
        var domain = head.domain;

        if (domain) {
            head.domain = void 0;
            domain.enter();
        }

        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function() {
                   throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    flushing = false;
}

if (typeof process !== "undefined" && process.nextTick) {
    // Node.js before 0.9. Note that some fake-Node environments, like the
    // Mocha test runner, introduce a `process` global without a `nextTick`.
    isNodeJS = true;

    requestFlush = function () {
        process.nextTick(flush);
    };

} else if (typeof setImmediate === "function") {
    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
    if (typeof window !== "undefined") {
        requestFlush = setImmediate.bind(window, flush);
    } else {
        requestFlush = function () {
            setImmediate(flush);
        };
    }

} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    requestFlush = function () {
        channel.port2.postMessage(0);
    };

} else {
    // old browsers
    requestFlush = function () {
        setTimeout(flush, 0);
    };
}

function asap(task) {
    tail = tail.next = {
        task: task,
        domain: isNodeJS && process.domain,
        next: null
    };

    if (!flushing) {
        flushing = true;
        requestFlush();
    }
};

module.exports = asap;


}).call(this,require("/Users/forbeslindesay/GitHub/promisejs.org/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/forbeslindesay/GitHub/promisejs.org/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":1}],5:[function(require,module,exports){
if (!Promise.prototype.done) {
  Promise.prototype.done = function (cb, eb) {
    this.then(cb, eb).then(null, function (err) {
      setTimeout(function () {
        throw err;
      }, 0);
    });
  };
}
},{}],6:[function(require,module,exports){
if (typeof Promise === 'undefined') {
  Promise = require('promise');
} else {
  require('./polyfill-done.js');
}
},{"./polyfill-done.js":5,"promise":3}]},{},[6])

var host = "127.0.0.1";
var port = "4402";

/**
 * Get the properties to open the web socket 
 * @returns {Map}
 */
function getProperties() {
	console.log("Adding Properties for Websocket");
	var properties = {
		'host' : host,
		'port' : port
	};
	console.log("Properties are set:" + "Host is: " + host + " and Port is: "
			+ port);
	return properties;
}

function RunSpanMessageBroker(){if("WebSocket"in window){console.log("WebSocket is supported by your Browser!");var uri="ws://"+properties.host+":"+properties.port+"/",ws=new WebSocket(uri);ws.onopen=function(){console.log("Web Scoket is connected now")},ws.onmessage=function(evt){console.log("Received request from Span Server in onmessage method()");var received_msg=evt.data;if(console.log("Received msg from span is ::: "+received_msg),console.log("index of letrequest is::"+received_msg.indexOf("dec.LetRequest")),-1!=received_msg.indexOf("dec.LetRequest")){var json=JSON.parse(received_msg),req=json["dec.LetRequest"];decodedData=decodeURIComponent(req.request.data),console.log("DecodedData::::"+decodedData);var jsonData=JSON.parse(decodedData),component=jsonData.component,namespace=jsonData.nameSpace,value=jsonData.value,options=jsonData.options,method=jsonData.method;console.log("component is:::: "+component),console.log("namespace is:::: "+namespace),console.log("value is:::: "+value),console.log("options is:::: "+options),console.log("method is:::: "+method);var nodeLevel="";nodeLevel=null==namespace||0==namespace.length?component:component+"."+namespace;var currentObject=getCurrentObject(component,namespace);if(null!=method&&"clear"===method){var filter=options||null;console.log("Received Delete method call for NodeLevel = "+nodeLevel+", leaf = "+currentObject.isLeaf()),filter?handleDeleteWithOptions(nodeLevel,options,currentObject.isLeaf(),currentObject.isArray,currentObject.isMap):handleDeleteWithNoOptions(nodeLevel,currentObject.isLeaf())}else if(currentObject.isArray&&null!=value)console.log("Received component is of Array Type"),setItemsOfArrayType(nodeLevel,value,options);else{console.log("Received component is of non Array Type");for(attrKey in value){attrVal=value[attrKey],console.log("ATTRIBUTE KEY::  "+attrKey),console.log("ATTRIBUTE VALUE::  "+attrVal);var newNameSpace="";newNameSpace=null==namespace||""==namespace?attrKey:namespace+"."+attrKey;var newCurrentObject=getCurrentObject(component,newNameSpace);if(null!=newCurrentObject)if(newCurrentObject.isArray){var thisNodeLevel=nodeLevel+"."+attrKey;setItemsOfArrayType(thisNodeLevel,attrVal,options)}else setItemsOfLeafOrNonLeafType(currentObject,attrKey,attrVal);else console.log("Unable to get the current object for "+component+"."+newNameSpace)}}var subscriptionHandle=createSubscriptionHandle(nodeLevel);console.log("subscriptionHandle from js "+subscriptionHandle);var fn=eval("("+localStorage.getItem(subscriptionHandle)+")");null!=fn?(console.log("calling callback function"),fn.call(null,value)):console.log(nodeLevel+" is not subscribed")}else console.log("Received Set dec request..ignoring...")},ws.onclose=function(){console.log("Connection is closed...")},ws.onerror=function(e){console.log("error is::"+e)}}else console.log("WebSocket NOT supported by your Browser!")}function getHashCode(e){var o=0;if(0==e.length)return o;for(i=0;i<e.length;i++)char=e.charCodeAt(i),o=(o<<5)-o+char,o&=o;return o}function createSubscriptionHandle(e){var o=getHashCode(e)+e;return o}function createDataHandle(e,o){var n=e+"."+o;return n}function getCurrentObject(e,o){var n=drive[e];if(null==o||0==o.length)return n;if(-1==o.indexOf("."))return n[o];for(var t=o.split("."),r=0;r<t.length;r++){var a=t[r];n=n[a]}return n}var connectionType="span",properties=getProperties();