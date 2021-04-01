import React from 'react';
import {Route,Redirect } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
//import CenteredContainer from './CenteredContainer';
export default function PrivateRoute({component : Component, ...rest }) {
    const {currentUser} = useAuth();
  return (
  
  
        <Route
            { ...rest}
            render = {props =>{
               return  currentUser ? <Component  {...props}/> : <Redirect to ="/login"/>
            }}>
        </Route>
   
    
    
  );
}
