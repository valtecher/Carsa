import React, { useEffect } from 'react'
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component:Component }:any) => {
  
  const auth = useSelector((state:any) => {return state.auth})

  if(auth.isAuthenticated){
    return <Route component={Component}/>
  }else {
    return <Redirect to={'/'}/>
  }
}

export default ProtectedRoute;