import { User } from "../../utils/models/User"
import { SET_USER, LOGOUT } from '../actions/UserActions'

interface userReducerInitialState{
  isAuthenticated: boolean, 
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
}

const initialState:userReducerInitialState = {
  isAuthenticated: false, 
  user: null, 
  accessToken: null, 
  refreshToken: null,
}

const userReducer = (state = initialState, action:any) => {
  switch(action.type){
    case LOGOUT: 
      return { ...state, user: null, isAuthenticated: false}
    case SET_USER: 
      return { ...state, user: action.user, isAuthenticated: true } 
    default: 
      return state
  }

}

export default userReducer