module.exports = function(config){
  var webDriverConfig = {
        hostname: "0.0.0.0",
        port: 4444
    }

  config.set({
    basePath : './',

    hostname : '0.0.0.0',
    port: '9876',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],

    frameworks: ['jasmine'],

    browsers : ['WDChrome'],

    customLaunchers: {
        'WDChrome': {
            base: 'WebDriver',
            config: webDriverConfig,
            browserName: 'chrome'
        },
    }
  });
};
