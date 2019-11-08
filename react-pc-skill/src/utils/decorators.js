function testable(target) {
  console.log(target)
  target.isTestable = true;
  target.prototype.getDate = ()=>{
    console.log( new Date() )
  }
}

export default testable