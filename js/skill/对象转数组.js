Object.keys({ name: '张三', age: 14 }) //['name','age']
Object.values({ name: '张三', age: 14 }) //['张三',14]
Object.entries({ name: '张三', age: 14 }) //[[name,'张三'],[age,14]]
Object.fromEntries([name, '张三'], [age, 14]) //ES10的api,Chrome不支持 , firebox输出{name:'张三',age:14}