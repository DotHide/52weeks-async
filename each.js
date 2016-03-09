var fetch = require('node-fetch');
var present = require('present');
var async = require('async');

var urls = [
  'http://www.qq.com',
  'https://github.com',
  'https://www.baidu.com',
  'https://www.google.com.hk',
  'https://nodejs.org/en/'
];

// 访问网址（3秒超时）
var fetchUrls = function(url, callback) {
  var start = present();
  return fetch(url, {
    timeout: 3000
  }).then(function(res) {
    var end = present();
    console.log('===> Reached: ', url, res.statusText, (end - start).toFixed(2) + 'ms');
    callback();
  }).catch(function(err) {
    callback(err);
  });
}

var a = function(callback) {
  var start = present();
  // 并行执行访问网址操作，执行顺序不保证
  async.each(urls, fetchUrls, function(err) {
    var end = present();
    if (err) { console.log('xxx> Error: ', err); }
    console.log('===> each Finished.', (end - start).toFixed(2) + 'ms');
    callback(null, 'each: ' + (end - start).toFixed(2) + 'ms');
  });
}

var b = function(callback) {
  var start = present();
  // 串行执行访问网址操作，执行顺序依据数组元素顺序
  async.eachSeries(urls, fetchUrls, function(err) {
    var end = present();
    if (err) { console.log('xxx> Error: ', err); }
    console.log('===> eachSeries Finished.', (end - start).toFixed(2) + 'ms');
    callback(null, 'eachSeries:' + (end - start).toFixed(2) + 'ms');
  });
}

var c = function(callback) {
  var start = present();
  // 并行执行访问网址操作，但限制最多同时执行 2 个，同样不保证执行顺序
  console.time('eachLimit');
  async.eachLimit(urls, 3, fetchUrls, function(err) {
    var end = present();
    if (err) { console.log('xxx> Error: ', err); }
    console.log('===> eachLimit Finished.', (end - start).toFixed(2) + 'ms');
    callback(null, 'eachLimit:' + (end - start).toFixed(2) + 'ms');
  });
}

var d = function(callback) {
  var start = present();
  async.series([
      a,
      b,
      c
    ],
    // optional callback
    function(err, results) {
      // results is now equal to ['one', 'two']
      var end = present();
      console.log('Total: ', (end - start).toFixed(2) + 'ms');
    });
}

d();
