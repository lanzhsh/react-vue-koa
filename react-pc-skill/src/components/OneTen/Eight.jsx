import React from "react";

const Child=React.forwardRef((props,ref)=>(
  <input ref={ref} />
));

export default Child