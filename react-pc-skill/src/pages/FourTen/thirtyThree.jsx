import React from 'react'

const Header = () => {
  const heading = '头部组件'
  return(
      <div style={{backgroundColor:'orange'}}>
          <h1>{heading}</h1>
      </div>
  )
}

const footerStyle = {
  width: '100%',
  backgroundColor: 'green',
  padding: '50px',
  font: '30px',
  color: 'white',
  fontWeight: 'bold'
}

export const Footer = () => {
  return(
      <div style={footerStyle}>
          底部组件
      </div>
  )
}

export default class ThirtyThree extends React.Component{

    render(){
        return (
            <div>
              <Header></Header>
              <Footer></Footer>
            </div>
        )
    }
}