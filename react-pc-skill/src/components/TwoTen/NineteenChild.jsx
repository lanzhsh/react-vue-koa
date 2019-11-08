import ReactDOM from "react-dom";

class Dialog {
  constructor(name) {
    this.div = document.createElement("div");
    this.div.style.width = "200px";
    this.div.style.height = "200px";
    this.div.style.backgroundColor = "green";
    this.div.style.position = "absolute";
    this.div.style.top = "200px";
    this.div.style.left = "400px";
    this.div.id = "dialog-box";
  }
  show(children) {
    // 销毁
    const dom = document.querySelector("#dialog-box");
    if(!dom){ //兼容多次点击
      // 显示
      document.body.appendChild(this.div);
      ReactDOM.render(children, this.div);
    }
  }
  destroy() {
    // 销毁
    const dom = document.querySelector("#dialog-box");
    if(dom){//兼容多次点击
      ReactDOM.unmountComponentAtNode(this.div);
      dom.parentNode.removeChild(dom);
    }
  }
}
export default {
  show: function(children) {
    new Dialog().show(children);
  },
  hide: function() {
    new Dialog().destroy();
  }
};
