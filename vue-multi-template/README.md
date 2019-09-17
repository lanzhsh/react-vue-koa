## 使用vue cli3配置多页项目

> 我们在使用vue cli3脚手架构建页面时，大多都是单页应用（这其中的优势我就不多说了），但是在某些场景，我们需要构建多页应用，例如我们我们应用中有很多小型h5页面，或者多种活动页，这些页面互相之间没有什么关联，如果每个活动页面都构建一个应用，那也是不切实际的，所以我们需要使用vue脚手架构建多页应用，其中在vue-cli2.x版本配置多页需要修改的地方还是挺繁琐，不过好在cli3版本增加了pages属性，配置起来相当轻松。
>

#### 创建多页应用

首先 `vue create vue-multi-demo` 初始化名为 `vue-multi-demo` 的项目，我们删除views文件夹，新建一个名为`pages` 的文件夹，并创建 `index` 、 `page1` 、 `page2` 文件夹如下：

这里index代表了项目首页，page1、page2在这里可以理解为需要构建的其他页面，我们可以在各自的页面文件下创建属于他们的入口文件index.js(相当于单页应用的main.js) router路由、组件components、vuex、axios等等，我们就把他们每个理解为独立的单页应用。

#### 配置vue.config.js

在项目中创建 `vue.config.js` 文件来配置我们的多页应用。话不多说，整干货：

```
const glob = require('glob')

function getEntry(url) {
  let entrys = {}
  glob.sync(url).forEach(item => {
    // splice(-3)取数组后三项
    let urlArr = item.split('/').splice(-3)
    entrys[urlArr[1]] = {
      entry: 'src/pages/' + urlArr[1] + '/' + 'index.js',
      template: 'src/pages/' + urlArr[1] + '/' + 'index.html',
      filename: urlArr[1] + '.html',
      title: 'pages-' + urlArr[1]
    }
  })
  return entrys
}
let pages = getEntry('./src/pages/**?/*.html')
module.exports = {
  pages
}
```

这里主要用到 `glob` 模块来处理多页路径，这样做的好处就是不用再pages添加后文件，再来vue.config.js中添加pages对象属性，当页面多时，这是相当繁琐的，所以我们需要借助 `glob` 模块，调用glob.sync(url)返回匹配到的路径数组，有关路径匹配规则，如下： 

```
   1、* ：匹配单个路径部分中的0个或多个字符。

　　2、?：匹配路径中某部分1个字符。

　　3、[...] ：匹配一个字符的范围，类似于一个正则表达式的范围。如果范围的第一个字符是！或者，它匹配任何不在范围内的字符。

　　4、!(模式1|模式2|模式3)：匹配与所提供的任何模式不匹配的任何内容。和正则表达式的!一样。

　　5、?(模式1|模式2|模式3)：匹配所提供的模式的零或一个事件。

　　6、+(模式1|模式2|模式3)：匹配所提供的模式的一个或多个事件。

 　 7、*(a|b|c) ：匹配所提供的模式的零个或多个事件。

　　8、@(pattern|pat*|pat?erN)：匹配所提供的模式之一。

　　9、**：如果**在一个路径的部分，他会匹配零个或多个目录和子目录中搜索匹配。
```

更多 [glob相关介绍请点击查看](https://www.cnblogs.com/waitforyou/p/7044171.html)

运行 `npm run serve`  输入 `http:localhost:8080` 跑动程序：



![](https://user-gold-cdn.xitu.io/2019/8/29/16cdc43b3639f7bc?w=1540&h=490&f=png&s=24196)

点击page1 、page2 都会重新请求刷新页面，最后 `npm run build` 打包程序：

![](https://user-gold-cdn.xitu.io/2019/8/29/16cdc40bbe6bc2d2?w=268&h=351&f=png&s=11594)

至此vue cli3多页面配置就简单实现了，大家可以依照这个例子，在实际项目中构建更多功能！


