# 52 Weeks play 52 node packages | Async
🙊 52 周玩转 52 个 Node 基础包 丨 Async 篇

### Async 简介
> 引用官方的话：Async 是一个工具模块，用于为异步的 Javascript 提供爽滑干脆的方法集。尽管最初被设计用于 Node 服务端，但它也可以直接在浏览器中运行。

由于编写本文的时候 2.0 还在 pre 阶段，因此本文主要基于它的 1.5.2 稳定版。

Async 主要方法有 3 大类（集合、流程控制、工具集），提供了近 40 个方法，包括常规的「功能性」方法（map, reduce, filter, each 等）和一些异步控制流的常规模式（并行、串行、瀑布等）。所有这些方法都假设你遵循了 Node.js 的规范，提供了一个单个的回调作为 async 方法的最后一个参数。

其中一些方法可以根据以下形式得到扩展方法

- <name\>Series：如 each，可以在后面直接加 Series，变为 eachSeries 方法，这样的方法每次同时只执行一个异步操作，在集合操作中较多；
- <name\>Limit：如 eachLimit，它表示给每次同时执行异步操作设定一个次数的上限

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

