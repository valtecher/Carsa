import React, { useEffect, useState } from 'react'
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutAttempt } from '../../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({path, component:Component }:any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state:any) => {return state.auth})
  const [ isAuthenticated, setIsAuthenticated ] = useState(auth.isAuthenticated)
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/auth/check_status`).then((res:any) => {
      setIsAuthenticated(res.data.success);
      if(!res.data.success){
        dispatch(logoutAttempt());
        history.push('/');
        
      }
    })
  }, [])


  if(isAuthenticated){
    return <Route path={path} exact component={Component}/>
  }else {
    return <Redirect to={'/'}/>
  }
}

export default ProtectedRoute;