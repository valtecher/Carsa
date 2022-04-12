import './Login.scss';
import brandCar from '../../images/HomePage/arteon.png'
import Header from "../../components/header/Header";
import TextInput from '../../components/common/input/TextInput';
import Button from '../../components/common/button/Button';
import FaceBookIcon from '../../images/HomePage/facebook_icon.png'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

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
              <TextInput name='' value={''} placeholder='e-mail'></TextInput>
              <TextInput name='' value={''} placeholder='password'></TextInput>
              <div className='login-wrapper-right-form-link' onClick={() => { navigate('/register') }}>Have no account?</div>
              <div className='login-wrapper-right-form-submit'>
                <Button type={false} name='Log in' outerFunction={() => {}}/>
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