'use strict';

angular.module('hackApp')
  
  .constant('showCountdownPage', false)

  //Assuming that the hackaton starts at 1/3/2015 8AM PST (UTC -8)
  .constant('developerPreview', {
    startDate: '3 Jan 2015 08:00:00 -0800',
    endDate: '6 Jan 2015 08:00:00 -0800'
  })

  .constant('apiKey', 'api-key-1234')
  .constant('emulatorDomain', 'http://car1.hack.att.io:3000')
  .constant('username', 'provider')
  .constant('password', '1234')
//.constant('emulatorDomain', 'http://mater.att.io:3000')
//.constant('emulatorDomain', 'http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com')

  .constant('specificationUrl', document.baseURI + '/dist/data/specifications.json')
  .constant('emptyImagePath', document.baseURI + '/dist/images/empty.gif')
  .constant('dataPath', document.baseURI + '/data')

  .constant('androidExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master')
  .constant('iosExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master')
  .constant('webExampleUrl', document.baseURI)

  .constant('luceneDefinitionUrl', 'http://lucene.apache.org/core/2_9_4/queryparsersyntax.html')

  .constant('dataLoadedEvent', 'dataLoadedEvent')
  .constant('sideMenuItemClickEvent', 'sideMenuItemClickEvent')

  // TODO: add support for the old JSON data format
  // TODO: change one of these API doc URLs
  .constant('dataCollections', [
    {
      id: 'vehicle-apps-api',
      label: 'Vehicle Apps API',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/VehicleAPI.md',
      type: 'markdown-api',
      sections: []
    },
    {
      id: 'vehicle-ui-api',
      label: 'Vehicle UI API',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/VehicleAPI.md',
      type: 'markdown-api',
      sections: []
    },
    {
      id: 'web-apps-api',
      label: 'Web Apps API',
      url: document.baseURI + '/dist/data/specifications.json',
      type: 'json-api',
      sections: []
    },
    {
      id: 'setup',
      label: 'Setup',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/Setup.md',
      type: 'markdown-setup',
      sections: []
    }
  ])

  .constant('sampleAppData', [
    {
      platform: 'android',
      humanReadablePlatform: 'Android',
      iconUrl: document.baseURI + '/dist/images/android-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-android',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master/README.md',
      readmeText: 'Loading README...'
    },
    {
      platform: 'ios',
      humanReadablePlatform: 'iOS',
      iconUrl: document.baseURI + '/dist/images/ios-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-ios',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master/README.md',
      readmeText: 'Loading README...'
    },
    {
      platform: 'web',
      humanReadablePlatform: 'Web App',
      iconUrl: document.baseURI + '/dist/images/web-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-javascript',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-javascript/master/README.md',
      readmeText: 'Loading README...'
    }
  ])

  .constant('topLevelRoutes', [
    {
      ref: 'two-videos',
      url: '/two-videos',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/two-videos/two-videos.html',
      controller: 'TwoVideosCtrl',
      defaultParams: {
      }
    },
    {
      ref: 'head-unit-apps',
      url: '/head-unit-apps',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/head-unit-apps/head-unit-apps.html',
      controller: 'HeadUnitAppsCtrl',
      defaultParams: {
      }
    },
    {
      ref: 'api-docs',
      url: '/api-docs',
      isAbstract: true,
      templateUrl: document.baseURI + '/dist/templates/routes/api-docs/api-docs.html',
      controller: 'ApiDocsCtrl',
      defaultParams: {
      }
    },
    {
      ref: 'countdown',
      url: '/countdown',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/countdown/countdown.html',
      controller: 'CountdownCtrl',
      defaultParams: {
      }
    }
  ])

  .constant('sideMenuGroups', {
    'vehicle-apps-api': {
      label: 'Vehicle Apps API',
      ref: 'api-docs.vehicle-apps-api',
      url: '/vehicle-apps-api',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/vehicle-apps-api/vehicle-apps-api.html',
      controller: 'VehicleAppsApiCtrl',
      sections: [
        // This is generated from Markdown data
      ],
      defaultParams: {
        sectionId: 'context-initialization'
      }
    },
    'vehicle-ui-api': {
      label: 'Vehicle UI API',
      ref: 'api-docs.vehicle-ui-api',
      url: '/vehicle-ui-api',
      isAbstract: true,
      sections: [
        {
          isStateRoute: false,
          ref: 'api-docs.vehicle-ui-api.car-app-framework',
          label: 'Car App Framework',
          url: 'http://attgarage.msg.betelab.ericy.com:443/ui-toolkit/',
          templateUrl: document.baseURI + '/dist/templates/routes/vehicle-ui-api/car-app-framework/car-app-framework.html',
          controller: 'CarAppFrameworkCtrl'
        },
        {
          isStateRoute: false,
          ref: 'api-docs.vehicle-ui-api.ui-components',
          label: 'UI Components',
          url: 'http://attgarage.msg.betelab.ericy.com:443/ui-toolkit/#/alert',
          templateUrl: document.baseURI + '/dist/templates/routes/vehicle-ui-api/ui-components/ui-components.html',
          controller: 'UiComponentsCtrl'
        }
      ],
      defaultParams: {
      }
    },
    'web-apps-api': {
      label: 'Web Apps API',
      ref: 'api-docs.web-apps-api',
      url: '/web-apps-api',
      isAbstract: true,
      sections: [
        {
          isStateRoute: true,
          ref: 'api-docs.web-apps-api.getting-started',
          label: 'Getting Started',
          url: '/getting-started',
          templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/getting-started/getting-started.html',
          controller: 'GettingStartedCtrl'
        },
        {
          isStateRoute: true,
          ref: 'api-docs.web-apps-api.sample-apps',
          label: 'Sample Apps',
          url: '/sample-apps',
          templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/sample-apps/sample-apps.html',
          controller: 'SampleAppsCtrl'
        }
      ],
      defaultParams: {
      }
    }
  })

  .constant('homeSectionsSideBarLinks', {
    'gettingStarted': [
      {
        isStateRoute: true,
        state: 'setup',
        url: 'https://github.com/ericsson-innovate',// TODO: set link to Setup.MD
        label: 'Developer Environment Setup Guide'
      },
      {
        isStateRoute: false,
        url: 'https://www.dropbox.com/sh/3vegatwa68pjlvw/AAAmJspnFaJfdBZ7ylQWdM0aa?dl=0',// TODO: set the actual link
        label: 'Download UI Design Assets'
      }
    ],
    'headUnitSimulator': [
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download Head Unit Simulator'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set link to Setup.MD
        label: 'Head Unit Simulator Settings'
      }
    ],
    'sampleApps': [
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate/sample-app',// TODO: set the actual link
        label: 'Download Sample Apps'
      },
      {
        isStateRoute: false,
        url: 'https://ericsson-innovate.github.io/sample-app1',// TODO: set the actual link
        label: 'Hello World App'
      },
      {
        isStateRoute: false,
        url: 'https://ericsson-innovate.github.io/sample-app2',// TODO: set the actual link
        label: 'Sample App'
      }
    ],
    'uiApi': [
      {
        isStateRoute: false,
        url: 'http://attgarage.msg.betelab.ericy.com:443/ui-toolkit/',
        label: 'Preview UI API'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate/ATT-Drive-UI-Framework',// TODO: set the actual link
        label: 'Download App Framework'
      },
      {
        isStateRoute: false,
        url: 'https://www.dropbox.com/sh/3vegatwa68pjlvw/AAAmJspnFaJfdBZ7ylQWdM0aa?dl=0',// TODO: set the actual link
        label: 'Download UI Design Assets'
      }
    ],
    'vehicleApi': [
      {
        isStateRoute: true,
        state: 'api-docs.vehicle-apps-api',
        label: 'Vehicle API'
      },
      {
        isStateRoute: false,
        url: document.baseURI + '/#/web-apps-api/getting-started',
        label: 'Web API'
      }
    ]
  })

  .constant('httpStatusCodes', {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    301: 'Moved permanently',
    302: 'Found',
    400: 'Bad request (invalid parameters)',
    401: 'Not authenticated',
    403: 'Not authorized to use the service',
    404: 'Resource not found',
    412: 'Resource already exists',
    500: 'Internal error',
    503: 'Service unavailable'
  })
  .constant('apiList', {
    '2.6-vehicle-remote-services': [
      '2.6.1-sign-up',
      '2.6.2-validate-otp',
      '2.6.3-set-pin',
      '2.6.4-login',
      '2.6.5-door-unlock',
      '2.6.6-door-lock',
      '2.6.7-engine-on',
      '2.6.8-engine-off',
      '2.6.9-honk-and-blink',
      '2.6.10-check-request-status',
      '2.6.11-view-diagnostic-data',
      '2.6.12-get-vehicle-status',
      '2.6.13-open-trunk',
      '2.6.14-honk',
      '2.6.15-blink',
      '2.6.16-car-alarm-on',
      '2.6.17-car-alarm-off'
    ],
    '2.7-vehicle-telematics': [
      '2.7.1-get-message',
      '2.7.2-send-message',
      '2.7.3-tcu-shoulder-tap',
      '2.7.4-ping-tcu',
      '2.7.5-tcu-notification-channel'
    ],
    // '2.12-commerce': [
    //   '2.12.1-consume',
    //   '2.12.9-get-products',
    //   '2.12.11-get-user-purchases',
    //   '2.12.15-purchase'
    // ],
    '2.13-subscriber-management': [
      '2.13.1-add-a-subscriber',
      '2.13.2-add-a-subscriber-and-vehicle',
      '2.13.3-update-a-subscriber',
      '2.13.4-delete-a-subscriber',
      '2.13.5-view-a-subscriber',
      '2.13.6-search-subscribers'
    ],
    '2.16-vehicle-management': [
      '2.16.1-add-a-vehicle',
      '2.16.2-update-a-vehicle',
      '2.16.3-delete-a-vehicle',
      '2.16.4-view-a-vehicle',
      '2.16.5-update-vehicle-users',
      '2.16.6-delete-vehicle-users',
      '2.16.7-search-vehicles'
    ]
  })
  .constant('webAppsApiCategories', [
    {
      id: 'know-driver',
      name: 'Know the Driver',
      specs: [
        '2.13.1-add-a-subscriber',
        '2.13.2-add-a-subscriber-and-vehicle',
        '2.13.3-update-a-subscriber',
        '2.13.4-delete-a-subscriber',
        '2.13.5-view-a-subscriber',
        '2.13.6-search-subscribers'
        // '2.12.1-consume',
        // '2.12.2-consume-by-ticket-id',
        // '2.12.3-check-valid-ticket',
        // '2.12.4-create-premium-offers',
        // '2.12.5-deactivate-one-time-purchase',
        // '2.12.6-deactivate-recurrent-purchase',
        // '2.12.7-full-purchase',
        // '2.12.8-get-prices',
        // '2.12.9-get-products',
        // '2.12.10-get-products-by-ids',
        // '2.12.11-get-user-purchases',
        // '2.12.12-get-user-tickets',
        // '2.12.13-get-tickets-by-purchase-id',
        // '2.12.14-get-tickets-by-ticket-id',
        // '2.12.15-purchase',
        // '2.12.16-purchase-by-premium-offer-id',
        // '2.12.17-purchase-by-product-id',
        // '2.12.18-refund',
        // '2.12.19-resume-recurrent-purchase',
        // '2.12.20-stop-purchase-renewal',
        // '2.12.21-extend-one-time-purchase',
        // '2.12.22-extend-recurrent-purchase',
        // '2.12.23-full-gift',
        // '2.12.24-gift',
        // '2.12.25-gift-by-product-id',
        // '2.12.26-gift-by-premium-offer-id',
        // '2.12.27-refill'
      ]
    },
    {
      id: 'know-car',
      name: 'Know the Car',
      specs: [
        '2.6.10-check-request-status',
        '2.6.11-view-diagnostic-data',
        '2.6.12-get-vehicle-status',
        '2.16.1-add-a-vehicle',
        '2.16.2-update-a-vehicle',
        '2.16.3-delete-a-vehicle',
        '2.16.4-view-a-vehicle',
        '2.16.5-update-vehicle-users',
        '2.16.6-delete-vehicle-users',
        '2.16.7-search-vehicles'
      ]
    },
    {
      id: 'control-car',
      name: 'Control the Car',
      specs: [
        '2.6.1-sign-up',
        '2.6.2-validate-otp',
        '2.6.3-set-pin',
        '2.6.4-login',
        '2.6.5-door-unlock',
        '2.6.6-door-lock',
        '2.6.7-engine-on',
        '2.6.8-engine-off',
        '2.6.9-honk-and-blink',
        '2.6.13-open-trunk',
        '2.6.14-honk',
        '2.6.15-blink',
        '2.6.16-car-alarm-on',
        '2.6.17-car-alarm-off',
        '2.6.10-check-request-status',
        '2.7.1-get-message',
        '2.7.2-send-message',
        '2.7.3-tcu-shoulder-tap',
        '2.7.4-ping-tcu',
        '2.7.5-tcu-notification-channel'
      ]
    }
  ])

  .constant('animations', [
    {
      id: 'animation-1',
      label: 'set-1',
      parameters: {}
    },
    {
      id: 'animation-2',
      label: 'set-2',
      parameters: {}
    },
    {
      id: 'animation-3',
      label: 'set-3',
      parameters: {}
    },
    {
      id: 'animation-4',
      label: 'set-4',
      parameters: {}
    }
  ]);
