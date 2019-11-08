import React from "react";

function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
  if (prevProps.val === nextProps.val) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(function twentyChild(props) {
  console.log("MemoSon rendered : " + Date.now());
  return <div>{props.val}</div>;
}, areEqual);