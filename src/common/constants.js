'use strict';

angular.module('hackApp')

    .constant('apiKey', 'api-key-1234')
    .constant('emulatorDomain', 'http://car1.hack.att.io:3000')
    .constant('username', 'provider')
    .constant('password', '1234')
//.constant('emulatorDomain', 'http://mater.att.io:3000')
//.constant('emulatorDomain', 'http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com')

    .constant('specificationUrl', hack.rootPath + '/dist/data/specifications.json')
    .constant('emptyImagePath', hack.rootPath + '/dist/images/empty.gif')
    .constant('dataPath', hack.rootPath + '/data')

    .constant('androidExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master')
    .constant('iosExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master')
    .constant('webExampleUrl', hack.rootPath)

    .constant('luceneDefinitionUrl', 'http://lucene.apache.org/core/2_9_4/queryparsersyntax.html')

    .constant('uiKitDocUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/README.md')// TODO: update this

    .constant('sampleAppData', [
      {
        platform: 'android',
        humanReadablePlatform: 'Android',
        iconUrl: hack.rootPath + '/dist/images/android-icon.png',
        repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-android',
        readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master/README.md',
        readmeText: 'Loading README...'
      },
      {
        platform: 'ios',
        humanReadablePlatform: 'iOS',
        iconUrl: hack.rootPath + '/dist/images/ios-icon.png',
        repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-ios',
        readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master/README.md',
        readmeText: 'Loading README...'
      },
      {
        platform: 'web',
        humanReadablePlatform: 'Web',
        iconUrl: hack.rootPath + '/dist/images/web-icon.png',
        repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-javascript',
        readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-javascript/master/README.md',
        readmeText: 'Loading README...'
      },
      {
        platform: 'angularjs',
        humanReadablePlatform: 'AT&T Drive UI Kit',
        iconUrl: hack.rootPath + '/dist/images/angularjs-icon.png',
        repoUrl: 'https://github.com/ericsson-innovate/ATT-Drive-UI-Framework',
        readmeUrl: 'https://raw.githubusercontent.com/ericsson-innovate/ATT-Drive-UI-Framework/master/README.md',
        readmeText: 'Loading README...'
      }
    ])

    .constant('sideBarLinks', [
      {
        isStateRoute: true,
        ref: 'getting-started',
        label: 'Getting Started',
        url: '/getting-started',
        templateUrl: hack.rootPath + '/dist/templates/routes/getting-started/getting-started.html',
        controller: 'GettingStartedCtrl'
      },
      {
        isStateRoute: true,
        ref: 'api-documentation',
        label: 'API Documentation',
        url: '/api-documentation',
        templateUrl: hack.rootPath + '/dist/templates/routes/api-documentation/api-documentation.html',
        controller: 'ApiDocumentationCtrl'
      },
      {
        isStateRoute: true,
        ref: 'sample-apps',
        label: 'Sample Apps',
        url: '/sample-apps',
        templateUrl: hack.rootPath + '/dist/templates/routes/sample-apps/sample-apps.html',
        controller: 'SampleAppsCtrl'
      },
      {
        isStateRoute: true,
        ref: 'drive-api',
        label: 'Drive API',
        url: '/drive-api',
        templateUrl: hack.rootPath + '/dist/templates/routes/drive-api/drive-api.html',
        controller: 'DriveApiCtrl'
      }
    ])
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
        '2.6.12-get-vehicle-status'
      ],
      '2.7-vehicle-telematics': [
        '2.7.1-get-message',
        '2.7.2-send-message',
        '2.7.3-tcu-shoulder-tap',
        '2.7.4-ping-tcu',
        '2.7.5-tcu-notification-channel'
      ],
      '2.12-commerce': [
        '2.12.1-consume',
        '2.12.9-get-products',
        '2.12.11-get-user-purchases',
        '2.12.15-purchase'
      ],
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
    .constant('categories', [
      {
        id: 'know-driver',
        name: 'Know the Driver',
        ref: 'api-documentation.know-driver',
        specs: [
          '2.13.1-add-a-subscriber',
          '2.13.2-add-a-subscriber-and-vehicle',
          '2.13.3-update-a-subscriber',
          '2.13.4-delete-a-subscriber',
          '2.13.5-view-a-subscriber',
          '2.13.6-search-subscribers',
          '2.12.1-consume',
          '2.12.2-consume-by-ticket-id',
          '2.12.3-check-valid-ticket',
          '2.12.4-create-premium-offers',
          '2.12.5-deactivate-one-time-purchase',
          '2.12.6-deactivate-recurrent-purchase',
          '2.12.7-full-purchase',
          '2.12.8-get-prices',
          '2.12.9-get-products',
          '2.12.10-get-products-by-ids',
          '2.12.11-get-user-purchases',
          '2.12.12-get-user-tickets',
          '2.12.13-get-tickets-by-purchase-id',
          '2.12.14-get-tickets-by-ticket-id',
          '2.12.15-purchase',
          '2.12.16-purchase-by-premium-offer-id',
          '2.12.17-purchase-by-product-id',
          '2.12.18-refund',
          '2.12.19-resume-recurrent-purchase',
          '2.12.20-stop-purchase-renewal',
          '2.12.21-extend-one-time-purchase',
          '2.12.22-extend-recurrent-purchase',
          '2.12.23-full-gift',
          '2.12.24-gift',
          '2.12.25-gift-by-product-id',
          '2.12.26-gift-by-premium-offer-id',
          '2.12.27-refill'
        ]
      },
      {
        id: 'know-car',
        name: 'Know the Car',
        ref: 'api-documentation.know-car',
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
        ref: 'api-documentation.control-car',
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