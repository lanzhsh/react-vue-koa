// 迭代器

// 初级版
function createIterator(items) {
  var i = 0
  return {
      next: function() {
          var done = (i >= items.length)
          var value = !done ? items[i++] : undefined
          
          return {
              done: done,
              value: value
          }
      }
  }
}

// 应用
const iterator = createIterator([1, 2, 3])
console.log(iterator.next())	// {value: 1, done: false}
console.log(iterator.next())	// {value: 2, done: false}
console.log(iterator.next())	// {value: 3, done: false}
console.log(iterator.next())	// {value: undefined, done: true}


Object.prototype[Symbol.iterator] = function () {
  var i = 0
  var items = Object.entries(this)
  return {
      next: function () {
          var done = (i >= items.length)
          var value = !done ? items[i++] : undefined
          
          return {
              done: done,
              value: value
          }
      }
  }
}

// 或者
// Object.prototype[Symbol.iterator] = function* () {
//   for (const key in this) {
//       if (this.hasOwnProperty(key)) {
//           yield [key, this[key]]
//       }
//   }
// }

const iteratorOne = createIterator([1, 2, 3])
console.log(...iteratorOne) //["next", ƒ]