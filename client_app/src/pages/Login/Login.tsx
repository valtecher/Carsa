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
import { useFormik } from 'formik';
export interface FormError {
  hasError: boolean, 
  message: string
}

export interface FormState {
  email: string | null | FormError; 
  password: string | null | FormError; 
}


const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user)
  const userState = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  
  const validate = (values:any) => {
    const errors:any = {};

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
    },
    validate,
    onSubmit: (values:any) => {
      dispatch(loginUserThunk(values));
    },
  });

  useEffect(() => {
    if(user.isAuthenticated && user.user.role === 'Client') {
      navigate('/client/dashboard');
    } 
    if(user.isAuthenticated && user.user.role === 'Technician'){
      navigate('/technician/dashboard');
    }

    if(user.isAuthenticated && user.user.role === 'CarSelector') {
      navigate('/car/dashboard');
    }
  }, [user.isAuthenticated])

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

            <button type="submit">Log in</button>
          </form>
              <div className='login-wrapper-right-form-link' onClick={() => { navigate('/register') }}>Have no account?</div>
              <div className='login-wrapper-right-form-error'>{ userState.error}</div>
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