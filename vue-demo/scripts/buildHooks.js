/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 1.0
 * @Date: 2019-05-24 17:46:15
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-17 16:05:33
 * @Description: 打包hooks
 * @youWant: add you want info here
 */
const inquirer = require('inquirer')
const { Log, FileUtil } = require('./util')
const Backup = require('./backup')
// next operate value
const afterHooks = new Map([
  [0, () => {
    Log.logger('退出程序')
    process.exit(0)
  }],
  [1, () => {
    Log.logger('即将进行发布🎈')
    require('./deploy')
  }],
  [2, () => {
    Log.logger('开始本地预览💻')
    require('./server')
  }],
  [3, async () => {
    Log.logger('开始压缩zip文件👜')
    await FileUtil.zipDir()
  }],
  [4, async () => {
    Log.logger('开始备份Zip文件到本地📦')
    await Backup.doBackup()
  }]
])
// hooks before build/dev 
const beforeHooks = () => {
  
}
// hooks after build
const builtHooks = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: `检测到production环境打包完成，请选择下一步操作`,
      name: 'next',
      choices: [
        {
          name: '退出脚本',
          value: 0
        },
        {
          name: '发布到服务器',
          value: 1
        },
        {
          name: '本地预览',
          value: 2
        },
        {
          name: '生成Zip文件',
          value: 3
        },
        {
          name: '备份Zip文件到本地',
          value: 4
        }
      ]
    }
  ]).then(answers => {
    afterHooks.get(answers.next)()
  })
}

module.exports = builtHooks
