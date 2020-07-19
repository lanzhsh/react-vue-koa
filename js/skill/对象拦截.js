// let obj = { name: '', age: '', sex: '' },
//   defaultName = ["这是姓名默认值1", "这是年龄默认值1", "这是性别默认值1"];
// Object.keys(obj).forEach(key => {
//   Object.defineProperty(obj, key, {
//     get() {
//       return defaultName;
//     },
//     set(value) {
//       defaultName = value;
//     }
//   });
// });

// console.log(obj.name); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
// console.log(obj.age); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
// console.log(obj.sex); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
// obj.name = "这是改变值1";
// console.log(obj.name); // 这是改变值1
// console.log(obj.age);  // 这是改变值1
// console.log(obj.sex); // 这是改变值1

// let objOne = {}, defaultNameOne = "这是默认值2";
// Object.defineProperty(obj, 'name', {
//   get() {
//     return defaultNameOne;
//   },
//   set(value) {
//     defaultNameOne = value;
//   }
// });
// console.log(objOne.name); // undefined
// objOne.name = "这是改变值2";
// console.log(objOne.name); // 这是改变值2

let obj = { name: '', age: '', sex: '' }
let handler = {
  get(target, key, receiver) {
    console.log("get", key); 
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value); // set name 李四  // set age 24
    return Reflect.set(target, key, value, receiver);
  }
};
let proxy = new Proxy(obj, handler);
proxy.name = "李四";
proxy.age = 24;