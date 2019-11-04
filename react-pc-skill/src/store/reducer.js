import { AUTH_CHANGE, PERMISSION_CHANGE,CURRENT_CHANGE } from './actionTypes'
import { handleActions } from 'redux-actions'
import One from "../pages/OneTen/one";
const defaultState = {
    authed: false,
    permissionList:[
        {
            path: '/user/oneTen/one',
            pathName:'oneTen',
            name:'1到10',
            component:One,
            icon:'pie-chart'
        }
    ],
    currentList:[],
    avatar:'',
    name:''
};

export const statusReducer = handleActions( 
    {
        [AUTH_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.authed = action.payload.authStatus
            if(newState.authed !== null){
                localStorage.setItem('authed',newState.authed)
            }else{
                newState.permissionList = [
                    {
                        path: '/user/oneTen/one',
                        pathName:'oneTen',
                        name:'1到10',
                        component:One,
                        icon:'pie-chart'
                    }
                ]
                localStorage.removeItem('authed')
            }
            
            return newState;
        },
        [PERMISSION_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.permissionList = action.payload.permissionList
            newState.currentList = action.payload.currentList
            newState.avatar = action.payload.avatar
            newState.name = action.payload.name
            return newState;
        },
        [CURRENT_CHANGE]:(state, action)=> {
            const newState = JSON.parse(JSON.stringify(state))
            newState.currentList = action.payload.currentList
            return newState;
        }

    },defaultState)

export default statusReducer

// export default (state = defaultState, action) => {
//     if(action.type === AUTH_CHANGE){
//         const newState = JSON.parse(JSON.stringify(state))
//         newState.authed = action.authStatus
//         return newState;
//     }

//     return state;
// };
