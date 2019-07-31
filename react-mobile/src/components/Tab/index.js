import React from "react"
import classnames from "classnames"
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as actions from '@/store/actions';

import "./style.scss";

@connect(
  (state)=>state.global,
  (dispatch)=>bindActionCreators(actions,dispatch)
)

class Tab extends React.Component {
  state = {
  }

  tabChange=(index)=>{
    const {tabSwitch} =this.props
    const tabActive=[false,false,false,false,false]
    tabActive[index]=true
    tabSwitch(tabActive)
  }

  componentDidMount(){
    //在该钩子获取redux改变的值
    const {tabActive}=this.props
  }

  render() {
    const {tabActive} = this.props;
    return (
      <div className="tabbar pos-f">{tabActive}
        <ul className="tabbar-list clearfix">
          <NavLink to="/home">
          <li
            onClick={this.tabChange.bind(this, 0)}
            className={classnames(tabActive[0] ? "active" : "")}
          >
            <span className="iconfont icon-home" />
            <p>首页</p>
          </li>
          </NavLink>
          <NavLink to="/classify">
          <li
            onClick={this.tabChange.bind(this, 1)}
            className={classnames(tabActive[1] ? "active" : "")}
          >
            <span className="iconfont icon-classifi" />
            <p>分类</p>
          </li>
          </NavLink>
          <NavLink to="/shop">
          <li
            onClick={this.tabChange.bind(this, 2)}
            className={classnames(tabActive[2] ? "active" : "")}
          >
            <span className="iconfont icon-product" />
            <p>商品</p>
          </li>
          </NavLink>
          <NavLink to="/shopCart">
          <li
            onClick={this.tabChange.bind(this, 3)}
            className={classnames(tabActive[3] ? "active" : "")}
          >
            <span className="iconfont icon-cartshop" />
            <p>购物车</p>
          </li>
          </NavLink>
          <NavLink to="/my">
          <li
            onClick={this.tabChange.bind(this, 4)}
            className={classnames(tabActive[4] ? "active" : "")}
          >
            <span className="iconfont icon-my" />
            <p>我的</p>
          </li>
          </NavLink>
        </ul>
      </div>
    );
  }
}

Tab.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Tab;
