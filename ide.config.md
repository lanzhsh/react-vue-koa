#### vscode 的 setting 配置
直接将 setting 对象复制到设置的 json 里面
```
{
 //  编辑器相关
    "window.zoomLevel": 1, //调整窗口的缩放级别。默认是 0
    "window.menuBarVisibility": "toggle", //菜单隐藏
    "workbench.activityBar.visible": true, //控制工作台中活动栏的可见性。
    "workbench.statusBar.visible": true, //控制工作台底部状态栏的可见性。
    "workbench.colorTheme": "Theme  Bear",
    "workbench.sideBar.location": "left",
  
  //  编写相关
    "editor.tabSize": 2,
    "explorer.confirmDelete": false,
    "sync.gist": "69f65fa26ee04d4a184a6b3c141f3c1c30f27489", //一个制表符等于的空格数。
    "editor.renderControlCharacters": true, //控制编辑器是否显示控制字符。
    "editor.renderWhitespace": "all", //控制编辑器在空白字符上显示符号的方式。
    "editor.formatOnType": true, //控制编辑器在键入一行后是否自动格式化该行。
    "editor.formatOnSave": true, //在保存时格式化文件。
    "editor.formatOnPaste": true, //控制编辑器是否应自动设置粘贴内容的格式。格式化程序必须可用并且能设置文档中某一范围的格式。
    "editor.snippetSuggestions": "top", //  控制代码片段是否与其他建议一起显示及其排列的位置。
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false, //定义函数参数括号前的空格处理方式。
  
    //  liveServer相关
    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.donotVerifyTags": true,
  
    //  fileheader相关
    "fileheader.Author": "Firmiana",
    "fileheader.LastModifiedBy": "Firmiana",
    //  "fileheader.tpl":  "/**\r\n  *  @Author:  {author}\r\n  *  @Date:  {createTime}\r\n  *  @Last  Modified  by:  {lastModifiedBy}\r\n  *  @Last  Modified  time:  {updateTime}\r\n  *  @Desc:  \r\n  */\r\n",
    "fileheader.tpl": "/**\r\n  *  @Author:  {author}\r\n  *  @Date:  {createTime}\r\n  *  @Desc:  \r\n  */\r\n",
  
    //  Prettier  Now
    "prettier.statusBar": true,
    "prettier.openOutput": true,
    "prettier.autoScroll": true,
    "prettier.jsonEnable": [
      //  "json"
    ],
    "prettier.cssEnable": ["css", "less", "scss", "postcss"],
    "prettier.singleQuote": true, //单引号
    "prettier.semi": false,
  
    //  vetur
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
  
    //路径识别
    "path-intellisense.extensionOnImport": true,
    "path-intellisense.mappings": {
      "@": "${workspaceRoot}/src",
      "@api": "${workspaceRoot}/src/api",
      "@assets": "${workspaceRoot}/src/assets",
      "@less": "${workspaceRoot}/src/assets/less",
      "@store": "${workspaceRoot}/src/store",
      "@tools": "${workspaceRoot}/src/tools",
      "@utils": "${workspaceRoot}/src/tools/utils/",
      "@components": "${workspaceRoot}/src/components",
      "@commons": "${workspaceRoot}/src/components/commons",
      "@views": "${workspaceRoot}/src/views"
    },
    "path-autocomplete.extensionOnImport": true,
    "path-autocomplete.includeExtension": true,
  
    //  以下为stylus配置
    //  "stylusSupremacy.insertColons":  false,  //  是否插入冒号
    //  "stylusSupremacy.insertSemicolons":  false,  //  是否插入分号
    //  "stylusSupremacy.insertBraces":  true,  //  是否插入大括号
    //  "stylusSupremacy.insertNewLineAroundImports":  false,  //  import之后是否换行
    //  "stylusSupremacy.insertNewLineAroundBlocks":  false,
  
    //  standard相关
    //  "standard.autoFixOnSave":  true,
  
  //  eslint相关
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
      "javascript",
      {
        "language": "vue",
        //  "language":  "react",
        "autoFix": true
      },
      "html",
      "vue"
      //  "react"
    ],
  //   "[javascript]": {
  //     "editor.defaultFormatter": " vscode.typescript-language-features"
  //   },
  //   "workbench.colorTheme": "Boxy Monokai"
  }
  ```
  #### vscode 插件
  1. Bracket Pair Colorizer 【指示箭头】
  2. Chinese (Simplified) Language Pack for Visual Studio Code
  3. Color Highlight 【颜色高亮】
  4. Dart 【Flutter 开发需要】
  5. Eslint
  6. Flutter
  7. GitLens — Git supercharged 【代码每一行提交记录】
  8. HTML CSS Support
  9. HTML Snippets
  10. Import Cost 【显示导入包的大小】
  11. JavaScript (ES6) code snippets
  12. Live Server 【服务器访问代码】
  13. Material Theme 【主题】
  14. Polacode 【代码导出为图片,博客神器】
  15. Prettier - Code formatter 【代码美化】
  16. Sass
  17. TsLint
  18. Vetur
  19. vscode-icons
  20. Vue 2 Snippets


#### Git Moji 提交
1. 修复 bug 'bug' :bug:
2. 代码优化 'art' :art:
3. 移除操作 'fire' :fire:
4. 觉得写得不错的提交 'sparkles' :sparkles:
5. UI 修改 'lipstick' :lipstick:
6. 修改配置 'wrench' :wrench:
7. 移动重命名文件 'truck' :truck:
8. 新代码或一般修改 'pencil' :pencil:






