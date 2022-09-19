import './Register.scss'
import { useState } from 'react';
import Header from "../../components/header/Header";
import brandCar from '../../images/HomePage/arteon.png'
import TextInput from '../../components/common/input/TextInput';
import Button from '../../components/common/button/Button';
import FaceBookIcon from '../../images/HomePage/facebook_icon.png';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../redux/thunks/userThunks'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useFormik } from 'formik';

interface FormError {
  hasError: boolean, 
  message: string
}

export interface FormState {
  email: string | null | FormError; 
  password: string | null | FormError; 
  firstName: string | null | FormError; 
  surName: string | null | FormError;
}



const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);

  const validate = (values:any) => {
    const errors:any = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
  
    if (!values.surName) {
      errors.surName = 'Required';
    } else if (values.surName.length > 20) {
      errors.surName = 'Must be 20 characters or less';
    }

    if(!values.password){
      errors.password = 'Required';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      surName: ''
    },
    validate,
    onSubmit: (values:any) => submit(),
  });

  const submit = () => {
      console.log('Submit');
      dispatch(registerUserThunk(formik.values));
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
          <form className='styled-form' onSubmit={formik.handleSubmit}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
               {formik.touched.email && formik.errors.email ? (
                  <div className='form-error'>{formik.errors.email}</div>
                ) : null}
            </div>
            <label htmlFor="email"> </label>
            <div className='input-wrapper'>
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
                {formik.touched.password && formik.errors.password ? (
                  <div className='form-error'>{formik.errors.password}</div>
                ) : null}
            </div>
            <div className='input-wrapper'>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder='First Name'
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className='form-error'>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className='input-wrapper'>
              <input
                id="surName"
                name="surName"
                type="text"
                placeholder='Sur Name'
                onChange={formik.handleChange}
                value={formik.values.surName}
              />
              {formik.touched.surName && formik.errors.surName ? (
                <div className='form-error'>{formik.errors.surName}</div>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className='login-wrapper-right-form-link' onClick={() => { navigate('/login') }}>Have account?</div>
            <div className='login-wrapper-right-form-submit'>
              <Button type={false} name='Register' onClick={submit}/>
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