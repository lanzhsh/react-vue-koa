import { Message } from 'element-ui';
import {TenBUCKET,TenUrl} from './config/cloud';
import $ from 'jquery';
import COS from 'cos-js-sdk-v5';
import md5 from 'blueimp-md5';
import request from '@/utils/request';
var validate = function (file, type_v) {

  if (!type_v)
    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
  else
    var testmsg = file.type.substring(file.type.lastIndexOf('/') + 1)
  const extension = testmsg.toLowerCase() === 'png';
  const extension2 = testmsg.toLowerCase() === 'jpg';
  const extension3 = testmsg.toLowerCase() === 'jpeg';
  const extension4 = testmsg.toLowerCase() === 'gif';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!extension && !extension2 && !extension3 && !extension4) {
    Message({
      message: '上传文件只能是 png、jpg、jpeg、gif格式!',
      type: 'warning'
    });
  }
  if (!isLt2M) {
    Message({
      message: '上传文件大小不能超过 2MB!',
      type: 'warning'
    });
    return false;
  }
  return extension || extension2 || extension3 || extension4 && isLt2M
}

var readFile = function (files) {
  //读取图片数据  
  var f = files[0], isRight = true;
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    //加载图片获取图片真实宽度和高度  
    var image = new Image();
    image.onload = function () {
      var width = image.width;
      var height = image.height;
      if (height > 9999 || width > 9999) {
        isRight = false;
      }
    };
    image.src = data;
  };
  reader.readAsDataURL(f);
  return isRight;

}

// folder = 'cover/';
var addZero = function (val) {
  if (val <= 9) {
    return '0' + val;
  } else {
    return val;
  }
}

//配置腾讯云上传url
let URL = 'https://download.aijiatui.com',
    Bucket=TenBUCKET,
    lecturerId=sessionStorage.getItem('lecturerId'),
    Region = 'ap-guangzhou';
/**
 * 文件上传
 * @param files 获取到的文件列表
 * @param callback
 * @param type 1视频 2图片
 */
let client
var fileUpdate = function (folder, files, callback, progress, id, isreload) {
  // console.log(files);
  //folder将上lecturer
  folder=`${lecturerId}/${folder}`
  // var extension = validate(files[0]);

  // if (!extension) {
  //   callback && callback();
  //   return;
  // };

  // if (!readFile(files)) {
  //   Message({
  //     message: '图片宽高均不超过9999Px,宽高比不超过1:25!',
  //     type: 'warning'
  //   });
  //   callback && callback();
  //   return;
  // };
  var cos = new COS({
    getAuthorization: function (options, callback) {
      // 异步获取签名
      $.get(URL + '/api/Auth/signature', {
        method: (options.Method || 'get').toLowerCase(),
        pathname: '/' + (options.Key || '')
      }, function (authorization) {
        var obj = JSON.parse(authorization);
        callback(obj.signature);
      }, 'text');

      // request({
      //   url:`${URL}/api/Auth/signature`,
      //   method:(options.Method || 'get').toLowerCase(),
      // }).then(authorization=>{
      //   var obj = JSON.parse(authorization);
      //   callback(obj.signature);
      // })
    }
  })
  var testmsg = files[0].name.substring(files[0].name.lastIndexOf('.') + 1)

  var date = new Date();
  var name = parseInt(Math.random() * 1000000) + '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) + date.getTime() + files[0].name;
  // folder = 'cover/';
  console.log(files);
  console.log('folder + name值为',folder + name);
  name = md5(name) + '.' + testmsg;
  // 分片上传文件
  cos.sliceUploadFile({
    Bucket: Bucket,
    Region: Region,
    Key: `folder + name`,
    Body: files[0],
  }, function (err, data) {
    var res = [{
      pic_url: ""
    }];

    console.log('data值为',data);
    if (data.Location && data.statusCode == 200) {
      data.Location = `${TenUrl}/${folder + name}`
      res[0].pic_url = data.Location;
      callback && callback(res)
    }
  });
}


var fileUpdateCro = function (folder, files, callback, progress, id, isreload) {
  //folder将上lecturer
  folder=`${lecturerId}/${folder}`

  var cos = new COS({
    getAuthorization: function (options, callback) {
      // 异步获取签名
      console.log(options);
      $.get(URL + '/api/Auth/signature', {
        method: (options.Method || 'get').toLowerCase(),
        pathname: '/' + (options.Key || '')
      }, function (authorization) {
        var obj = JSON.parse(authorization);
        callback(obj.signature);
      }, 'text');

      // request({
      //   url:`${URL}/api/Auth/signature`,
      //   method:(options.Method || 'get').toLowerCase(),
      // }).then(authorization=>{
      //   var obj = JSON.parse(authorization);
      //   callback(obj.signature);
      // })
    }
  })
  // 文件名
  console.log('folder + name值为',folder + name);
  console.log('blob值为',files.blob);
  var date = new Date();
  var name = parseInt(Math.random() * 1000000) + '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) + date.getTime() + '.' + files.blob.type.split('/')[1];
  name = md5(name) + '.' + files.blob.type.split('/')[1];
  // 分片上传文件
  cos.sliceUploadFile({
    Bucket: Bucket,
    Region: Region,
    Key: folder + name,
    Body: files.blob,
  }, function (err, data) {
    console.log('上传的data值为',data);
    var res = '';
    if (data.Location && data.statusCode == 200) {
      data.Location = `${TenUrl}/${folder + name}`
      res = data.Location;
      callback && callback(res)
    }
  });
}

export {
  fileUpdate,
  fileUpdateCro
}


