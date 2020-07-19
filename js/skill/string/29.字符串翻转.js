function reverseStr(str = "") {
  return str.split("").reduceRight((t, v) => t + v);
}

const str = "reduce123";
console.log(reverseStr(str)); // "123recuder"