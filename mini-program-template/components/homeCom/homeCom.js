const app = getApp();

Component({
  /**
   * title [标题，默认 '']
   * back [返回按钮，默认 true]
   * home [显示主页入口，默认 false]
   */
  properties: {
    content: {
      type: String,
      value: ''
    }
  },

  data: {
    
  },

  //组件生命周期声明对象，组件的生命周期：created、attached、ready、moved、detached将
  //收归到lifetimes字段内进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，
  //则lifetimes字段内声明方式优先级最高
  //pageLifetimes:组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
  lifetimes: {
    attached() {
      console.log('arrached执行啦');
      this.triggerEvent('toHomeVal', {key: '我是homeCom传入home的值'}); 
    }
  },

  methods: {
    // 获取状态栏高度，用于设置 padding-top 值
    
  }
})