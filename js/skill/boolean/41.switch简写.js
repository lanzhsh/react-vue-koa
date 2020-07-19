switch (a) {
  case '张三':
    return 'age是12'
  case '李四':
    return 'age是120'
}

// 使用对象替换后
const obj = {
  '张三': 'age12',
  '李四': 'age120',
}
console.log(obj['张三'])