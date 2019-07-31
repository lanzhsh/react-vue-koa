import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover, Toast } from 'antd-mobile';
import './style.scss';
import Search from '@/components/Search';
class Header extends React.Component {
    state = {
        search: false
    }
    searchChange=()=>{ 
        const {search} = this.state;
        this.setState({
            search: !search
        });
    }
    render(){
        const {search} = this.state;
        const {className} = this.props;
        return (
            <div className={className}>
                <div className="qqmusic-header">
                    <div className="header-top">
                    <div className="top">
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/电脑"} replace>电脑</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/手机"} replace>手机</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/摄像机"} replace>摄像机</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/衣服"} replace>衣服</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/鞋子"} replace>鞋子</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/包包"} replace>包包</NavLink>
                        <NavLink className="qqmusic-tab" activeClassName="qqmusic-tab-active" to={"/shopType/电脑"} replace>美妆</NavLink>
                    </div>
                    </div>
                    <div className="bottom" onTouchStart={this.searchChange}>
                        <div className="search">
                            <i className="search-icon"></i>
                            <span className="text">搜索</span>
                        </div>
                    </div>
                </div>
                <Search search={search} searchChange={this.searchChange}></Search>
            </div>
        );
    }
}
export default Header;