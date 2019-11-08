import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {
    render(){
        return (
            <Redirect from='/' to='/user' />
        )
    }
}