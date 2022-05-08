import './Register.scss'
import { useState } from 'react';
import Header from "../../components/header/Header";
import brandCar from '../../images/HomePage/arteon.png'
import TextInput from '../../components/common/input/TextInput';
import Button from '../../components/common/button/Button';
import FaceBookIcon from '../../images/HomePage/facebook_icon.png';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../redux/thunks/userThunks'
import { useDispatch } from 'react-redux';

interface FormError {
  hasError: boolean, 
  message: string
}

export interface FormState {
  email: string | null | FormError; 
  password: string | null | FormError; 
  first_name: string | null | FormError; 
  second_name: string | null | FormError;
}


const fieldNames:FormState = {
  email: 'email',
  password: 'password',
  first_name: 'firstName',
  second_name: 'secondName',
}

const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultErrorState = {
    email: null, 
    password: null, 
    first_name: null, 
    second_name: null,
  }
  const [formFields, setFormFields] = useState<FormState>({ email: null, password: null, first_name: null, second_name: null })
  const [formFieldsErrors, setFormFieldsErrors] = useState<FormState>(defaultErrorState)

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

    if(formFields.first_name == '' || formFields.first_name == null){
      localError = {...localError, first_name: { hasError: true, message: 'First name is required' }  }
      flag = false;
    }
   
    if(formFields.second_name == '' || formFields.second_name == null){
      localError = {...localError, second_name: { hasError: true, message: 'Second name is required' }  }
      flag = false;
    }
    setFormFieldsErrors({...localError})
    return flag;
  }

  const submit = () => {
    if(validate()){
      console.log('here');
      dispatch(registerUserThunk(formFields));
    } else {
      console.log('Error occurred on validation', formFieldsErrors);
    }
  }

  return(
    <div className='register'>
      <Header/>
      <div className='register-wrapper'>
        <div className='register-wrapper-left'>
            <div className='home-section-first-fadingText register-wrapper-left-fadingText'>
              CARSA
            </div>
            <div className='login-wrapper-left-image'>
              <img src={brandCar}/>
            </div>
        </div>
        <div className='register-wrapper-right'>
            <div className='login-wrapper-right-title'>
              <div className='login-wrapper-right-title-header'>Register</div>
              <div className='login-wrapper-right-title-body'>Please register to continue</div>
            </div>
        </div>
        <div className='register-wrapper-right-form'>
          <TextInput onChange={onChange} value={formFields.email} name={fieldNames.email as string || ''} error={formFieldsErrors.email}  placeholder='E-mail'></TextInput>
          <TextInput type='password' onChange={onChange} value={formFields.password} name={fieldNames.password as string || ''} error={formFieldsErrors.password} placeholder='Password'></TextInput>
          <TextInput onChange={onChange} value={formFields.first_name} name={fieldNames.first_name as string || ''} error={formFieldsErrors.second_name} placeholder='First name'></TextInput>
          <TextInput onChange={onChange} value={formFields.second_name} name={fieldNames.second_name as string || ''} error={formFieldsErrors.second_name} placeholder='Second name'></TextInput>
          <div className='login-wrapper-right-form-link' onClick={() => { navigate('/login') }}>Have account?</div>
            <div className='login-wrapper-right-form-submit'>
              <Button type={false} name='Register' outerFunction={submit}/>
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
  )
}

export default RegisterPage