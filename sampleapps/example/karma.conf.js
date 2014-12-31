// Karma configuration
// Generated on Thu Dec 04 2014 17:23:46 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      "test/dependencies/jquery.min.js",
      "test/dependencies/angular.js",
      "test/dependencies/angular-mocks.js",
      "test/dependencies/angular-resource.min.js",
      "test/dependencies/angular-route.min.js",
      "att-sdk/scripts/connectedCarSDK-tpls-0.0.4.js",
      "DecJSSDK/**/*.js",
      "scripts/*.js",
      "firstPage/controllers/FirstPageCtrl.js",
      "secondPage/controllers/SecondPageCtrl.js",
      "thirdPage/controllers/ThirdPageCtrl.js",
      "test/scripts/test-factories.js",
      "test/test-suite-basic.js"


    ],


    // list of files to exclude
    exclude: [
        "DecJSSDK/**/mbbridge.js"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
