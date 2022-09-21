import { User } from "../../utils/models/User"
import { SET_USER, LOGOUT, LOGIN_FAILED } from '../actions/UserActions'

interface userReducerInitialState{
  isAuthenticated: boolean, 
  user: User | null,
  error: string | null,
}

const initialState:userReducerInitialState = {
  isAuthenticated: false, 
  user: null, 
  error: null, 
}

const userReducer = (state = initialState, action:any) => {
  switch(action.type){
    case LOGOUT: 
      return { ...state, user: null, isAuthenticated: false, error: null}
    case SET_USER: 
      return { ...state, user: action.user, isAuthenticated: true, error: null} 
    case LOGIN_FAILED: 
      return {...state, error: action.error, isAuthenticated: false}
    default: 
      return state
  }

}

export default userReducer