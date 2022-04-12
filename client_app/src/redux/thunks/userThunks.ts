import { FormState } from "../../pages/Register/Register";
import { login, register } from "../../utils/apis/UserApi"

export const registerUserThunk = (formFields:FormState) => async (dispatch:any) => {
  console.log('inside thunk');
  const user = await register(formFields);
}

export const loginUserThunk = () => async (dispatch:any) => {
  const user = await login();
  console.log(user);
}

export const resetUserPasswordThunk = () => async (dispatch:any) => {

}