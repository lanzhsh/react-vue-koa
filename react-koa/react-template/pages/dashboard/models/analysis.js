import {queryCourse , addCourse , updateCourse,deleteCourse} from '@/service/analysis';

export default {
  namespace: 'analysis',

  state: {
    courseData: [],
  },

  effects: {
    *fetchCourse({payload,callback}, { call, put }) {
      const response = yield call(queryCourse,{ ...payload });
      yield put({
        type: 'changeCourse',
        course: response.data,
      });
    },

    *fetchAddCourse({payload,callback}, { call, put }) {
      const response = yield call(addCourse,{ ...payload });
      if (callback&& typeof callback === 'function') callback(response);
    },

    *fetchEditCourse({payload,callback}, { call, put }) {
      const response = yield call(updateCourse,{ ...payload });
      if (callback&& typeof callback === 'function') callback(response);
    },

    *fetchDeleteCourse({payload,callback}, { call, put }) {
      const response = yield call(deleteCourse,{ ...payload });
      if (callback&& typeof callback === 'function') callback(response);
    },
  },

  reducers: {
    changeCourse(state, action) {
      return {
        ...state,
        courseData: action.course,
      };
    },
  },
};