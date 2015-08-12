var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    chrome = require('selenium-webdriver/chrome');
 

module.exports = function(config){
  config.set({
    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],

    frameworks: ['jasmine'],

    browsers : ['swd_chrome'],

    customLaunchers: {
        swd_chrome: {
            base: 'SeleniumWebDriver',
            browserName: 'Chrome',
            getDriver: function(){
              // example from https://www.npmjs.com/package/selenium-webdriver#usage 
              var driver = new chrome.Driver();
              return driver;
            }
        },
    },

    /*plugins : [
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }*/

  });
};
