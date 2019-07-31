import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import comTable from './modules/comTable'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comTable
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
