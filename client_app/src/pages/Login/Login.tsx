import './Login.scss';
import Header from "../../components/header/Header";


const LoginPage = () => {
  return(
    <div className='login'>
        <Header/>
        <div className='login-wrapper'>
          <div className='login-wrapper-left'>
            <div className='home-section-first-fadingText login-wrapper-left-fadingText'>
                CARSA
            </div>
          </div>
          <div className='login-wrapper-right'>
            
          </div>
        </div>
    </div>
  )
}

export default LoginPage;