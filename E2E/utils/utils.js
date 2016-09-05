module.exports = function (callback) {
  browser.getCurrentUrl().then(function (url) {
    callback();
  });
};
