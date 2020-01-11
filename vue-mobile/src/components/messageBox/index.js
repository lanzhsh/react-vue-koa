import Vue from 'vue'
import messageBoxVue from './index.vue'

const MessageBoxConstructor = Vue.extend(messageBoxVue)

let inst

const messageBox = function(options) {
  inst = new MessageBoxConstructor({
    propsData: options
  })

  inst.vm = inst.$mount()
  document.body.appendChild(inst.$el)

  Vue.nextTick(() => {
    inst.messageBoxFlag = true
  })
}

const MessageBoxArr = [messageBox, messageBoxVue]
MessageBoxArr.install = function(Vue) {
  Vue.prototype['$messageBox'] = messageBox
  Vue.component(messageBoxVue.name, messageBoxVue)
}

export default MessageBoxArr
