// 上传文件到腾讯云配置import
// import { get } from '@/utils'
import COS from 'cos-js-sdk-v5'
// const cosAccount = config.cosAccount

/**
 * 上传图片到腾讯云
 * @param companyId {string} 业务id用于文件夹区分可修改
 * @param cardId {string} 业务id用于文件夹区分可修改
 * @param folder {string} 文件名称
 * @param files {object} 2进制文件
 * @param fileType {string} 文件类型 image video
 * @param isMultiple {boolean} 是否多图上传,一个进度条
 * @param suffix {string} 后缀
 * @param progress {function} 上传过程中执行的方法
 * @returns {Promise<*>}
 */
export async function fileUpdateCro({
  folder = 'bm',
  files,
  fileType,
  isMultiple = false,
  oploadTotal,
  progress
}) {
  return new Promise((resolve, reject) => {
    const cos = new COS({
      getAuthorization: function(options, callback) {
        console.log(`options值为${JSON.stringify(options)}`)
        // 异步获取签名
        get(
            `https://download.aijiatui.com/api/Auth/signature?method=${options.Method ||
              'GET'}&pathname=${'/' + (options.Key || '')}`, {}, {
                withToken: false,
                ignoreCode: true
              }
          )
          .then(res => {
            const data = res.data
            callback(data.signature)
          })
          .catch(err=>{
            console.log(`err值为${JSON.stringify(err)}`)
          })
      }
    })
    // 初始化配置
    // const Bucket = cosAccount.bucket // 'resource-1255821078'
    // const Region = cosAccount.region // 'ap-guangzhou'
    const Bucket = 'resource-1255821078'
    const Region = 'ap-guangzhou'
    const datas = []
    let num = 0
    // 多图上传
    setTimeout((()=>{

    if (isMultiple) {
      const filesArr = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const name = createUniqueString()
        const key = `${folder}/${name}.${file.type.split('/')[1]}`
        filesArr.push({
          Bucket: Bucket,
          Region: Region,
          Key: key,
          Body: files[i],
          originName: files[i].name
        })
      }
      cos.uploadFiles(
        {
          files: filesArr,
          SliceSize: 1024 * 1024,
          onProgress: function(p) {
            progress &&
              progress({
                percent: +(p.percent * 100).toFixed(),
                speed: +(p.speed / 1024 / 1024).toFixed(2)
              })
            // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;')
          },
          onFileFinish: function(err, data, options) {
            // console.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
            if (err !== null) {
              reject(-1)
              return
            }
            num++
            datas.push(`https://resource.aijiatui.com/${options.Key}`)
            if (num === files.length) {
              resolve(datas)
            }
          }
        },
        function(err, data) {
          console.log(err || data)
        }
      )
    } else {
      // 分片上传
      console.log(files.length)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const name = createUniqueString()
        const key = `/${folder}/${name}.${file.type.split('/')[1]}`
        cos.sliceUploadFile(
          {
            Bucket: Bucket,
            Region: Region,
            Key: key,
            Body: file,
            onProgress: function(p) {
              // console.log(i, p)
              // 防止上传完毕多次回调
              if (p.speed) {
                progress &&
                  progress({
                    percent: +(p.percent * 100).toFixed(),
                    index: i + oploadTotal
                  })
              }
            }
          },
          function(err, data) {
            console.log(`err2值为${JSON.stringify(err)}`)
            if (err !== null) {
              reject(-1)
              return
            }
            num++
            data.Location =
              `https://resource.aijiatui.com${key}` +
              (fileType === 'video'
                ? `?size=${Math.round(file.size / 1024)}`
                : '')
            console.log(data.Location)
            datas.push(data.Location)
            if (num === files.length) {
              resolve(datas)
            }
          }
        )
      }
    }

  }),100)
  })
}

function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536, 10) + ''
  return (+(randomNum + timestamp)).toString(32)
}
