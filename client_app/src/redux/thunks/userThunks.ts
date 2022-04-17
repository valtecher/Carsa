import { FormState } from "../../pages/Register/Register";
import { register } from "../../utils/apis/UserApi"
import { User } from "../../utils/models/User";
import { setUser } from "../actions/UserActions";


export const registerUserThunk = (formFields:FormState) => async (dispatch:any) => {
  const user:any = await register(formFields);
  console.log('inside thunk', user);
  const userToSave:User = {
    name: user.data.data.first_name, 
    lastName: user.data.data.last_name, 
    email: user.data.data.email, 
  }
  localStorage.setItem('user', JSON.stringify({...userToSave, accessToken: 'wiuretywywyeuqweq213123', refreshToken: 'y9813u931he1ib2uih132i12'}) )
  dispatch(setUser(userToSave))
}

export const loginUserThunk = (formFields:FormState) => async (dispatch:any) => {

}

export const logoutUserThunk = (formFields:FormState) => async (dispatch:any) => {

}

export const resetUserPasswordThunk = (formFields:FormState) => async (dispatch:any) => {

}
