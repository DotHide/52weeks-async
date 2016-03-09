# 52 Weeks play 52 node packages | Async
🙊 52 周玩转 52 个 Node 基础包 丨 Async 篇

### Async 简介
> 引用官方的话：Async 是一个工具模块，用于为异步的 Javascript 提供爽滑干脆的方法集。尽管最初被设计用于 Node 服务端，但它也可以直接在浏览器中运行。

由于编写本文的时候 2.0 还在 pre 阶段，因此本文主要基于它的 1.5.2 稳定版。

Async 主要方法有 3 大类（集合、流程控制、工具集），提供了近 40 个方法，包括常规的「功能性」方法（map, reduce, filter, each 等）和一些异步控制流的常规模式（并行、串行、瀑布等）。所有这些方法都假设你遵循了 Node.js 的规范，提供了一个单个的回调作为 async 方法的最后一个参数。

其中一些方法可以根据以下形式得到扩展方法

- <name\>**S**eries：如 each，可以在后面直接加 Series，变为 eachSeries 方法，这样的方法每次同时只执行一个异步操作，在集合操作中较多；
- <name\>**L**imit：如 eachLimit，它表示给每次同时执行异步操作设定一个次数的上限

#### 集合操作（Collections）
- `each` **SL**
- `forEachOf` **SL**
- `map` **SL**
- `filter` **SL**
- `reject` **SL**
- `reduce` `reduceRight`
- `detect` **SL**
- `sortBy`
- `some` **L**
- `every` **L**
- `concat` **S**

#### 流程控制（Control Flow）
- `series` 
- `parallel` **L**
- `whilst` `doWhilst`
- `until` `doUntil`
- `during` `doDuring`
- `forever`
- `waterfall`
- `compose`
- `seq`
- `applyEach` **S**
- `queue` `priorityQueue`
- `cargo`
- `auto`
- `retry`
- `iterator`
- `times` **SL**

#### 工具集（Utils）
- `apply`
- `nextTick`
- `memoize`
- `unmemoize`
- `ensureAsync`
- `constant`
- `asyncify`
- `wrapSync`
- `log`
- `dir`
- `noConflict`

### 玩转 Async
接下来，我将从这些方法中挑选一些出来，作为娱乐和分析，限于篇幅不宜过长，我尽可能挑选具有代表性的方法，其他方法其实就是某些方法的变种。首先，我们现来玩 `each` 。

#### each
`each` 顾名思义就是每个，就是把一个集合中的每个元素都做一次操作，由于我们玩的是异步工具，因此它允许每个元素同时做操作，做的最快的最先完成，整个集合操作的时间取决于时间最慢的那个元素的操作。我们来举一个访问网址的例子：

```js
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
    callback();
  });
}

a();

/* 输出结果
 * ===> Reached:  http://www.qq.com OK 289.21ms
 * ===> Reached:  https://nodejs.org/en/ OK 326.42ms
 * ===> Reached:  https://www.google.com.hk OK 435.10ms
 * ===> Reached:  https://www.baidu.com OK 467.60ms
 * ===> Reached:  https://github.com OK 1666.13ms
 * ===> each Finished. 1676.90ms
*/
```