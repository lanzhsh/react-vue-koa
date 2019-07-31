import {login} from '@/service/login';

export default {
  namespace: 'login',

  state: {
    queryLogin: [],
  },

  effects: {
    *fetchLogin(action, { call, put }) {
      const response = yield call(login);
      yield put({
        type: 'changeLogin',
        loginData: response.result||"默认值是登陆成功",
      });
    },
  },

  reducers: {
    changeLogin(state, action) {
      return {
        ...state,
        queryLogin: action.loginData,
      };
    },
  },
};