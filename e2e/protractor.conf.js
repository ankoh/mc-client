exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8080',

  seleniumAddress:'http://localhost:4444/wd/hub',

  framework: 'jasmine',


  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
