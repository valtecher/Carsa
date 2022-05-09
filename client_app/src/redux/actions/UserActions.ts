import { User } from "../../utils/models/User"

export const LOGOUT = '@users/LOGOUT';
export const SET_USER = '@users/SET_USER';
export const LOGIN_FAILED = '@users/LOGIN_FAILED'

export const setUser = (user:User) => {
  return {
    type: SET_USER, 
    user
  }
}

export const logoutUser = () => {
    return {
      type: LOGOUT,
    }
}

export const loginFailed = (error: string) => {
  return { 
      type: LOGIN_FAILED, 
      error
   }
}
