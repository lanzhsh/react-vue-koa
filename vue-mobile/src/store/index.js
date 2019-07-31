import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import tabIndex from './modules/tabIndex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabIndex
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
