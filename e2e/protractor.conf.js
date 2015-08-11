exports.config = {
  // use jasmine spec reporter instead of the dots
  onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
   },

  allScriptsTimeout: 11000,

  specs: [
    './**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://0.0.0.0:8080',

  seleniumAddress:'http://0.0.0.0:4444/wd/hub',

  framework: 'jasmine',


  jasmineNodeOpts: {
    silent: true,
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
