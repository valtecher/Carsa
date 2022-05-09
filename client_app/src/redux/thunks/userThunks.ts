import { FormState as RegisterForm } from "../../pages/Register/Register";
import { FormState as LoginForm } from "../../pages/Login/Login";
import { register, login, logout } from "../../utils/apis/UserApi"
import { User } from "../../utils/models/User";
import { loginFailed, logoutUser, setUser } from "../actions/UserActions";
import { Axios, AxiosResponse } from "axios";

export const registerUserThunk = (formFields:RegisterForm) => async (dispatch:any) => {
  const user:any = await register(formFields);
  const userToSave:User = {
    first_name: user.data.data.first_name, 
    last_name: user.data.data.last_name, 
    email: user.data.data.email, 
    password: user.data.data.password,
  }
  dispatch(setUser(userToSave))
}

export const loginUserThunk = (formFields:LoginForm) => async (dispatch:any) => {
  const user:AxiosResponse<User> | string = await login(formFields);
  if(typeof user === 'string' ){
    console.log('String is here');
    dispatch(loginFailed(user))
  } else { 
    dispatch(setUser(user.data))
    
  }
  
}

export const logoutUserThunk = () => async (dispatch:any) => {
  await logout();
  dispatch(logoutUser())
}

export const resetUserPasswordThunk = (formFields:LoginForm) => async (dispatch:any) => {

}
