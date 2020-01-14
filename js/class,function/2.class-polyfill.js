// ES5
"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  //// subClass.prototype.__proto__ = superClass.prototype保证了c instanceof Parent是true,Child的实例可以访问到父类的属性，包括内部属性，以及原型属性。其次，subClass.__proto__ = superClass，保证了Child.height也能访问到，也就是静态方法
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = (function() {
  function Parent(name, age) {
    _classCallCheck(this, Parent);

    this.name = name;
    this.age = age;
  }

  _createClass(Parent, [
    {
      key: "speakSomething",
      value: function speakSomething() {
        console.log("I can speek chinese");
      }
    }
  ]);

  return Parent;
})();

Parent.height = 12;

Parent.prototype.color = "yellow";

//定义子类，继承父类

var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name, age)
    );
  }

  _createClass(Child, [
    {
      key: "coding",
      value: function coding() {
        console.log("I can code JS");
      }
    }
  ]);

  return Child;
})(Parent);

Child.width = 18;

var c = new Child("job", 30);
c.coding();

// ES6

class Parent {
  static height = 12;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speakSomething() {
    console.log("I can speek chinese");
  }
}
Parent.prototype.color = "yellow";

//定义子类，继承父类
class Child extends Parent {
  static width = 18;
  constructor(name, age) {
    super(name, age);
  }
  coding() {
    console.log("I can code JS");
  }
}

var c = new Child("job", 30);
c.coding();
