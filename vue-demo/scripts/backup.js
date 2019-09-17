/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-07-04 15:12:13
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-18 09:57:57
 * @Description: 本地Dist文件备份
 * @youWant: add you want info here
 */
const path = require('path')
const { FileUtil, StringUtil, DateUtil, ROOTPATH, Log, Notify } = require('./util')

class Backup {
  /**
   * @author: etongfu
   * @description: 清空所有备份
   */
  static clearBackups () {
    const backupsDir = path.resolve(__dirname, '../backups')
    FileUtil.clearDir(backupsDir)
  }
  /**
   * @author: etongfu
   * @description: 执行备份
   * @param {type}  {*}
   * @returns:  {*}
   */
  static async doBackup () {
    try {
      // 文件名是当前日期 精确到秒
      let date = StringUtil.trim(DateUtil.getCurrentDate("YYYY-MM-DD hh:mm:ss"), 1)
      date = StringUtil.replaceAll(date,"-", "")
      date = StringUtil.replaceAll(date,":", "")
      let targetPath = path.resolve(__dirname, `../backups/${date}.backup.zip`)
      if(FileUtil.fileExist(targetPath)) {
        return Log.warning(`${targetPath}已存在，已放弃备份`)
      }
      // Zip File
      await FileUtil.zipDir(ROOTPATH.distDir, targetPath)
      Log.success(`本地备份完成, 文件：${targetPath}`)
      Notify.showNotify("本地备份", `本次备份完成, 文件地址：${targetPath}`)
    } catch (error) {
      Log.error(`备份文件失败：${error}`)
    }
  }
}
module.exports = Backup