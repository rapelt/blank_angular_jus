module.exports = function (callback) {
    browser.getCurrentUrl().then(function(url){
      console.log('Current url: ', url)
      callback();
    });
};
