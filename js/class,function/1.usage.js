// 1.声明方法
let type = 3;
switch (type) {
  // 表达式
  case 1:
    const MyClass = class My {
      getClassName() {
        return My.name;
      }
    };

    // 声明式
    const MyClassTwo = class My {
      getClassName() {
        return My.name;
      }
    };
    break;

  case 3:
    // 3.constructor
    class Rectangle {
      // 构造函数
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
      get area() {
        return this.calcArea();
      }
      calcArea() {
        return this.height * this.width;
      }
    }

    const square = new Rectangle(10, 10);

    console.log(square.area); // 100
    break;

  case 4:
    // 4.static
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
      }
    }

    const p1 = new Point(5, 5);
    const p2 = new Point(10, 10);

    console.log(Point.distance(p1, p2)); // 7.0710678118654755

    class Animal {
      talk() {
        return this;
      }
      static drink() {
        return this;
      }
    }

    let obj = new Animal();
    obj.talk(); // Animal {}
    let talk = obj.talk;
    talk(); // undefined

    Animal.drink(); // class Animal
    let drink = Animal.drink;
    drink(); // undefined
    break;

  case 5:
    // 5.指向构造函数
    class PointTwo {
      // ...
    }

    typeof PointTwo; // "function"
    PointTwo === PointTwo.prototype.constructor; // true
    break;

  case 6:
    // 6.必须用 new 调用
    function Bar() {
      this.bar = 42;
    }
    const bar = Bar(); // 正常执行,也可以同 new 调用

    class Foo {
      constructor() {
        this.foo = 42;
      }
    }
    const foo = Foo(); // 报错
    break;

  case 7:
    // 7.内部methods 不可枚举
    // 引用一个未声明的变量
    function Bar() {
      this.bar = 42;
    }
    Bar.answer = function() {
      return 42;
    };
    Bar.prototype.print = function() {
      console.log(this.bar);
    };
    const barKeys = Object.keys(Bar); // ['answer']
    const barProtoKeys = Object.keys(Bar.prototype); // ['print']

    class FooTwo {
      constructor() {
        this.foo = 42;
      }
      static answer() {
        return 42;
      }
      print() {
        console.log(this.foo);
      }
    }
    const fooKeys = Object.keys(FooTwo); // []
    const fooProtoKeys = Object.keys(FooTwo.prototype); // []
    break;

  case 8:
    // 8.属性默认定义在类上
    //定义类
    class PointThree {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return "(" + this.x + ", " + this.y + ")";
      }
    }

    var pointThree = new PointThree(2, 3);

    pointThree.toString(); // (2, 3)

    pointThree.hasOwnProperty("x"); // true
    pointThree.hasOwnProperty("y"); // true
    pointThree.hasOwnProperty("toString"); // false
    pointThree.__proto__.hasOwnProperty("toString"); // true
    break;

  case 9:
    // 9.getter 和 setter
    class MyClassTour {
      constructor() {
        // ...
      }
      get prop() {
        return "getter";
      }
      set prop(value) {
        console.log("setter: " + value);
      }
    }

    let inst = new MyClassFour();

    inst.prop = 123;
    // setter: 123

    inst.prop;
    // 'getter'
    break;

  case 10:
    // 10.this 指向
    class My {
      printName(name = "there") {
        this.print(`Hello ${name}`);
      }

      print(text) {
        console.log(text);
      }
    }

    const my = new My();
    const { printName } = logger;
    printName(); //  报错,print未定义
    break;

  case 11:
    class Person {}

    class Child extends Person {
      constructor() {
        // 调用父类的构造函数
        // 返回子类 Child
        // 等同于Person.prototype.constructor.call(this)
        super();
      }
    }
    break;

  case 12:
    class PersonTwo {
      constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
      }
      intro() {
        return `${this.name},${this.birthday}`;
      }
    }
    class ChildTwo extends PersonTwo {
      constructor(name, birthday) {
        super(name, birthday);
      }
    }

    let child = new Child("xiaoming", "2020-1-25");
    console.log(child.intro()); //zhangsan,1988-04-01
    break;
  default:
    break;
}
