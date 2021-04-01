import React,{useEffect} from "react"
import Signup from './authentication/Signup';
import Profile from './authentication/Profile';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import UpdateProfile from './authentication/UpdateProfile';

import  { AuthProvider } from "../context/AuthContext";
import PrivateRoute from './authentication/PrivatRoute';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Dashboard from "./Gdrive/Dashboard";

function App() {
  useEffect(()=>{
    document.title = "GSM DRIVE"
    
  },[])
  return (
  
  <div>
    
        <Router>  <AuthProvider>
          <Switch>
               {/* {Drive Routes} */}
               <PrivateRoute exact  path =  "/"  component = {Dashboard}/>
               <PrivateRoute exact  path =  "/folder/:folderId"  component = {Dashboard}/>
            
            {/* {Profile Routes} */}
            <PrivateRoute  path =  "/user"  component = {Profile}/>
            <PrivateRoute   path =  "/update-profile"  component = {UpdateProfile}/>
               {/* Auth Routes} */}
            <Route path =  "/signup"  component = {Signup}/>
            <Route path =  "/login"  component = {Login}/>
            <Route path =  "/forgot-password"  component = {ForgotPassword}/>

          </Switch>
          </AuthProvider></Router> 
 
 </div>
 
  );
}

export default App;
