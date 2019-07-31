import api from '@/utils/api';
import request from '@/utils/request';

// initial state
const state = {
  tableData: [],
}

// getters
const getters = {
  allTableData: state => state.tableData,
}

// actions
const actions = {
  getAllData ({ commit }) {
    request({
      url:api.tableData,
      method:"GET",
      params:{},
    }).then(res=>{
      console.log('res值为',res);
      //这里特别坑爹,axios读取本地的json转化为字符串了,所以要通过eval转化为对象
      commit('setTableData', eval('('+res.data+')').tabData);
    })
  }
}

// mutations
const mutations = {
  setTableData (state,tableData) {
    state.tableData = tableData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}