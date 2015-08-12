var webdriver = require('selenium-webdriver');

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
              var driver = new webdriver.Builder()
                      .forBrowser('chrome')
                      .usingServer('http://0.0.0.0:4444/wd/hub')
                      .build();
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
