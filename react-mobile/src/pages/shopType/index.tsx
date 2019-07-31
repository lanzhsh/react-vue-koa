import * as React from 'react';
export interface IRouteParams {
  type: string;
}
class ShopCart extends React.Component<IRouteParams>{
  // constructor(props:any) {
  //   super(props);
    
  //   this.state = {
  //     type:props.match.params.type,
  //   }
  // }
  render() {
  const {type}=this.props
  return (
    <div>这是{type}</div>
  )
  } 
}

export default ShopCart;
