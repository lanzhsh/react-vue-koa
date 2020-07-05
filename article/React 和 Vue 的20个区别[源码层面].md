# 前言
面试竞争力越来越大，是时候撸一波Vue和React源码啦；  
本文从20个层面来对比Vue和React的源码区别；  
如果需要了解API的区别，请戳：  
[Vue 开发必须知道的 36 个技巧](https://juejin.im/post/5d9d386fe51d45784d3f8637)   
[React 开发必须知道的 34 个技巧](https://juejin.im/post/5dcb5a80e51d4520db19b906)

# 1.Vue和React源码区别
## 1.1 Vue源码
来张Vue源码编译过程图
![](https://user-gold-cdn.xitu.io/2020/6/26/172eec4c38c54c96?w=1079&h=544&f=png&s=57314)  
图片来源：[分析Vue源码实现](https://juejin.im/post/5adead636fb9a07aaf34d794)
### 1.1.1 挂载
初始化$mounted会挂载组件,不存在 render 函数时需要编译(compile);

### 1.1.2 compile
1.compile 分为 parse，optimize 和 generate，最终得到 render 函数；  

2.parse 调用 parseHtml 方法，方法核心是利用正则解析 template 的指令，class 和 stype，得到 AST；  

3.optimize 作用标记 static 静态节点，后面 patch,diff会跳过静态节点；  

4.generate 是将 AST 转化为 render 函数表达式，执行 vm._render 方法将 render 表达式转化为VNode，得到 render 和 staticRenderFns 字符串；  

5.vm._render 方法调用了 VNode 创建的方法createElement  
```
// render函数表达式
(function() {
  with(this){
    return _c('div',{   //创建一个 div 元素
      attrs:{"id":"app"}  //div 添加属性 id
      },[
        _m(0),  //静态节点 header，此处对应 staticRenderFns 数组索引为 0 的 render function
        _v(" "), //空的文本节点
        (message) //判断 message 是否存在
         //如果存在，创建 p 元素，元素里面有文本，值为 toString(message)
        ?_c('p',[_v("\n    "+_s(message)+"\n  ")])
        //如果不存在，创建 p 元素，元素里面有文本，值为 No message.
        :_c('p',[_v("\n    No message.\n  ")])
      ]
    )
  }
})
```

### 1.1.3 依赖收集与监听
这部分是数据响应式系统  
1.调用 observer()，作用是遍历对象属性进行双向绑定；  

2.在 observer 过程中会注册Object.defineProperty的 get 方法进行依赖收集，依赖收集是将Watcher 对象的实例放入 Dep 中；  

3.Object.defineProperty的 set 会调用Dep 对象的 notify 方法通知它内部所有的 Watcher 对象调用对应的 update()进行视图更新；  

4.本质是发布者订阅模式的应用

### 1.1.4 diff 和 patch
diff 算法对比差异和调用 update更新视图：  
1.patch 的 differ 是将同层的树节点进行比较,通过唯一的 key 进行区分，时间复杂度只有 O(n)；  

2.上面将到 set 被触发会调用 watcher 的 update()修改视图； 

3.update 方法里面调用 patch()得到同级的 VNode 变化;  

4.update 方法里面调用createElm通过虚拟节点创建真实的 DOM 并插入到它的父节点中；  

5.createElm实质是遍历虚拟 dom，逆向解析成真实 dom；    

## 1.2 React 源码
来张React源码编译过程图
![React源码导图](https://user-gold-cdn.xitu.io/2020/6/26/172eeb528af1b162?w=2670&h=1430&f=png&s=299541)
图片来源：[React源码解析](https://juejin.im/post/5a84682ef265da4e83266cc4)
### 1.2.1 React.Component
1.原型上挂载了setState和forceUpdate方法;  
2.提供props,context,refs 等属性;  
3.组件定义通过 extends 关键字继承 Component;  

### 1.2.2 挂载
1.render 方法调用了React.createElement方法(实际是ReactElement方法)；  

2.ReactDOM.render(component，mountNode)的形式对自定义组件/原生DOM/字符串进行挂载；  

3.调用了内部的ReactMount.render，进而执行ReactMount._renderSubtreeIntoContainer,就是将子DOM插入容器；  

4.ReactDOM.render()根据传入不同参数会创建四大类组件，返回一个 VNode；  

5.四大类组件封装的过程中，调用了mountComponet方法，触发生命周期，解析出 HTML；  

### 1.2.3 组件类型和生命周期
1.ReactEmptyComponent,ReactTextComponent,ReactDOMComponent组件没有触发生命周期;  
2.ReactCompositeComponent类型调用mountComponent方法,会触发生命周期,处理 state 执行componentWillMount钩子,执行 render,获得 html,执行componentDidMounted  

### 1.2.4 data 更新 setState
细节请见 3.1

### 1.2.5 数据绑定
1.setState 更新 data 后,shouldComponentUpdate为 true会生成 VNode,为 false 会结束; 
2.VNode会调用 DOM diff,为 true 更新组件;  


## 1.3 对比
React:  
1.单向数据流;  
2.setSate 更新data 值后，组件自己处理;
3.differ 是首位是除删除外是固定不动的,然后依次遍历对比;  

Vue:  
1.v-model 可以实现双向数据流,但只是v-bind:value 和 v-on:input的语法糖;  
2.通过 this 改变值，会触发 Object.defineProperty的 set，将依赖放入队列，下一个事件循环开始时执行更新时才会进行必要的DOM更新，是外部监听处理更新；    
3.differcompile 阶段的optimize标记了static 点，可以减少 differ 次数，而且是采用双向遍历方法；

# 2.React 和 Vue 渲染过程区别
## 2.1 React
1.生成期(挂载):参照 1.2.1
2.更新: 参照1.1.3和 1.1.4
3.卸载:销毁挂载的组件

## 2.2 Vue
1.new Vue()初始化后initLifecycle(vm),initEvents(vm),initRender(vm),callHook(vm,beforeCreate),initState(vm),callHook(vm,created);  
```
 A.initLifecycle, 建立父子组件关系，在当前实例上添加一些属性和生命周期标识。如：children、refs、_isMounted等;  
 B.initEvents，用来存放除@hook:生命周期钩子名称="绑定的函数"事件的对象。如：$on、$emit等;  
 C.initRender，用于初始化$slots、$attrs、$listeners; 
 D.initState，是很多选项初始化的汇总，包括：props、methods、data、computed 和 watch 等;  
 E.callHook(vm,created)后才挂载实例 
```
2.compileToFunction:就是将 template 编译成 render 函数;  
3.watcher: 就是执行1.2.3;    
4.patch:就是执行 1.2.4  
  
## 3.AST 和 VNode 的异同
1.都是 JSON 对象；  

2.AST 是HTML,JS,Java或其他语言的语法的映射对象，VNode 只是 DOM 的映射对象，AST 范围更广；  

3.AST的每层的element，包含自身节点的信息(tag,attr等)，同时parent，children分别指向其父element和子element，层层嵌套，形成一棵树  
```
<div id="app">
  <ul>
    <li v-for="item in items">
      itemid:{{item.id}}
    </li>
  </ul>
</div>

//转化为 AST 格式为
{
    "type": 1,
    "tag": "div",
    "attrsList": [
        {
            "name": "id",
            "value": "app"
        }
    ],
    "attrsMap": {
        "id": "app"
    },
    "children": [
        {
            "type": 1,
            "tag": "ul",
            "attrsList": [],
            "attrsMap": {},
            "parent": {
                "$ref": "$"
            },
            "children": [
                {
                    "type": 1,
                    "tag": "li",
                    // children省略了很多属性,表示格式即可
                }
            ],
            "plain": true
        }
    ],
    "plain": false,
    "attrs": [
        {
            "name": "id",
            "value": "\"app\""
        }
    ]
}
```
4.vnode就是一系列关键属性如标签名、数据、子节点的集合，可以认为是简化了的dom:
```
{
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void;
  ...
}
```
5.VNode 的基本分类:EmptyVNode,TextVNode,ComponentVNNode,ElementVNNode,CloneVNode

6.创建 VNode
```
方法一:
// 利用createDocumentFragment()创建虚拟 dom 片段
// 节点对象包含dom所有属性和方法

// html
<ul id="ul"></ul>
// js
const element  = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const browsers = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];

browsers.forEach(function(browser) {
    const li = document.createElement('li');
    li.textContent = browser;
    fragment.appendChild(li);　　// 此处往文档片段插入子节点，不会引起回流 （相当于打包操作）
});
console.log(fragment)
element.appendChild(fragment);　　// 将打包好的文档片段插入ul节点，只做了一次操作,时间快,性能好

方法二:
// 用 JS 对象来模拟 VNode
function Element (tagName, props, children) {
  console.log('this',this)
  this.tagName = tagName
  this.props = props
  this.children = children
}

let ElementO =new Element('ul', {id: 'list'}, [
  new Element('li', {class: 'item'}, ['Item 1']),
  new Element('li', {class: 'item'}, ['Item 2']),
  new Element('li', {class: 'item'}, ['Item 3'])
])

// 利用 render 渲染到页面
Element.prototype.render = function () {
  const el = document.createElement(this.tagName) // 根据tagName构建
  const props = this.props

  for (const propName in props) { // 设置节点的DOM属性
    const propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  const children = this.children || []

  children.forEach(function (child) {
    const childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}
console.log('ElementO',ElementO)
var ulRoot = ElementO.render()
console.log('ulRoot',ulRoot)
document.body.appendChild(ulRoot)
```

# 4.React 和Vue 的 differ 算法区
## 4.1 React
1.Virtual DOM 中的首个节点不执行移动操作（除非它要被移除），以该节点为原点，其它节点都去寻找自己的新位置; 一句话就是首位是老大,不移动; 

2.在 Virtual DOM 的顺序中，每一个节点与前一个节点的先后顺序与在 Real DOM 中的顺序进行比较，如果顺序相同，则不必移动，否则就移动到前一个节点的前面或后面;  

3.tree diff:只会同级比较,如果是跨级的移动,会先删除节点 A,再创建对应的 A;将 O(n3) 复杂度的问题转换成 O(n) 复杂度;  

4.component diff:  
  根据batchingStrategy.isBatchingUpdates值是否为 true;
  如果true 同一类型组件,按照 tree differ 对比;
  如果 false将组件放入 dirtyComponent,下面子节点全部替换,具体逻辑看 3.1 setSate
  
5.element differ:  
  tree differ 下面有三种节点操作:INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）
  [请戳](https://segmentfault.com/a/1190000016723305)


6.代码实现 
```
_updateChildren: function(nextNestedChildrenElements, transaction, context) {
   var prevChildren = this._renderedChildren
  var removedNodes = {}
  var mountImages = []

  // 获取新的子元素数组
  var nextChildren = this._reconcilerUpdateChildren(
    prevChildren,
    nextNestedChildrenElements,
    mountImages,
    removedNodes,
    transaction,
    context
  )

  if (!nextChildren && !prevChildren) {
    return
  }

  var updates = null
  var name
  var nextIndex = 0
  var lastIndex = 0
  var nextMountIndex = 0
  var lastPlacedNode = null

  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue
    }
    var prevChild = prevChildren && prevChildren[name]
    var nextChild = nextChildren[name]
    if (prevChild === nextChild) {
      // 同一个引用，说明是使用的同一个component,所以我们需要做移动的操作
      // 移动已有的子节点
      // NOTICE：这里根据nextIndex, lastIndex决定是否移动
      updates = enqueue(
        updates,
        this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
      )

      // 更新lastIndex
      lastIndex = Math.max(prevChild._mountIndex, lastIndex)
      // 更新component的.mountIndex属性
      prevChild._mountIndex = nextIndex

    } else {
      if (prevChild) {
        // 更新lastIndex
        lastIndex = Math.max(prevChild._mountIndex, lastIndex)
      }

      // 添加新的子节点在指定的位置上
      updates = enqueue(
        updates,
        this._mountChildAtIndex(
          nextChild,
          mountImages[nextMountIndex],
          lastPlacedNode,
          nextIndex,
          transaction,
          context
        )
      )


      nextMountIndex++
    }

    // 更新nextIndex
    nextIndex++
    lastPlacedNode = ReactReconciler.getHostNode(nextChild)
  }

  // 移除掉不存在的旧子节点，和旧子节点和新子节点不同的旧子节点
  for (name in removedNodes) {
    if (removedNodes.hasOwnProperty(name)) {
      updates = enqueue(
        updates,
        this._unmountChild(prevChildren[name], removedNodes[name])
      )
    }
  }
  }
```

## 4.2 Vue
1.自主研发了一套Virtual DOM，是借鉴开源库snabbdom，
[snabbdom地址](https://github.com/snabbdom/snabbdom)  

2.也是同级比较，因为在 compile 阶段的optimize标记了static 点，可以减少 differ 次数；  

3.Vue 的这个 DOM Diff 过程就是一个查找排序的过程，遍历 Virtual DOM 的节点，在 Real DOM 中找到对应的节点，并移动到新的位置上。不过这套算法使用了双向遍历的方式，加速了遍历的速度，[更多请戳](http://www.imooc.com/article/details/id/295545)；  

4.代码实现:
```
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx
  let idxInOld
  let elmToMove
  let before
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {   //对于vnode.key的比较，会把oldVnode = null
      oldStartVnode = oldCh[++oldStartIdx]
    }else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    }else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    }else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    }else {
      // 使用key时的比较
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
      }
      idxInOld = oldKeyToIdx[newStartVnode.key]
      if (!idxInOld) {
        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
        newStartVnode = newCh[++newStartIdx]
      }
      else {
        elmToMove = oldCh[idxInOld]
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
        }else {
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = null
          api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
  }else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```

## 4.3 对比
相同点:  
都是同层 differ,复杂度都为 O(n); 

不同点:  
1.React 首位是除删除外是固定不动的,然后依次遍历对比;  
2.Vue 的compile 阶段的optimize标记了static 点,可以减少 differ 次数,而且是采用双向遍历方法;  

# 5.React 的 setState和 Vue 改变值的区别
## 5.1 setState
1.setState 通过一个队列机制来实现 state 更新，当执行 setState() 时，会将需要更新的 state 浅合并后,根据变量 isBatchingUpdates(默认为 false)判断是直接更新还是放入状态队列；

2.通过js的事件绑定程序 addEventListener 和使用setTimeout/setInterval 等 React 无法掌控的 API情况下isBatchingUpdates 为 false，同步更新。除了这几种情况外batchedUpdates函数将isBatchingUpdates修改为 true；

3.放入队列的不会立即更新 state，队列机制可以高效的批量更新 state。而如果不通过setState，直接修改this.state 的值，则不会放入状态队列;

4.setState 依次直接设置 state 值会被合并，但是传入 function 不会被合并；  
让setState接受一个函数的API的设计是相当棒的！不仅符合函数式编程的思想，让开发者写出没有副作用的函数，而且我们并不去修改组件状态，只是把要改变的状态和结果返回给React，维护状态的活完全交给React去做。正是把流程的控制权交给了React，所以React才能协调多个setState调用的关系
```
// 情况一
state={
  count:0
}
handleClick() {
  this.setState({
    count: this.state.count + 1
  })
  this.setState({
    count: this.state.count + 1
  })
  this.setState({
    count: this.state.count + 1
  })
}
// count 值依旧为1

// 情况二
increment(state, props) {
  return {
    count: state.count + 1
  }
}

handleClick() {
  this.setState(this.increment)
  this.setState(this.increment)
  this.setState(this.increment)
}
// count 值为 3
```
5.更新后执行四个钩子:shouleComponentUpdate,componentWillUpdate,render,componentDidUpdate

## 5.2 Vue 的 this 改变
1.vue 自身维护 一个 更新队列，当你设置 this.a = 'new value'，DOM 并不会马上更新；  

2.在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更；  

3.如果同一个 watcher 被多次触发，只会被推入到队列中一次；

4.也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新和去重；  

5.所以 for 循环 10000次 this.a = i vue只会更新一次，而不会更新10000次;

6.data 变化后如果 computed 或 watch 监听则会执行;

# 6. Vue的v-for 或  React 的map 中为什么不要用 index作为 key
## 6.1 为什么要加 key
### 6.1.1 React
1.上面的 5.1 讲到 React 的 differ 中 element differ 有三种节点操作；  

2.场景一不加 key:  
  新老集合进行 diff 差异化对比，发现 B != A，则创建并插入 B 至新集合，删除老集合 A；以此类推，创建并插入 A、D 和 C，删除 B、C 和 D；  
  都是相同的节点，但由于位置发生变化，导致需要进行繁杂低效的删除、创建操作，其实只要对这些节点进行位置移动即可；    

3.场景二加 key:  
  新建：从新集合中取得 E，判断老集合中不存在相同节点 E，则创建新节点 ElastIndex不做处理E的位置更新为新集合中的位置，nextIndex++；  
  删除：当完成新集合中所有节点 diff 时，最后还需要对老集合进行循环遍历，判断是否存在新集合中没有但老集合中仍存在的节点，发现存在这样的节点 D，因此删除节点 D；  

4.总结:  
  显然加了 key 后操作步骤要少很多,性能更好；  
  但是都会存在一个问题，上面场景二只需要移动首位，位置就可对应，但是由于首位是老大不能动，所以应该尽量减少将最后一个节点移动到首位，[更多请戳](https://juejin.im/post/5a31dda3f265da43052ea207)。  


### 6.1.2 Vue
Vue 不加 key 场景分析:  
1.场景一不加 key:  
也会将使用了双向遍历的方式查找,发现 A,B,C,D都不等,先删除再创建；  

2.场景二加 key:双向遍历的方式查找只需要创建E，删除D，改变 B、C、A的位置

### 6.2 为什么 key 不能为 index
这个问题分为两个方面:  
1.如果列表是纯静态展示，不会 CRUD，这样用 index 作为 key 没得啥问题；  

2.如果不是  
```
const list = [1,2,3,4];
// list 删除 4 不会有问题,但是如果删除了非 4 就会有问题
// 如果删除 2
const listN= [1,3,4]
// 这样index对应的值就变化了,整个 list 会重新渲染
```

3.所以 list 最好不要用 index 作为 key  

## 7. Redux和 Vuex 设计思想
## 7.1 Redux
API:  
1.Redux则是一个纯粹的状态管理系统，React利用React-Redux将它与React框架结合起来；  

2.只有一个用createStore方法创建一个 store；  

3.action接收 view 发出的通知，告诉 Store State 要改变，有一个 type 属性；  

4.reducer:纯函数来处理事件，纯函数指一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用,得到一个新的 state； 

源码组成:  
```
1.createStore 创建仓库，接受reducer作为参数  
2.bindActionCreator 绑定store.dispatch和action 的关系  
3.combineReducers 合并多个reducers  
4.applyMiddleware 洋葱模型的中间件,介于dispatch和action之间，重写dispatch
5.compose 整合多个中间件
6.单一数据流;state 是可读的,必须通过 action 改变;reducer设计成纯函数;
```

## 7.2 Vuex
1.Vuex是吸收了Redux的经验，放弃了一些特性并做了一些优化，代价就是VUEX只能和VUE配合；  

2.store:通过 new Vuex.store创建 store，辅助函数mapState；  

3.getters:获取state，有辅助函数 mapGetters；  

4.action:异步改变 state，像ajax，辅助函数mapActions；  

5.mutation:同步改变 state,辅助函数mapMutations；  

## 7.3 对比
```
1.Redux： view——>actions——>reducer——>state变化——>view变化（同步异步一样）
2.Vuex： view——>commit——>mutations——>state变化——>view变化（同步操作） 
  view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
```

# 8.redux 为什么要把 reducer 设计成纯函数
1.纯函数概念:一个函数的返回结果只依赖于它的参数(外面的变量不会改变自己)，并且在执行过程里面没有副作用(自己不会改变外面的变量)；  

2.主要就是为了减小副作用，避免影响 state 值，造成错误的渲染；  

3.把reducer设计成纯函数，便于调试追踪改变记录；  

# 9.Vuex的mutation和Redux的reducer中为什么不能做异步操作
1.在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行；  

2.vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）；  

3.每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态；   

4.其实就是框架是这么设计的,便于调试追踪改变记录

# 10.双向绑定和 vuex 是否冲突
1.在严格模式中使用Vuex，当用户输入时，v-model会试图直接修改属性值，但这个修改不是在mutation中修改的，所以会抛出一个错误；  

2.当需要在组件中使用vuex中的state时，有2种解决方案：
```
在input中绑定value(vuex中的state)，然后监听input的change或者input事件，在事件回调中调用mutation修改state的值;  

// 双向绑定计算属性
<input v-model="message">

computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
# 11. Vue的nextTick原理
## 11.1 使用场景
什么时候会用到?   
nextTick的使用原则主要就是解决单一事件更新数据后立即操作dom的场景。

## 11.2 原理
1.vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行；  

2.microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕；  

3.考虑兼容问题，vue 做了 microtask 向 macrotask 的降级方案；  

4.代码实现:
```
const simpleNextTick = function queueNextTick (cb) {   
    return Promise.resolve().then(() => {
      cb()
    })
}

simpleNextTick(() => {
  console.log(this.$refs.test.innerText)
})
```

# 13. Vue 的data 必须是函数而 React 的 state 是对象
## 13.1 Vue 的 data 必须是函数
对象是引用类型，内存是存贮引用地址，那么子组件中的 data 属性值会互相污染，产生副作用；    
如果是函数，函数的{}构成作用域，每个实例相互独立，不会相互影响；  

## 13.2 React 的 state 是对象
因为 state 是定义在函数里面,作用域已经独立

# 14.Vue 的合并策略
1.生命周期钩子:合并为数组
```
function mergeHook (
  parentVal,
  childVal 
) {
  return childVal
    ? parentVal // 如果 childVal存在
      ? parentVal.concat(childVal) // 如果parentVal存在，直接合并
      : Array.isArray(childVal) // 如果parentVal不存在
        ? childVal  // 如果chilidVal是数组，直接返回
        : [childVal] // 包装成一个数组返回
    : parentVal  // 如果childVal 不存在 直接返回parentVal 
}
// strats中添加属性，属性名为生命周期各个钩子
config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook // 设置每一个钩子函数的合并策略
})
```

2.watch：合并为数组，执行有先后顺序；  

3.assets（components、filters、directives）：合并为原型链式结构,合并的策略就是返回一个合并后的新对象，新对象的自有属性全部来自 childVal， 但是通过原型链委托在了 parentVal 上
```
function mergeAssets (parentVal, childVal) { // parentVal: Object childVal: Object
  var res = Object.create(parentVal || null) // 原型委托
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})
```

4.data为function，需要合并执行后的结果，就是执行 parentVal 和 childVal 的函数，然后再合并函数返回的对象；  

5.自定义合并策略：
```
Vue.config.optionMergeStrategies.watch = function (toVal, fromVal) {
  // return mergedVal
}
```
# 14.Vue-router 的路由模式
1.三种："hash" | "history" | "abstract"；  

2.hash(默认),history 是浏览器环境，abstract是 node 环境；  

3.hash: 使用 URL hash 值来作路由，是利用哈希值实现push、replace、go 等方法；  

4.history:依赖 HTML5 History API新增的 pushState() 和 replaceState()，需要服务器配置；  

5.abstract:如果发现没有浏览器的 API，路由会自动强制进入这个模式。    

# 15.Vue 的事件机制
```
class Vue {  
  constructor() {    
    //  事件通道调度中心    
    this._events = Object.create(null);  
  }  
  $on(event, fn) {    
    if (Array.isArray(event)) {      
      event.map(item => {        
        this.$on(item, fn);      
    });    
  } else {      
    (this._events[event] || (this._events[event] = [])).push(fn);    }    
    return this; 
 }  
$once(event, fn) {    
  function on() {      
    this.$off(event, on);      
    fn.apply(this, arguments);    
    }    
    on.fn = fn;    
    this.$on(event, on);    
    return this;  
}  
$off(event, fn) {    
  if (!arguments.length) {      
    this._events = Object.create(null);      
    return this;    
  }    
  if (Array.isArray(event)) {      
    event.map(item => {        
      this.$off(item, fn);      
  });      
  return this;    
  }    
const cbs = this._events[event];    
if (!cbs) {      
  return this;
}    
if (!fn) {      
  this._events[event] = null;
  return this;    
}    
let cb;    
let i = cbs.length;    
while (i--) {      
  cb = cbs[i];      
  if (cb === fn || cb.fn === fn) {        
    cbs.splice(i, 1);        
    break;      
}    
}    
return this;  
}  
$emit(event) {    
  let cbs = this._events[event];    
  if (cbs) {      
    const args = [].slice.call(arguments, 1);      
    cbs.map(item => {        
      args ? item.apply(this, args) : item.call(this);      
});    
}    
return this;  
}}
```
## 16.keep-alive 的实现原理和缓存策略
1.获取keep-alive第一个子组件；  

2.根据include exclude名单进行匹配，决定是否缓存。如果不匹配，直接返回组件实例，如果匹配，到第3步；  

3.根据组件id和tag生成缓存组件的key，再去判断cache中是否存在这个key，即是否命中缓存，如果命中，用缓存中的实例替代vnode实例，然后更新key在keys中的位置，(LRU置换策略)。如果没有命中，就缓存下来，如果超出缓存最大数量max,删除cache中的第一项。

4.keep-alive是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；  

5.LRU算法:根据数据的历史访问记录来进行淘汰数据，其实就是访问过的，以后访问概率会高；  

6.LRU 实现:
  新数据插入到链表头部；
  每当缓存命中（即缓存数据被访问），则将数据移到链表头部；
  当链表满的时候，将链表尾部的数据丢弃。

# 17.Vue 的 set 原理
1.由于 Object.observe()方法废弃了，所以Vue 无法检测到对象属性的添加或删除；  

2.原理实现:  
  判断是否是数组，是利用 splice 处理值；    
  判断是否是对象的属性，直接赋值；   
  不是数组，且不是对象属性，创建一个新属性，不是响应数据直接赋值，是响应数据调用defineReactive；  
  ```
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 如果 set 函数的第一个参数是 undefined 或 null 或者是原始类型值，那么在非生产环境下会打印警告信息
  // 这个api本来就是给对象与数组使用的
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 类似$vm.set(vm.$data.arr, 0, 3)
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式, 这个前面讲过
    target.splice(key, 1, val)
    return val
  }
  // target为对象, key在target或者target.prototype上。
  // 同时必须不能在 Object.prototype 上
  // 直接修改即可, 有兴趣可以看issue: https://github.com/vuejs/vue/issues/6845
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = (target: any).__ob__
  // Vue 实例对象拥有 _isVue 属性, 即不允许给Vue 实例对象添加属性
  // 也不允许Vue.set/$set 函数为根数据对象(vm.$data)添加属性
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // target本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
https://juejin.im/post/5e04411f6fb9a0166049a073#heading-18
```
# 18.简写 Redux
```
function createStore(reducer) {
    let state;
    let listeners=[];
    function getState() {
        return state;
    }

    function dispatch(action) {
        state=reducer(state,action);
        listeners.forEach(l=>l());
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            const index=listeners.indexOf(listener);
            listeners.splice(inddx,1);
        }
    }
    
    dispatch({});
    
    return {
        getState,
        dispatch,
        subscribe
    }

}
```
# 19 react-redux是如何来实现的
源码组成:  
1.connect 将store和dispatch分别映射成props属性对象，返回组件  
2.context 上下文 导出Provider,,和 consumer  
3.Provider 一个接受store的组件，通过context api传递给所有子组件

# 20. react16 的 fiber 理解
1.react 可以分为 differ 阶段和 commit(操作 dom)阶段；  

2.v16 之前是向下递归算法，会阻塞；  

3.v16 引入了代号为 fiber 的异步渲染架构；  

4.fiber 核心实现了一个基于优先级和requestIdleCallback循环任务调度算法；  

5.算法可以把任务拆分成小任务，可以随时终止和恢复任务，可以根据优先级不同控制执行顺序，[更多请戳](https://www.cnblogs.com/zhuanzhuanfe/p/9567081.html)；

# 总结
原创码字不易，欢迎star！
您的鼓励是我持续创作的动力！