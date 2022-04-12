import axios from "axios"
import { FormState as RegisterFormFields} from "../../pages/Register/Register";

export const login = () => {

}

export const register = async (fields:RegisterFormFields) => {
  const user = await axios.get('https://reqres.in/api/users/2');
  return user;
}