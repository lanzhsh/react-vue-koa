// import actions from '../actions'
import * as action from '../store/actionCreator'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
export default connect(
    // state => ({state}),
    state => ({
        state
    }),



    // dispatch => { 
    //     return bindActionCreators({
    //             action,
    //             dispatch
    //         })
         
    // }
    dispatch =>{
        return {
            ...action,
            dispatch
        }
    }

)
