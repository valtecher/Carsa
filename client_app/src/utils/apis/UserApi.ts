import axios from "axios"
import { FormState as RegisterFormFields} from "../../pages/Register/Register";

interface FormError {
  hasError: boolean, 
  message: string
}

export const login = async (fields:{ email: string | null | FormError, password: string | null | FormError  }) => {
  const user = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/login`,
    headers: {}, 
    withCredentials: true,
    data: {
     ...fields
    }
  }).catch((e) => {
    return e.response.data.message;
  });
  return user;
}

export const logout = async () => {
  axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, { withCredentials: true });
}

export const register = async (fields:RegisterFormFields) => {
  const user = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/register`,
    headers: {}, 
    withCredentials: true,
    data: {
     ...fields
    }
  }).catch((e:any) => { 
    return e.response.data?.errors?.[0]?.msg;
  });
  return user;
}

export const checkUserCredentials = async () => {
  const response = await axios.get('http://localhost:3000/api/auth/protected', {withCredentials: true});
  return response;
}