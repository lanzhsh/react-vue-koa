import request from '@/utils/request';

export async function queryCourse(data) {
  return request({
    url:'/course',
    method:'post',
    data
  });
}

export async function addCourse(data) {
  return request({
    url:'/publish',
    method:'post',
    data
  });
}

export async function updateCourse(data) {
  return request({
    url:'/update',
    method:'post',
    data
  });
}

export async function deleteCourse(data) {
  return request({
    url:'/delete',
    method:'post',
    data
  });
}