/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: V2.0
 * @Date: 2019-06-03 17:35:48
 * @LastEditors: etongfu
 * @LastEditTime: 2019-08-26 19:49:37
 * @Description: 快速创建新模块/页面2.0 版本 基于问答模式的创建模块
 * 新建模块流程
 *  ==> 请输入模块所属目录名称(英文 如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)：
 *  ==> 系统没有找到目录的情况下创建目录
 *  ==> 找到目录的情况下输入输入模块名称(英文: )：
 *  ==> 根据目录和模块创建view/api/route文件
 *  ==> 创建完成
 * @youWant: add you want info here
 */
const inquirer = require('inquirer')
const path = require('path')
const { Log, FileUtil, LOCAL , ROOTPATH} = require('./util')
const { buildVueFile, buildRouteFile, buildApiFile, RouteHelper } = require('./template')
const EventEmitter = require('events')
// 任务列表
let buildTasks = []
// file options
const questions = [
  {
    type: 'input',
    name: 'folder',
    message: "请输入所属目录名称(英文，如果检测不到已输入目录将会默认新建，跳过此步骤将在Views文件夹下创建新模块)："
  },
  {
    type: 'input',
    name: 'module',
    message: "请输入模块名称（英文）",
    // 格式验证
    validate: str => ( str !== '' && /^[A-Za-z0-9_-]+$/.test(str))
  },
  // TODO: need test
  // 暂时有bug
  {
    type: 'confirm',
    message: `您是否需要新增和信息页面(我们将为你创建增加和详情页面)?`,
    name: 'buildExtra',
    when: function(answers) { 
      return !FileUtil.isPathInDir(answers.folder, ROOTPATH.viewsPath)
    }
  },
  // TODO: need test
  {
    type: 'confirm',
    message: `是否强制覆盖已存在同名文件夹(选否即退出当前创建)?`,
    name: 'cover',
    when: function(answers) { // 当folder为空且module名称已经存在的时候才会提问当前问题
      return (answers.folder == '' && FileUtil.isPathInDir(answers.module, ROOTPATH.viewsPath))
    }
  },
  {
    type: 'input',
    name: 'comment',
    message: "请输入模块描述(注释)："
  },
]
// local configs 
const configQuestion = [
  {
    type: 'input',
    name: 'AUTHOR',
    message: "请输入作者（推荐使用拼音或者英文）",
    // 格式验证
    validate: str => ( str !== '' && /^[\u4E00-\u9FA5A-Za-z]+$/.test(str)),
    when: () => !Boolean(process.env.AUTHOR)
  },
  {
    type: 'input',
    name: 'Email',
    message: "请输入联系方式（邮箱/电话/钉钉）"
  }
]
// Add config questions if local condfig does not exit
if (!LOCAL.hasEnvFile()) {
  questions.unshift(...configQuestion)
}
// 获取已经完成的答案
inquirer.prompt(questions).then(answers => {
  // 1: 日志打印
  Log.logger((answers.folder == '' ? '即将为您' : `即将为您在${answers.folder}文件夹下`) + `创建${answers.module}模块`)
  // 根据答案进行是否进行下一步操作
  if (answers.folder == '' && FileUtil.isPathInDir(answers.module, ROOTPATH.viewsPath) && !answers.cover) return process.exit(0)
  // 2: 配置文件的相关设置
  if (!LOCAL.hasEnvFile()) {
    LOCAL.buildEnvFile({
      AUTHOR: answers.AUTHOR,
      Email: answers.Email
    })
  }
  // 3: 进入文件和目录创建流程
  const {
    folder,    // 目录
    module,    // 模块
    comment,   // 注释
    buildExtra // 创建额外模块
  } = answers
  buildDirAndFiles(folder, module, comment, buildExtra)
})

/**
 * 执行任务 新增/详情
 * @param {*} folder 目录名称
 * @param {*} module 模块名称
 * @param {*} comment 注释
 */
const _runExtraTask = (folder, module, comment = "", page) => {
  // 创建视图文件
  generates.get("view")(folder, module, false, comment, page)
  // 这里我们使用 add/info 作为模块名称
  generates.get("router")(folder, module, false, comment, page)
}
// 事件处理中心
class RouteEmitter extends EventEmitter {}
// 为什么要用事件中心，因为路由的注入是异步的所以一定要使用任务池的方式进行处理，防止多个任务抢占同一个文件操作
const routeEmitter = new RouteEmitter() 
/**
 * 激活事件中心 也可以不用
 * @param {*} folder 
 * @param {*} module 
 * @param {*} comment 
 */
const initEvent = (folder, module, comment = "") => {
  routeEmitter.on('success', value => {
    // 创建成功后正确退出程序
    if (value) {
      if (buildTasks.length === 0) {
        Log.success(`已清空tasks`)
        // 操作成功
        process.exit(0)
      } else {
        Log.logger("执行task中任务")
        // 执行任务
        _runExtraTask(folder, module, comment, buildTasks[0])
        buildTasks.shift()
      }
    }
  })
  // 开始任务轮询
  routeEmitter.on('check-task', () => {
    Log.logger("开始检查task中任务")
    // 创建成功后正确退出程序
    if (buildTasks.length > 0 ) {
      _runExtraTask(folder, module, comment, buildTasks[0])
      buildTasks.shift()
    }
  })
}
// module-method map
// create module methods
let generates = new Map([
  // views部分
  // 2019年6月12日17:39:29 完成
  ['view', (folder, module, isNewDir , comment, filename="index") => {
    // 目录和文件的生成路径
    const folderPath = path.join(ROOTPATH.viewsPath,folder,module)
    const vuePath = path.join(folderPath, `/${filename}.vue`)
    // vue文件生成
    FileUtil.createDirAndFile(vuePath, buildVueFile(module, comment, filename), folderPath)
  }],
  // router is not need new folder
  ['router', (folder, module, isNewDir, comment, filename="index") => {
    /**
     * @des 路由文件和其他的文件生成都不一样， 如果是新的目录那么生成新的文件。
     * 但是如果module所在的folder 已经存在了那么就对路由文件进行注入。
     * @reason 因为我们当前项目的目录分层结构是按照大模块来划分， 即src下一个文件夹对应一个router/modules中的一个文件夹
     * 这样做使得我们的目录结构和模块划分都更加的清晰。
     */
    if (isNewDir) {
      // 如果folder不存在 那么直接使用module命名 folder不存在的情况是直接在src根目录下创建模块
      const routerPath = path.join(ROOTPATH.routerPath, `/${folder || module}.js`)
      FileUtil.createDirAndFile(routerPath, buildRouteFile(folder, module, comment))
    } else {
      // 新建路由helper 进行路由注入
      const route = new RouteHelper(folder, module, routeEmitter, filename)
      route.injectRoute()
    }
  }],
  ['api', (folder, module, isNewDir, comment) => {
    // inner module will not add new folder
    // 如果当前的模块已经存在的话那么就在当前模块的文件夹下生成对应的模块js
    const targetFile = isNewDir ? `/index.js` : `/${module}.js`
    // 存在上级目录就使用上级目录  不存在上级目录的话就是使用当前模块的名称进行创建
    const filePath = path.join(ROOTPATH.apiPath, folder || module)
    const apiPath = path.join(filePath, targetFile)
    FileUtil.createDirAndFile(apiPath, buildApiFile(comment), filePath)
  }]
])
/**
 * 通过我们询问的答案来创建文件/文件夹
 * @param {*String} folder 目录名称
 * @param {*String} module 模块名称
 * @param {*String} comment 注释
 * @param {*Boolean} buildExtra 生成额外模块
 */
function buildDirAndFiles (folder, module, comment, buildExtra) {
  let _tempFloder = folder || module // 临时文件夹 如果目录名称未输入， 那么选择模块名称作为顶层路径
  let isNewDir
  // 如果没有这个目录那么就新建这个目录
  if (!FileUtil.isPathInDir(_tempFloder, ROOTPATH.viewsPath)) {
    rootDirPath = path.join(ROOTPATH.viewsPath, _tempFloder)
    // create dir for path
    FileUtil.createDir(rootDirPath)
    Log.success(`已创建${folder ? '目录' : "模块"}${_tempFloder}`)
    isNewDir = true
  } else {
    isNewDir = false
  }
  // 核心模块生成后生成额外页面
  // TODO: 在生成单一模块的时候还有文件处理权限的bug没有解决，所以这种个情况下暂时不能创建额外页面
  if (buildExtra) {
    // push task
    buildTasks = ["add", "info"]
  }
  // 初始化事件中心
  initEvent(folder,module,comment)
  // 生成核心模块
  let _arrays = [...generates]
  _arrays.forEach((el, i) => {
    el[1](folder, module, isNewDir, comment)
    if (i === _arrays.length -1) {
      Log.success("核心模块创建成功!")
      // 创建完毕
      routeEmitter.emit('check-task')
    }
  })
}
