module.exports = function (callback) {
    browser.getCurrentUrl().then(function(url){
      console.log('Current url: ', url)
      callback();
    }, function(error){
      console.error('Error: ', error);
    });
};
