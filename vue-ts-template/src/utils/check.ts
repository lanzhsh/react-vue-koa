const dateToFormat = (date:any) =>{
	date.toLocaleString("en-US", {
		hour12: false
	}).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
};
const forMatToDate = (date:any) =>{
	let dateArr = date.split(':');
	return new Date(2017, 10, 19, dateArr[0], dateArr[1], dateArr[2])
};
const obtainNowDate =()=>{
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minu = date.getMinutes();
	let second = date.getSeconds();
	let arr = [month, day, hours, minu, second];
	arr.forEach(item =>{
		item < 10?"0"+ item : item
  }) 
  return year + '-' + arr[0] + '-' + arr[1] + ' ' + arr[2] + ':' + arr[3] + ':' + arr[4]
};
const returnTimestamp = (strTime:any) => {
	let middleDate = new Date(Number(strTime));
	return middleDate.toLocaleString('zh-CN', {
		hour12: false
	}).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
};
const judgeArr = (arr:any) =>{
	if (Array.isArray(arr)) {
		return true
	}
};
const removeRepeatArr = (arr:any) =>{
	return Array.from(new Set(arr))
};
const orderAscendArr = (arr:any) =>{
	arr.sort((a:any, b:any) =>{
		return a - b
	})
};
const allArrSatisfact = (arr:any, compare:any, value:any) =>{
	return arr.every((arr:any) =>{
		return arr + compare + value
	})
};
const judgeNum = (num1:any) =>{
	if (typeof num1 == 'number') {
		return true
	} else {
		return false
	}
};
const judgeNumOrLetter = (data:any) =>{
	let reg = /^[0-9a-zA-Z]*$/g;
	if (reg.test(data)) {
		return true
	}
};
const isObjectEqual=(oneData:any, twoData:any) =>{
	let twoFlag=JSON.stringify(oneData)===JSON.stringify(twoData);
	if(twoFlag){
		return true;
	}else{
		return false;
	}
}

export{
	dateToFormat,
	forMatToDate,
	obtainNowDate,
	returnTimestamp,
	judgeArr,
	removeRepeatArr,
	orderAscendArr,
	allArrSatisfact,
	judgeNum,
	judgeNumOrLetter,
	isObjectEqual
}