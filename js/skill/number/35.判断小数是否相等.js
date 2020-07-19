Number.EPSILON = (function () {   //解决兼容性问题
  return Number.EPSILON ? Number.EPSILON : Math.pow(2, -52);
})();
//上面是一个自调用函数，当JS文件刚加载到内存中，就会去判断并返回一个结果
function numbersequal(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
//接下来再判断   
const a = 0.1 + 0.2, b = 0.3;
console.log(numbersequal(a, b)); //这里就为true了