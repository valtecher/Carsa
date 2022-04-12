export const LOGIN = '@users/LOGIN'
export const REGISTER = '@users/REGISTER'


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
