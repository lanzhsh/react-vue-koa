import React from "react";

export default class TwentyFive extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: "<span>这是渲染的 HTML 内容</span>" }}></div>
    );
  }
}
