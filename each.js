var fetch = require('node-fetch');
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
  return fetch(url, {
    timeout: 3000
  }).then(function(res) {
    console.log(url, res.statusText);
    callback(null, url);
  }).catch(function(err) {
    callback(err);
  });
}

// 并行执行访问网址操作，执行顺序不保证
console.time('each');
async.each(urls, fetchUrls, function(err) {
  console.timeEnd('each');
});

// 串行执行访问网址操作，执行顺序依据数组元素顺序
console.time('eachSeries');
async.eachSeries(urls, fetchUrls, function(err) {
  console.timeEnd('eachSeries');
});

// 并行执行访问网址操作，但限制最多同时执行 2 个，同样不保证执行顺序
console.time('eachLimit');
async.eachLimit(urls, 3, fetchUrls, function(err) {
  console.timeEnd('eachLimit');
});
