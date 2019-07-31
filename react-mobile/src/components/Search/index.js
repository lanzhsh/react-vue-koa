import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import { Toast } from 'antd-mobile';
import * as actions from '@/store/actions';
import { API } from '@/api';



import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class Search extends React.Component {
    state = {
        recordList: [],
        songList: [],
        pageNo: 1,
        totalCount: 0,
        isCanGet: true,
        isSearch: true,
        isRemindDivShow:true
    }
    comeback=()=>{
        document.getElementsByClassName('input-text')[0].value = '';
        this.setState({
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isRemindDivShow:true
        });
        this.props.searchChange.bind(this)();
    }
    //监听键盘事件
    keyboardListener=(event)=>{
        if (event.keyCode === 13) {
            this.setState({
                isRemindDivShow:false
            });
            this.addSearchRecord(document.getElementsByClassName('input-text')[0].value);
            this.getSearhListAjax();
        }
    }
    //搜索数据
    getSearhListAjax=(event)=>{
        const {isSearch,pageNo,isCanGet,songList} = this.state;
        this.setState({
            isRemindDivShow:false
        });
        this.addSearchRecord(document.getElementsByClassName('input-text')[0].value);
        let searchText = document.getElementsByClassName('input-text')[0].value;
        let offset = pageNo * 20;
        if (isCanGet) {
            this.setState({
                isCanGet: false,
            });
            if (isSearch) {
                this.setState({
                    songList: []
                });
            }
            API.queryMusic({
                nu:offset,
                id:searchText
            }).then((response)=>{
                const {Code,Body,songnum} = response;
                if(Code==='OK'){
                    this.setState({
                        isCanGet: true,
                        totalCount: songnum,
                        songList: isSearch ? Body : songList.concat(Body),
                        isSearch: true
                    }); 
                }else{
                    Toast.fail('查询失败');
                }
               
            })
        }
    }
    //下拉加载
    getMoreSearchList=(event)=>{
        const {totalCount,songList,isCanGet,pageNo} = this.state;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        if (scrollHeight - scrollTop - clientHeight < 10) {
            if (totalCount > songList.length) {
                if (isCanGet) {
                    this.setState({
                        pageNo: pageNo + 1,
                        isSearch: false
                    }, function () {
                        this.getSearhListAjax();
                    });
                }
            }
        }
    }
    clearInput=()=>{
        document.getElementsByClassName('input-text')[0].value = '';
        this.setState({
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isRemindDivShow:true
        });
    }
    //快捷搜索
    fastSearch(searchText){
        document.getElementsByClassName('input-text')[0].value = searchText;
        this.setState({
            isRemindDivShow:false
        });
        this.addSearchRecord(searchText);
        this.getSearhListAjax();
    }
    //添加搜索记录
    addSearchRecord(recordStr) {
        const {recordList} = this.state;       
        const isCanAdd = !recordList.some((item) => {
            return item === recordStr;
        });
        if (isCanAdd&&recordStr!=='') { 
            recordList.unshift(recordStr);
        }
        this.setState({
            recordList:[].concat(recordList)
        });
        localStorage["yqq_search_history"] = recordList.join(",");
    }
    //移除记录
    removeRecord(record) {
        const {recordList} = this.state;
        const newRecordList = recordList.filter((item) => {
            return record !== item;
        });
        this.setState({
            recordList:newRecordList
        });
        localStorage["yqq_search_history"] = newRecordListv.join(",");        
    }
    //清楚历史记录
    clearRecord=()=>{
        localStorage["yqq_search_history"]="";
        this.setState({
            recordList:[]
        });
    }
    //往播放列表中添加音乐
    addMusic(musicItem) {
        const {addAndChangeMusic} = this.props;
        addAndChangeMusic(musicItem,true);
        this.comeback();
    }
    componentDidMount() {
        if (localStorage["yqq_search_history"]) {
            this.setState({
                recordList: localStorage["yqq_search_history"].split(",")
            });
        }

    }
    render() {
        const {songList,isCanGet,recordList,isRemindDivShow} = this.state;
        const {search} = this.props;
        const searchTextList=["邓紫棋","全孝盛","张靓颖","周杰伦","薛之谦","林俊杰"]
        return (
            <div className={classnames('qqmusic-search-wrapper',search ? 'show' :'')} >
                <div className="qqmusic-search-top">
                    <img ref='inputText' className="icon-arrow-left" src={require("@/assets/icon-arrow-left.png")} onClick={this.comeback} />
                    <input className="input-text" type="text" placeholder="支持音乐搜索" onKeyUp={this.keyboardListener} />
                    <span className="icon-input-clear" onClick={this.clearInput}></span>
                    <span className="btn-search" onClick={this.getSearhListAjax}>搜索</span>
                </div>
                <div className="qqmusic-search-bottom" onScroll={this.getMoreSearchList}>
                    <div className="remind-mask" style={{display:isRemindDivShow?'block':'none'}}>
                        <div className="search-text-list-wrapper">
                            <h4 className="title-hot-search">热门搜索</h4>
                            <ul className="search-text-list">
                                {
                                    searchTextList.map((item,index)=>{
                                        return (
                                            <li className="search-text-item" onClick={this.fastSearch.bind(this,item)} key={index}>{item}</li>                                            
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <h4 style={{display:recordList.length>0?'block':'none'}} className="title-search-history border-bottom">搜索历史<span className="cleanRecord" onClick={this.clearRecord}>清空历史</span></h4>
                        <ul className="record-list">
                            {
                                recordList.map((item,index) => {
                                    return (
                                        <li className="record-item border-bottom" key={index}>
                                            <span className="icon-recent"></span>
                                            <p onClick={this.fastSearch.bind(this,item)}>{item}</p>
                                            <span className="icon-close" onClick={this.removeRecord.bind(this, item)}></span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <ul className="qqmusic-search-list">
                        {
                            songList.map((item, index) => {
                                return (
                                    <li className="qqmusic-search-list-item border-bottom" key={index} onClick={this.addMusic.bind(this, item)}>
                                        <div className="left">
                                            <h4 className="title">{item.title}</h4>
                                            <p className="singer">{item.author}</p>
                                            <p className="intro">{item.album}</p>
                                        </div>
                                        <div className="right">
                                            <img className="cover" alt={item.album} src={item.pic}/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        <li className="hint" style={isCanGet ? { display: 'none' } : {}}>正在加载更多...</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Search;