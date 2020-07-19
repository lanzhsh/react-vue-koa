const flag = true;
const obj = {
  a: 0,
  [flag ? "c" : "d"]: 2
};
// obj => { a: 0, c: 2 }