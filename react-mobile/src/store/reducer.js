import * as actionTypes from './actionTypes';
const initialState = {
    currentMusic: {},
    isPlay: false,
    isCurrentMusicChange: false,
    musicList: [],
    songMenuArray:[],
    tabActive: [false, true, false, false, false],
};
function isMusicExist(musicData,array) {
   return array.some((item)=>{
        return item.mid === musicData.mid;
    });
}
function isSongMenuExist(name,array){
    return array.some((item)=>{
        return item===name;
    });
}

export default function music(state = initialState, action) {
  const {currentMusic,musicList,songMenuArray} = state;
  const {type,payload} = action;
  switch (type) {
      case actionTypes.ADD_MUSIC:
          if (!isMusicExist(payload,musicList)) {
              musicList.unshift(payload)
              return Object.assign({}, state, {
                  musicList
              });
          } else {
              return state;
          }
      case actionTypes.CHANGE_CURRENT_MUSIC:
          return Object.assign({}, state, {
              currentMusic: payload,
              isCurrentMusicChange: true
          });
      case actionTypes.CHANGE_MUSIC_STATUS:
          return Object.assign({}, state, {
              isPlay: payload,
              isCurrentMusicChange: false
          });
      case actionTypes.ADD_AND_CHANGE_MUSIC:
          if (!isMusicExist(payload.data,musicList)) {
              musicList.unshift(payload.data)
          }
          return Object.assign({}, state, {
              musicList,
              currentMusic: payload.data,
              isCurrentMusicChange: true,
              isPlay: payload.isPlay
          });
      case actionTypes.PLAY_SPECIFIC_MUSIC_BY_MID:
          return Object.assign({}, state, {
              currentMusic: musicList.find((music)=>music.mid===payload),
              isCurrentMusicChange: true,
              isPlay: true
          });
      case actionTypes.CLEAR_MUSIC_LIST:
          return Object.assign({}, state, {
              currentMusic: {},
              isCurrentMusicChange: false,
              musicList: [],
              isPlay: false
          });
      case actionTypes.REMOVE_MUSIC_FROM_LIST:
          const newMusicList = musicList.filter((music)=>music.mid!==payload); 
          if (payload !== currentMusic.mid) {
              return Object.assign({}, state, {
                  isCurrentMusicChange: false,
                  musicList: newMusicList
              });
          } else {
              return Object.assign({}, state, {
                      isCurrentMusicChange: newMusicList.length>0?true:false,
                      isPlay:newMusicList.length>0?true:false,
                      currentMusic:musicList.length>0?newMusicList[0]:{},
                      musicList:newMusicList
                  });
          } 
      case actionTypes.ADD_SONG_LIST:
          if(!isSongMenuExist(payload,songMenuArray)){
              songMenuArray.unshift(payload);
              return Object.assign({},state,{
                  songMenuArray
              });
          }else{
              return state;
          }
      case actionTypes.REMOVE_SONG_LIST:
          let newSongMenuArray=songMenuArray.filter((item)=>{
              return !isSongMenuExist(item,payload);
          });
          return Object.assign({},state,{
              songMenuArray:newSongMenuArray
          });

      case actionTypes.TAB_INDEX:
          return Object.assign({}, state, {
            tabActive: payload,
          });
      default:
          return state;
  }
}