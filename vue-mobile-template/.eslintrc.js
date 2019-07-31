module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "space-before-function-paren": 0,  // 函数定义时括号前面要不要有空格
    "eol-last": 0,  // 文件以单一的换行符结束
    "eqeqeq": 0, // 必须使用全等
    "one-var": 0, // 连续声明
    "no-undef": 0, // 可以 有未定义的变量

    // 警告
    "no-extra-semi": 1, // 可以多余的冒号
    "semi": 1,  // 语句可以不需要分号结尾
    "no-extra-boolean-cast": 1, // 不必要的bool转换
    "no-extra-parens": 1, // 非必要的括号
    "no-empty": 1, // 块语句中的内容不能为空
    // vue
    // "flow-vars/define-flow-type": 1,
    // "flow-vars/use-flow-type": 1,

    "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
    "no-const-assign": 2,// 禁止修改const声明的变量
    "eqeqeq": 2,//必须使用全等
    "no-lone-blocks": 2, // 禁止不必要的嵌套块
  }
}
