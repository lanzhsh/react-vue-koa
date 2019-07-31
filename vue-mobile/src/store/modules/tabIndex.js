// initial state
const state = {
  tabIndex: 0
}

// getters
const getters = {
  allTabIndex: state => state.tabIndex
}

// actions
const actions = {
  getAllTabIndex({ commit }, index) {
    commit('setTabData', index)
  }
}

// mutations
const mutations = {
  setTabData(state, index) {
    state.tabIndex = index
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
