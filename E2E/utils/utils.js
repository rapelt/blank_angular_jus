module.exports = {
  wait: function (callback) {
    browser.getCurrentUrl().then(function (url) {
      callback();
    });
  },
  URL: process.env.URL || 'http://localhost:9001'
};
