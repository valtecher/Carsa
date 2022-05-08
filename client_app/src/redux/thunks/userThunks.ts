import { FormState as RegisterForm } from "../../pages/Register/Register";
import { FormState as LoginForm } from "../../pages/Login/Login";
import { register, login, logout } from "../../utils/apis/UserApi"
import { User } from "../../utils/models/User";
import { logoutUser, setUser } from "../actions/UserActions";

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
  const user:any = await login(formFields);
  dispatch(setUser(user.data))
}

export const logoutUserThunk = () => async (dispatch:any) => {
  await logout();
  dispatch(logoutUser())
}

export const resetUserPasswordThunk = (formFields:LoginForm) => async (dispatch:any) => {

}
