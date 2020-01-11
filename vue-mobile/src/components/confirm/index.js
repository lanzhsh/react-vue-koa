
import confirm from './index.vue'
// import Vue from 'vue'

export default {
  install: function(Vue) {
    const Profile = Vue.extend(confirm)

    const PortfolioMsg = (options) => {
      options.onCancel = (reject) => { reject() }
      const $ele = document.createElement('div')
      document.body.appendChild($ele)
      new Profile({
        data() {
          return options
        }
      }).$mount($ele)
    }

    Vue.prototype.$confirm = PortfolioMsg
  }
}
