
import Qs from 'qs'
export default {
  //获取音乐播放链接
  getMusicUrl:{
    method:'get',
    url:'https://api.mlwei.com/music/api/?key=523077333&cache=0&type=song'
  },
  //获取音乐歌词
  getMusicLyric:{
    method:'get',
    url:'https://api.mlwei.com/music/api/?key=523077333&cache=0&type=lrc'
  },
  //查询音乐
  queryMusic:{
    method:'get',
    url:'https://api.mlwei.com/music/api/?key=523077333&cache=0&type=so'
  }
}