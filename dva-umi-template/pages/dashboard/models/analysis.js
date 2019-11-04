import {queryWeather} from '@/service/dashboard';

export default {
  namespace: 'analysis',

  state: {
    weatherData: [],
  },

  effects: {
    *fetchWeather(action, { call, put }) {
      const response = yield call(queryWeather);
      yield put({
        type: 'changeWeather',
        weather: response.result||"返回值为空的默认值是weather",
      });
    },
  },

  reducers: {
    changeWeather(state, action) {
      return {
        ...state,
        queryWeather: action.weather,
      };
    },
  },
};