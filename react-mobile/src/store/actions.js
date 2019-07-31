import * as actionTypes from './actionTypes';
//添加音乐
export const addMusic=(data,callback)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.ADD_MUSIC,
    payload:data
  });
  callback();
}
//播放或暂停音乐
export const changePlayStatus=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.CHANGE_MUSIC_STATUS,
    payload:data
  });
}
//更改音乐
export const changeCurrentMusic=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.CHANGE_CURRENT_MUSIC,
    payload:data
  });
}
//添加并更改当前音乐
export const addAndChangeMusic=(data,isPlay)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.ADD_AND_CHANGE_MUSIC,
    payload:{
      data,
      isPlay
    }
  });
}
//播放指定音乐
export const playSpecificMusicByMid=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.PLAY_SPECIFIC_MUSIC_BY_MID,
    payload:data
  });
}
//清除播放列表
export const clearMusicList=()=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.CLEAR_MUSIC_LIST
  });
}
//将音乐从播放列表中移除
export const removeMusicFromList=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.REMOVE_MUSIC_FROM_LIST,
    payload:data
  });
}
//添加歌单
export const addSongMenu=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.ADD_SONG_LIST,
    payload:data
  });
}
//删除歌单
export const removeSongMenu=(data)=> async (dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.REMOVE_SONG_LIST,
    payload:data
  });
}
//切换tab
export const tabSwitch=(data)=>async(dispatch,getState,{API})=>{
  dispatch({
    type: actionTypes.TAB_INDEX,
    payload:data
  });
}