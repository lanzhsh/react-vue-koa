import React from "react";
import Loadable from "react-loadable";
//通用的过场组件
const Loading = () => {
  return <div>loading</div>;
};

const LoadableComponent = Loadable({
  loader: () => import("../../components/TwoTen/Thirteen"),
  loading: Loading
});

export default class Thirteen extends React.Component {
  render() {
    return <LoadableComponent></LoadableComponent>;
  }
}
