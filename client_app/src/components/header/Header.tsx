import { Link } from 'react-router-dom';
import './Header.scss'
import logo from '../../images/Common/carsa_logo.png';

const Header = () => {

    // const dispatch = useDispatch();
    const isAuthenticatedFromStore = false;
    // useSelector((state: any) => { return state.auth.isAuthenticated })



    const handleLogout = () => {
        // dispatch(logoutAttempt())
        // dispatch(logoutSuccess())
    }


  return(
    <div className='homeheader'>
      <div className='homeheader-wrapper'>
        <Link to='/home'>Home</Link>
      </div>
      <div className='homeheader-wrapper'>
        <Link to='/offers'>Offers</Link>
      </div>
        { isAuthenticatedFromStore?  
          <div className='homeheader-wrapper'>
            <Link to='/dashboard'>Dashboard</Link>
          </div> : '' 
        }
      <div className='homeheader-logo'>
        <img src={logo}/> 
      </div>
      { isAuthenticatedFromStore? 
          <div className='homeheader-wrapper'>
            <Link to='/report'>Reports</Link>
          </div> 
          : '' 
      }
      <div className='homeheader-wrapper'>
        <Link to='/about'>Contact</Link>
      </div>
      <div className='homeheader-wrapper'>
          {isAuthenticatedFromStore
                ? <Link className='header-wrapper-link' onClick={handleLogout} to='/'>Log Out</Link>
                : <Link className='header-wrapper-link' to='/login'>Log in</Link>
            }
      </div>
    </div>
  )
}

export default Header;