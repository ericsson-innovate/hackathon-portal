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

// ## START 2.13.1-add-a-subscriber
AJAX({
  "type": "POST",
  "url": "/subscribers/v1/subscriber/add",
  "data": {
    "firstName": "~firstName~",
    "lastName": "~lastName~",
    "middleName": "~middleName~",
    "namePrefix": "~namePrefix~",
    "picture": "http://site.com/pictures/picture.jpg",
    "dob": "01/09/1973",
    "company": "Ericsson",
    "address": [
      {
        "addressIndex": 0,
        "addressType": "Work",
        "street": "6300 Legacy Dr.",
        "city": "Plano",
        "region": "Texas",
        "country": "USA",
        "postalCode": "75024",
        "meta": [
          {
            "lat": "33.075486"
          },
          {
            "long": "-96.832809"
          }
        ]
      }
    ],
    "defaultAddress": 0,
    "phone": [
      {
        "phoneIndex": 0,
        "phoneType": "Home",
        "phoneNumber": "19725830000",
        "deviceId": "SonyXperiaZ2",
        "meta": [
          {
            "SMS-Enabled": "Yes"
          }
        ]
      }
    ],
    "defaultPhone": 0,
    "email": [
      {
        "emailIndex": 0,
        "emailType": "Work",
        "emailAddress": "name@ericsson.com",
        "meta": [
          {
            "Display name": "My Work"
          }
        ]
      }
    ],
    "defaultEmail": 0,
    "vehicles": [
      "1TX123456789011223",
      "1TX123456789015555"
    ],
    "custom": [
      {
        "website": "http://site.com"
      },
      {
        "defaultRingtone": "/sdcard/media/ringtones/ring.mp3"
      }
    ],
    "metas": [
      {
        "links": [
          {
            "work": "http://ericsson.com"
          },
          {
            "facebook": "http://facebook.com/myPage"
          }
        ]
      },
      {
        "notes": [
          {
            "Note 1": "note"
          },
          {
            "Note 2": "note"
          }
        ]
      }
    ]
  }
});
// ## END 2.13.1-add-a-subscriber



// ## START 2.13.2-add-a-subscriber-and-vehicle
AJAX({
  "type": "POST",
  "url": "/subscribers/v1/subscriber-vehicle/add",
  "data": {
    "firstName": "~firstName~",
    "lastName": "~lastName~",
    "middleName": "~middleName~",
    "namePrefix": "~namePrefix~",
    "picture": "http://site.com/pictures/picture.jpg",
    "dob": "01/09/1973",
    "company": "Ericsson",
    "address": [
      {
        "addressIndex": 0,
        "addressType": "Work",
        "street": "6300 Legacy Dr.",
        "city": "Plano",
        "region": "Texas",
        "country": "USA",
        "postalCode": "75024",
        "meta": [
          {
            "lat": "33.075486"
          },
          {
            "long": "-96.832809"
          }
        ]
      }
    ],
    "defaultAddress": 0,
    "phone": [
      {
        "phoneIndex": 0,
        "phoneType": "Home",
        "phoneNumber": "19725830000",
        "deviceId": "SonyXperiaZ2",
        "meta": [
          {
            "SMS-Enabled": "Yes"
          }
        ]
      }
    ],
    "defaultPhone": 0,
    "email": [
      {
        "emailIndex": 0,
        "emailType": "Work",
        "emailAddress": "name@ericsson.com",
        "meta": [
          {
            "Display name": "My Work"
          }
        ]
      }
    ],
    "defaultEmail": 0,
    "vehicle": {
      "vin": "~vin~",
      "iccid": "~iccid~",
      "imsi": "~imsi~",
      "msisdn": "~msisdn~",
      "tcusn": "tcusn ",
      "make": "~make~"
    },
    "custom": [
      {
        "website": "http://site.com"
      },
      {
        "defaultRingtone": "/sdcard/media/ringtones/ring.mp3"
      }
    ],
    "metas": [
      {
        "links": [
          {
            "work": "http://ericsson.com"
          },
          {
            "facebook": "http://facebook.com/myPage"
          }
        ]
      },
      {
        "notes": [
          {
            "Note 1": "note"
          }
        ]
      }
    ]
  }
});
// ## END 2.13.2-add-a-subscriber-and-vehicle



// ## START 2.13.3-update-a-subscriber
AJAX({
  "type": "POST",
  "url": "/subscribers/v1/subscriber/update/12fd3e34fd3412",
  "data": {
    "phone": [
      {
        "phoneIndex": 0,
        "phoneType": "mobile",
        "phoneNumber": "15143457900"
      }
    ]
  }
});
// ## END 2.13.3-update-a-subscriber



// ## START 2.13.4-delete-a-subscriber
AJAX({
  "type": "POST",
  "url": "/subscribers/v1/subscriber/delete/12fd3e34fd3412"
});
// ## END 2.13.4-delete-a-subscriber



// ## START 2.13.5-view-a-subscriber
AJAX({
  "type": "GET",
  "url": "/subscribers/v1/subscriber/view/12fd3e34fd3412"
});
// ## END 2.13.5-view-a-subscriber



// ## START 2.13.6-search-subscribers
AJAX({
  "type": "POST",
  "url": "/subscribers/v1/subscriber/search",
  "data": {
    "query": "vehicles:1TX123456789011223 AND firstName:jo*"
  }
});
// ## END 2.13.6-search-subscribers



// ## START 2.12.1-consume
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/consume/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.1-consume



// ## START 2.12.10-get-products-by-ids
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getProductsByIds/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "productId": [
        "DriveSMS",
        "DriveWeather"
      ]
    }
  }
});
// ## END 2.12.10-get-products-by-ids



// ## START 2.12.11-get-user-purchases
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getUserPurchases/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "paginationRequest": {
        "fromItem": 0,
        "maxItems": 10
      }
    }
  }
});
// ## END 2.12.11-get-user-purchases



// ## START 2.12.12-get-user-tickets
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getProductsByIds/msisdn:5143457900",
  "data": {
    "appId": "appStore"
  }
});
// ## END 2.12.12-get-user-tickets



// ## START 2.12.13-get-tickets-by-purchase-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getTicketsByPurchaseId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "purchaseId": "~purchaseId~"
    }
  }
});
// ## END 2.12.13-get-tickets-by-purchase-id



// ## START 2.12.14-get-tickets-by-ticket-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getTicketUsagesByTicketId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "ticketId": "~ticketId~"
    }
  }
});
// ## END 2.12.14-get-tickets-by-ticket-id



// ## START 2.12.15-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/purchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.15-purchase



// ## START 2.12.16-purchase-by-premium-offer-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/purchaseByPremiumOfferId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "premiumOfferId": "~premiumOfferId~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.16-purchase-by-premium-offer-id



// ## START 2.12.17-purchase-by-product-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/purchaseByProductId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5",
      "productId": "DriveSMS"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.17-purchase-by-product-id



// ## START 2.12.18-refund
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/refund/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "purchaseId": "~purchaseId~"
    }
  }
});
// ## END 2.12.18-refund



// ## START 2.12.19-resume-recurrent-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/resumeRecurrentPurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recurrentPurchaseId": "S-123455"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.19-resume-recurrent-purchase



// ## START 2.12.2-consume-by-ticket-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/consumeByTicketId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "ticketId": "~ticketId~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.2-consume-by-ticket-id



// ## START 2.12.20-stop-purchase-renewal
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/stopPurchaseRenewal/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recurrentPurchaseId": "S-123455"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.20-stop-purchase-renewal



// ## START 2.12.21-extend-one-time-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/extendOneTimePurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "purchaseId": "S-123455",
      "extendTime": 3600
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.21-extend-one-time-purchase



// ## START 2.12.22-extend-recurrent-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/extendRecurrentPurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recurrentPurchaseId": "S-123455",
      "extendTime": 3600
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.22-extend-recurrent-purchase



// ## START 2.12.23-full-gift
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/fullGift/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recieverURI": "msisdn:972555444",
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5",
      "serviceURL": "~URL~",
      "product": {
        "description": "Drive Custom for $0!",
        "price": {
          "currencyCode": "$",
          "price": 0
        },
        "productId": "DriveCustom"
      }
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.23-full-gift



// ## START 2.12.24-gift
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/gift/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recieverURI": "msisdn:972555444",
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5",
      "serviceURL": "~URL~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.24-gift



// ## START 2.12.25-gift-by-product-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/giftByProductId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recieverURI": "msisdn:972555444",
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5",
      "productId": "~productId~",
      "serviceURL": "~URL~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.25-gift-by-product-id



// ## START 2.12.26-gift-by-premium-offer-id
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/giftByPremiumOfferId/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recieverURI": "msisdn:972555444",
      "PremiumOfferId": "S-123455",
      "serviceURL": "~URL~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.26-gift-by-premium-offer-id



// ## START 2.12.27-refill
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/refill/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "ticketId": "~ticketId~",
      "numberOfUsages": 1
    }
  }
});
// ## END 2.12.27-refill



// ## START 2.12.3-check-valid-ticket
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/checkValidTicket/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "premiumResourceType": "HTML5",
      "validSeconds": 3600
    }
  }
});
// ## END 2.12.3-check-valid-ticket



// ## START 2.12.4-create-premium-offers
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/createPremiumOffers/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.4-create-premium-offers



// ## START 2.12.5-deactivate-one-time-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/deactivateOneTimePurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "purchaseId": "~purchaseId"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.5-deactivate-one-time-purchase



// ## START 2.12.6-deactivate-recurrent-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/deactivateRecurrentPurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "recurrentPurchaseId": "~recurrentPurchaseId~"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.6-deactivate-recurrent-purchase



// ## START 2.12.7-full-purchase
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/fullPurchase/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "serviceId": "S-123455",
      "premiumResourceType": "HTML5",
      "product": {
        "description": "Drive Custom for $0!",
        "price": {
          "currencyCode": "$",
          "price": 0
        },
        "productId": "DriveCustom"
      }
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.7-full-purchase



// ## START 2.12.8-get-prices
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getPrices/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "premiumResourceType": "HTML5"
    },
    "Client": {
      "deviceId": "IMX"
    }
  }
});
// ## END 2.12.8-get-prices



// ## START 2.12.9-get-products
AJAX({
  "type": "POST",
  "url": "/content/v1/commerce/getProducts/msisdn:5143457900",
  "data": {
    "appId": "appStore",
    "parameters": {
      "premiumResourceType": "HTML5"
    }
  }
});
// ## END 2.12.9-get-products



// ## START 2.16.1-add-a-vehicle
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/vehicle/add",
  "data": {
    "vin": "~vin~",
    "iccid": "~iccid~",
    "imsi": "~imsi~",
    "msisdn": "~msisdn~",
    "tcusn": "tcusn ",
    "make": "~make~",
    "model": "~model~",
    "year": 2014,
    "description": "~description~",
    "condition": "Excellent",
    "deliveryMileage": "80000 Mile",
    "deliveryDate": "2013-07-04",
    "licenseNumber": "~licenseNumber~",
    "engineNumber": "~engineNumber~",
    "ignitionKeyNumber": "~ignitionKeyNumber~",
    "transmissionNumber": "~transmissionNumber~",
    "doorKeyNumber": "~doorKeyNumber~",
    "status": "demo",
    "doors": 4,
    "interiorColor": [
      {
        "colorCode": "~code~",
        "colorName": "Gray"
      }
    ],
    "exteriorColor": [
      {
        "colorCode": "~code~",
        "colorName": "White"
      }
    ],
    "transmissionType": "automatic",
    "weight": "3199 lbs",
    "options": [
      {
        "Air Conditioning": "Includes climate control assembly"
      },
      {
        "Cargo Tray": "custom-fit cargo tray"
      }
    ],
    "owner": "12dde34e222a2f",
    "ownerType": "Subscriber",
    "users": [
      {
        "userId": "12dde34e222a2d",
        "userType": "Subscriber"
      }
    ],
    "custom": [
      {
        "City (MT)": " 7.5L/100km"
      },
      {
        "Highway (MT)": " 5.3L/100km"
      }
    ],
    "metas": [
      {
        "accessories": [
          {
            "Rubber Floor Mats - Front": "Protect the interior of your vehicle from everyday dirt and debris with custom-made floor mats"
          },
          {
            "Rubber Floor Mats - Rear": "Protect the interior of your vehicle from everyday dirt and debris with custom-made floor mats"
          }
        ]
      },
      {
        "notes": [
          {
            "Note 1": "note"
          },
          {
            "Note 2": "note"
          }
        ]
      }
    ]
  }
});
// ## END 2.16.1-add-a-vehicle



// ## START 2.16.2-update-a-vehicle
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/vehicle/update/12fd3e34fd3412",
  "data": {
    "owner": "12dde34e222a2f"
  }
});
// ## END 2.16.2-update-a-vehicle



// ## START 2.16.3-delete-a-vehicle
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/vehicle/delete/1TX123456789011223"
});
// ## END 2.16.3-delete-a-vehicle



// ## START 2.16.4-view-a-vehicle
AJAX({
  "type": "GET",
  "url": "/subscribers/v1/subscriber/view/1TX123456789011223"
});
// ## END 2.16.4-view-a-vehicle



// ## START 2.16.5-update-vehicle-users
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/users/update",
  "data": {
    "vin": "~vin~",
    "users": [
      "12dde34e222a2d",
      "12dde34e222a2e"
    ]
  }
});
// ## END 2.16.5-update-vehicle-users



// ## START 2.16.6-delete-vehicle-users
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/users/delete",
  "data": {
    "vin": "~vin~",
    "users": [
      "12dde34e222a2e"
    ]
  }
});
// ## END 2.16.6-delete-vehicle-users



// ## START 2.16.7-search-vehicles
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/vehicle/search",
  "data": {
    "query": "year:2014 AND status:demo"
  }
});
// ## END 2.16.7-search-vehicles



// ## START 2.6.1-sign-up
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/signup/1TX123456789011223"
});
// ## END 2.6.1-sign-up



// ## START 2.6.10-check-request-status
AJAX({
  "type": "GET",
  "url": "/remoteservices/v1/vehicle/status/1TX123456789011223/25"
});
// ## END 2.6.10-check-request-status



// ## START 2.6.11-view-diagnostic-data
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/diagnostics/view/1TX123456789011223",
  "data": {
    "longitude": 55.578545,
    "latitude": 14.254875,
    "accuracy": 6
  }
});
// ## END 2.6.11-view-diagnostic-data



// ## START 2.6.12-get-vehicle-status
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/status/view/1TX123456789011223",
  "data": {
    "longitude": 55.578545,
    "latitude": 14.254875,
    "accuracy": 6
  }
});
// ## END 2.6.12-get-vehicle-status



// ## START 2.6.2-validate-otp
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/validateotp/1TX123456789011223",
  "data": {
    "otp": "a23e5f54"
  }
});
// ## END 2.6.2-validate-otp



// ## START 2.6.3-set-pin
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/setpin/1TX123456789011223",
  "data": {
    "otp": "a23e5f54",
    "pin": 1234
  }
});
// ## END 2.6.3-set-pin



// ## START 2.6.4-login
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/login/1TX123456789011223"
});
// ## END 2.6.4-login



// ## START 2.6.5-door-unlock
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/unlock/1TX123456789011223"
});
// ## END 2.6.5-door-unlock



// ## START 2.6.6-door-lock
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/lock/1TX123456789011223"
});
// ## END 2.6.6-door-lock



// ## START 2.6.7-engine-on
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/engineOn/1TX123456789011223"
});
// ## END 2.6.7-engine-on



// ## START 2.6.8-engine-off
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/engineOff/1TX123456789011223"
});
// ## END 2.6.8-engine-off



// ## START 2.6.9-honk-and-blink
AJAX({
  "type": "POST",
  "url": "/remoteservices/v1/vehicle/honkBlink/1TX123456789011223",
  "data": {
    "longitude": 55.578545,
    "latitude": 14.254875,
    "accuracy": 6
  }
});
// ## END 2.6.9-honk-and-blink



// ## START 2.7.1-get-message
AJAX({
  "type": "GET",
  "url": "/vehicles/v1/1TX123456789011223/messages/123456"
});
// ## END 2.7.1-get-message



// ## START 2.7.2-send-message
AJAX({
  "type": "POST",
  "url": "/vehicles/v1/1TX123456789011223/messages/123456",
  "data": {
    "requestId": 123456,
    "serviceId": 1,
    "status": 0
  }
});
// ## END 2.7.2-send-message



// ## START 2.7.3-tcu-shoulder-tap
AJAX({
  "type": "POST",
  "url": "/tcu/v1/notifications",
  "data": {
    "messageId": 123456,
    "vin": "1TX123456789011223",
    "baseURL": "http://asdp.att.com/vehicles/v1"
  }
});
// ## END 2.7.3-tcu-shoulder-tap



// ## START 2.7.4-ping-tcu
AJAX({
  "type": "GET",
  "url": "/tcu/v1/notifications"
});
// ## END 2.7.4-ping-tcu



// ## START 2.7.5-tcu-notification-channel
AJAX({
  "type": "GET",
  "url": "/vehicles/v1/1TX123456789011223/notifications"
});
// ## END 2.7.5-tcu-notification-channel
