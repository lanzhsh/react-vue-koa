import { Storage, showToast } from './util'

// 获取用户信息
function getUserInfo({ detail }) {
  return new Promise(resolve => {
    console.log('detail值为',detail);
    if (detail.errMsg === 'getUserInfo:ok') {
      const { userInfo} = detail
      const authorUserInfo = Storage.getSync('userInfo')

      //判断是否授权,授权userInfo就存在
      if (!authorUserInfo) {
        // 授权后存储并更新用户信息
        Storage.setSync('userInfo', userInfo)
        resolve(userInfo)
      } else {
        resolve(userInfo)
      }
    }
  })
}

export{
  getUserInfo
}