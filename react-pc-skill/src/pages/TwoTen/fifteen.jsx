import React from "react";

class Item extends React.Component {
  render() {
    const list = this.props.children || [];
    return (
      <div className="item">
        {list.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.name}</h3>
              {// 当该节点还有children时，则递归调用本身
              item.children && item.children.length ? (
                <Item>{item.children}</Item>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default class Fifteen extends React.Component {
  render() {
    const list = [
      {
        name: "1",
        children: [
          {
            name: "1-1"
          },
          {
            name: "1-2",
            children: [
              {
                name: "1-2-1"
              }
            ]
          },
          {
            name: "1-3"
          }
        ]
      },
      {
        name: "2",
        children: [
          {
            name: "2-1"
          }
        ]
      }
    ];
    return <Item>{list}</Item>;
  }
}
