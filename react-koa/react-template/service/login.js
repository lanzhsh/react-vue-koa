import request from '@/utils/request';

export async function login(data) {
  return request({
    url:'/register',
    method:'post',
    data
  });
}