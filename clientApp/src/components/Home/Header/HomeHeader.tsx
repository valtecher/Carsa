import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeHeader.scss'
import logo from '../../../images/HomePage/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import {logoutAttempt} from '../../../redux/actions/authActions';
import {logoutSuccess, saveUser} from '../../../redux/actions/authActions';

const HomeHeader = () => {

    const dispatch = useDispatch();
    const isAuthenticatedFromStore = useSelector((state: any) => {
        return state.auth.isAuthenticated
    })



    const handleLogout = () => {
        dispatch(logoutAttempt())
        dispatch(logoutSuccess())
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

export default HomeHeader;