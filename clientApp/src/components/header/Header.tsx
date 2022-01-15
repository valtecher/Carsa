import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import {useAuth0} from '@auth0/auth0-react';
import {logoutSuccess, saveUser} from '../../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAttempt} from '../../redux/actions/authActions';

const Header = () => {
    const {loginWithPopup, logout, getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();
    const isAuthenticatedFromStore = useSelector((state: any) => {
        return state.auth.isAuthenticated
    })

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then((res) => {
                dispatch(saveUser({user: {...user, token: res}, isAuthenticated, isLoading: false}))
            })
        }

    }, [user])

    const handleLoginClick = () => {
        if (!isAuthenticated) {
            loginWithPopup().then((res) => {
            })

        } else {
            dispatch(logoutAttempt())
            logout();
        }
    }

    const handleLogout = () => {
        dispatch(logoutAttempt())
        dispatch(logoutSuccess())
    }

    return (
        <div className='header-wrapper'>
            <Link className='header-wrapper-link' to='/home'>Home</Link>
            <Link className='header-wrapper-link' to='/offers'>Offers</Link>
            <Link className='header-wrapper-link' to='/about'>About Us</Link>
            
            {isAuthenticatedFromStore
                ? <Link className='header-wrapper-link' to='/dashboard'>Dashboard</Link>
                : <Link className='header-wrapper-link' to='/register'>Register</Link>
            }
            { isAuthenticatedFromStore? <Link className='header-wrapper-link' to='/report'>Create Report</Link>  : '' }

            {isAuthenticatedFromStore
                ? <Link className='header-wrapper-link' onClick={handleLogout} to='/'>Log Out</Link>
                : <Link className='header-wrapper-link' to='/login'>Log in</Link>
            }
        </div>
    )
}

export default Header
