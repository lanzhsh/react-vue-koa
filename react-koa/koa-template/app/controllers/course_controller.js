const uuidv1 = require('uuid/v1');
const Course_col = require('./../models/course');
const User_col = require('./../models/user');
const formatDate = require('./../utils/formatDate');

// 获取所有课程
const getCourse = async (ctx, next) => {
  const req = ctx.request.body;
  //判断是否是空对象
  const search =Object.keys(req).length?{id:req.id}:{};
  const courses = await Course_col.find(search);

  if (courses) {
    ctx.status = 200;
    ctx.body = {
      code: 1,
      data: courses
    }

  } else {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '参数错误！'
    }
  }
}

// 发布课程
const publishCourse = async (ctx, next) => {
  const uuid = uuidv1();
  let req = ctx.request.body;
  ctx.status = 200;
  if (!req.name || !req.price || !req.number) {
    ctx.body = {
      code: 0,
      msg: '缺少必要参数！'
    }
    return;
  }

  req.id = uuid;
  const result = await Course_col.create(req);

  if (result) {
    ctx.body = {
      code: 1,
      msg: '发布成功！'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '发布失败！'
    }
  }
}

// 更新课程
const updateCourse = async (ctx, next) => {
  let req = ctx.request.body;
  ctx.status = 200;
  // 获取课程的id
  const result = await Course_col.updateOne({
    id: req.id
  }, req);

  ctx.status = 200;
  if (result.nModified ===1) {
    ctx.body = {
      code: 1,
      msg: '修改成功!'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '修改失败!'
    }
  }
}

// 删除课程
const deleteCourse = async (ctx, next) => {
  let req = ctx.request.body;
  ctx.status = 200;

  // 获取用户的 userId
  const result = await Course_col.remove({
    id: req.id
  });

  ctx.status = 200;
  if (result.deletedCount) {
    ctx.body = {
      code: 1,
      msg: '删除成功!'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败!'
    }
  }
}

module.exports = {
  getCourse,
  publishCourse,
  updateCourse,
  deleteCourse,
}