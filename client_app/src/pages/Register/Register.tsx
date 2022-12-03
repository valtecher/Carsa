import './Register.scss'
import Header from "../../components/header/Header";
import brandCar from '../../images/HomePage/arteon.png'
import FaceBookIcon from '../../images/HomePage/facebook_icon.png';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../redux/thunks/userThunks'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { useFormik } from 'formik';
import { useEffect } from 'react';

interface FormError {
  hasError: boolean, 
  message: string
}

export interface FormState {
  email: string | null | FormError; 
  password: string | null | FormError; 
  first_name: string | null | FormError; 
  last_name: string | null | FormError;
}



const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.user)
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);
  const userState = useSelector((state: AppState) => state.user);

  const validate = (values:any) => {
    const errors:any = {};
    if (!values.first_name) {
      errors.first_name = 'Required';
    } else if (values.first_name.length > 15) {
      errors.first_name = 'Must be 15 characters or less';
    }
  
    if (!values.last_name) {
      errors.last_name = 'Required';
    } else if (values.last_name.length > 20) {
      errors.last_name = 'Must be 20 characters or less';
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
      phone: '',
      first_name: '',
      last_name: ''
    },
    validate,
    onSubmit: (values:any) => submit(),
  });

  const submit = () => {
      dispatch(registerUserThunk(formik.values));
  }

  useEffect(() => {
    if(user.isAuthenticated && user.user.role === 'Client') {
      navigate('/client/dashboard');
    } 
  }, [user.isAuthenticated])

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
                id="phone"
                name="phone"
                type="text"
                placeholder='Phone'
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
                {formik.touched.password && formik.errors.password ? (
                  <div className='form-error'>{formik.errors.password}</div>
                ) : null}
            </div>
            <div className='input-wrapper'>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder='First Name'
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className='form-error'>{formik.errors.first_name}</div>
              ) : null}
            </div>
            <div className='input-wrapper'>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder='Sur Name'
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className='form-error'>{formik.errors.last_name}</div>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>

          <div className='login-wrapper-right-form-link' onClick={() => { navigate('/login') }}>Have account?</div>
           
            <div className='login-wrapper-right-form-submit'>
              <div>{userState.error}</div>
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