import { User } from "../../utils/models/User"

export const LOGIN = '@users/LOGIN'
export const REGISTER = '@users/REGISTER'
export const SET_USER = '@users/SET_USER'

export const setUser = (user:User) => {
  return {
    type: SET_USER, 
    user
  }
}

export const login = (user:any) => {
  return{
    type: LOGIN,
    user
  }
}

export const register = (user:any) => {
  return{
    type: REGISTER,
    user
  }
}
