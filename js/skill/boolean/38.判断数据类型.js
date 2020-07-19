function dataTypeJudge(val, type) {
  const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, "$1").toLowerCase();
  return type ? dataType === type : dataType;
}
console.log(dataTypeJudge("young")); // "string"
console.log(dataTypeJudge(20190214)); // "number"
console.log(dataTypeJudge(true)); // "boolean"
console.log(dataTypeJudge([], "array")); // true
console.log(dataTypeJudge({}, "array")); // false