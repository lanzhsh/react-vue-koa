const arrName = ['张三', '李四', '王五']
const arrAge=['20','30','40']
const arrDec = ['描述1', '描述2', '描述3']
const obj = arrName.map((item,index)=>{
  return { name: item, age: arrAge[index],dec:arrDec[index]}
})

console.log(obj) // [{ name: '张三', age: '20', dec: '描述1' },{ name: '李四', age: '30', dec: '描述2' },{ name: '王五', age: '40', dec: '描述3' }]