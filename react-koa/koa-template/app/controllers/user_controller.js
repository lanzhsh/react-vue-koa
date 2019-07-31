const config = require('./../../config');
const passport = require('./../utils/passport');
const User_col = require('./../models/user');
const Passport_col = require('./../models/password')
const uuidv1 = require('uuid/v1');

// 注册
const register = async (ctx, next) => {
  const req = ctx.request.body;
  // 查看用户名是否重复
  const user = await User_col.findOne({
    account: req.account
  });

  ctx.status = 200;
  if (user) {
    ctx.body = {
      code: 0,
      msg: '用户名重复！'
    }
    return;
  }
  
  // 插入新用户
  const userId = uuidv1();
  const newUser = await User_col.create({
    userId,
    account: req.account
  });

  if (newUser) {
    // 加密
    const hash = await passport.encrypt(req.password, config.saltTimes);
    const result = await Passport_col.create({
      userId: userId,
      hash
    })

    if (result) {
      ctx.body = {
        code: 1,
        msg: '注册成功！',
        data: {
          userId: newUser.userId,
          account: newUser.account
        }
      };
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '注册失败！'
    };
  }
}

module.exports = {
  register,
}