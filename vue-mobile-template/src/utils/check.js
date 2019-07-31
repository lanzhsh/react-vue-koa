const dateToFormat = (date) =>{
	date.toLocaleString("en-US", {
		hour12: false
	}).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
};
const forMatToDate = (date) =>{
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
const returnTimestamp = (strTime) => {
	let middleDate = new Date(Number(strTime));
	return middleDate.toLocaleString('zh-CN', {
		hour12: false
	}).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
};
const compareOneLessTwo = (dateOne, dateTwo) =>{
	return Number(dateOne.replace(/\-/g, "")) < Number(dateTwo.replace(/\-/g, ""))
};
const judgeArr = (arr) =>{
	if (Array.isArray(arr)) {
		return true
	}
};
const removeRepeatArr = (arr) =>{
	return Array.from(new Set(arr))
};
const orderAscendArr = (arr) =>{
	arr.sort((a, b) =>{
		return a - b
	})
};
const allArrSatisfact = (arr, compare, value) =>{
	return arr.every((arr) =>{
		return arr + compare + value
	})
};
const judgeNum = (num) =>{
	if (typeof num1 == 'number') {
		return true
	} else {
		return false
	}
};
const judgeNumOrLetter = (data) =>{
	let reg = /^[0-9a-zA-Z]*$/g;
	if (reg.test(data)) {
		return true
	}
};
const trimLeftOrRight = (str) =>{　　
	return str.replace(/(^s)|(s$)/g, "")
};
const isObjectEqual=(oneData, twoData) =>{
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
	compareOneLessTwo,
	judgeArr,
	removeRepeatArr,
	orderAscendArr,
	allArrSatisfact,
	judgeNum,
	judgeNumOrLetter,
	trimLeftOrRight,
	isObjectEqual
}