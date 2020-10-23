import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types'

const initUser = {
    currentUser: null
}
const user_reducer = (state=initUser,action)=>{
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user:user_reducer
})

export default rootReducer