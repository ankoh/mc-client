module.exports = function(config){
  var webdriverConfig = {
      hostname: '0.0.0.0',
      port: 4444
    }

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

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['ChromeSelenium'],

    customLaunchers: {
        'ChromeSelenium': {
            base: 'WebDriver',
            config: webdriverConfig,
            browserName: 'Chrome',
        }
    },

    plugins : [
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
