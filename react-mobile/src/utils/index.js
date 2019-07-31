export default  {
    //格式化数字位数
    "fix":function(num, length){
       return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },
    //根据秒转换成分:秒的形式
    "formatSeconds":function(seconds){
       var minute=Math.floor(seconds/60);
       var second=Math.round(seconds-minute*60);
       return this.fix(minute,2)+":"+this.fix(second,2);
    },
    //根据字符串解析时间
    "parseStrToSeconds":function(timeStr){
       timeStr=timeStr.replace(/\[|\]/,"");
       var timeArray=timeStr.split(":"); 
       return parseInt(timeArray[0])*60+parseFloat(timeArray[1]);
    },
    //解析歌词
    "parseLyric":function(text){
        var lyricList=text.split("\n");
        var timeReg=/\[[0-9]{2}:[0-9]*\.[0-9]*\]/;
        var array=[];
        for(var i=0;i<lyricList.length;i++){
            if(lyricList[i]!=""){
               var seconds=this.parseStrToSeconds(lyricList[i].match(timeReg)[0]);
               var text=lyricList[i].replace(timeReg,"");
               array.push( {
                   "seconds":seconds,
                   "text":text
               });
            }
        }
        return array;
    }
}