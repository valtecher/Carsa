import './Login.scss';
import { useState } from 'react';
import brandCar from '../../images/HomePage/arteon.png'
import Header from "../../components/header/Header";
import TextInput from '../../components/common/input/TextInput';
import Button from '../../components/common/button/Button';
import FaceBookIcon from '../../images/HomePage/facebook_icon.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../redux/thunks/userThunks';
import { checkUserCredentials } from '../../utils/apis/UserApi';
import Cookies from "js-cookie"
import { AppState } from '../../redux/store';
import { useEffect } from 'react';
export interface FormError {
  hasError: boolean, 
  message: string
}

export interface FormState {
  email: string | null | FormError; 
  password: string | null | FormError; 
}

const fieldNames:FormState = {
  email: 'email',
  password: 'password',
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated)
  const navigate = useNavigate();

  
  const defaultErrorState = {
    email: null, 
    password: null, 

  }
  const [formFields, setFormFields] = useState<FormState>({ email: null,  password: null })
  const [formFieldsErrors, setFormFieldsErrors] = useState<FormState>(defaultErrorState)

  const loginError = useSelector((state: AppState) => state.user.error);

  const onChange = (e:any) => {
    setFormFields({...formFields, [e.target.name]: e.target.value})
  }

  const resetErrors = () => {
    setFormFieldsErrors(defaultErrorState)
  }

  const validate = ():boolean => {
    resetErrors();
    let flag = true; 
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    let localError:FormState = {...defaultErrorState}
    if(formFields.email === '' || formFields.email == null){
      localError = {...localError, email: { hasError: true, message: 'Email is required' }}
      flag = false;
    }

    if ((!emailRegEx.test(formFields.email as string || '') && formFields.email !== null )) {
      localError = {...localError,  email: { hasError: true, message: 'This is not email' }}
      flag = false;
    }

    if(formFields.password == '' || formFields.password == null){
      localError = {...localError, password: { hasError: true, message: 'Password is required' } }
      flag = false;
    }
    
    if((formFields.password as string)?.length <= 5 && (formFields.password as string)?.length > 0){
      localError = {...localError, password: { hasError: true, message: 'Password cannot be shorter than 5 symbols' }  }
      flag = false;
    }

    setFormFieldsErrors({...localError})
    return flag;
  }

  useEffect(() => {
    if(isAuthenticated) navigate('/');
  }, [isAuthenticated])

  const submit = () => {
    if(validate()){
      dispatch(loginUserThunk(formFields));
     
    } else {
      console.log('Error occurred on validation', formFieldsErrors);
    }
  }

  return(
    <div className='login'>
        <Header/>
        <div className='login-wrapper'>
          <div className='login-wrapper-left'>
            <div className='home-section-first-fadingText login-wrapper-left-fadingText'>
                CARSA
            </div>
            <div className='login-wrapper-left-image'>
              <img src={brandCar}></img>
            </div>
          </div>
          <div className='login-wrapper-right'>
            <div className='login-wrapper-right-title'>
                <div className='login-wrapper-right-title-header'>Login</div>
                <div className='login-wrapper-right-title-body'>Please login to continue</div>
            </div>
            <div className='login-wrapper-right-form'>
              <TextInput onChange={onChange} name='email' value={formFields.email} error={formFieldsErrors.email} placeholder='e-mail'></TextInput>
              <TextInput onChange={onChange} name='password' value={formFields.password} error={formFieldsErrors.password} placeholder='password'></TextInput>
              <div className='login-wrapper-right-form-link' onClick={() => { navigate('/register') }}>Have no account?</div>
              <div className='login-wrapper-right-form-error'>{loginError}</div>
              <div className='login-wrapper-right-form-submit'>
                <Button type={false} name='Log in' onClick={submit}/>
              </div>
              <div className='login-wrapper-right-form-alternative'>
                <p>or</p>
                <div className='login-wrapper-right-form-alternative-media'>
                  <img src={FaceBookIcon}/>
                  <img src={FaceBookIcon}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginPage;