// 方法一
// function sortNumber(a, b) {
//   return a - b
// }
// const b = [1,2,3,7,5,6]
// const a = ["1.5", "1.5", "1.40", "1.25", "1.1000", "1.1"];

// console.log(a.sort(sortNumber));
// console.log(b.sort(sortNumber));

// 方法二
//假定字符串的每节数都在5位以下
//去除数组空值||空格
if (!Array.prototype.trim) {
  Array.prototype.trim = function () {
    let arr = []; this.forEach(function (e) {
      if (e.match(/\S+/)) arr.push(e);
    })
    return arr;
  }
}

//提取数字部分
function toNum(a) {
  let d = a.toString();
  let c = d.split(/\D/).trim();
  let num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
  for (let i = 0; i < c.length; i++) {
    let len = c[i].length;
    c[i] = r[len] + c[i];
  }
  let res = c.join('');
  return res;
}

//提取字符
function toChar(a) {
  let d = a.toString();
  let c = d.split(/\.|\d/).join('');
  return c;
}

function sortVersions(a, b) {

  let _a1 = toNum(a), _b1 = toNum(b);
  if (_a1 !== _b1) return _a1 - _b1;
  else {
    _a2 = toChar(a).charCodeAt(0).toString(16);
    _b2 = toChar(b).charCodeAt(0).toString(16);
    return _a2 - _b2;
  }
}

let arr1 = ["10", "5", "40", "25", "1000", "1"];
let arr2 = ["1.10", "1.5", "1.40", "1.25", "1.1000", "1.1"];
let arr3 = ["1.10c", "1.10b", "1.10C", "1.25", "1.1000", "1.10A"];
console.log(arr1.sort(sortVersions))
console.log(arr2.sort(sortVersions))
console.log(arr3.sort(sortVersions))