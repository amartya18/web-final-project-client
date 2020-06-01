import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Logout from './components/Logout'
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Create from './components/Create'
import Auth from './components/Auth';

function App() {

  const auth = new Auth();

  function handleSucessfulAuth(data){
    auth.setToken(data.token);
    auth.setUserId(data.id);
    auth.authenticate();
  }
  function handleLogOut(){
    auth.signout();
    console.log("been here");

  }

  return (
    <Router>
      <Switch>
        <Route 
          path ="/" 
          exact
          render={props=> auth.getAuth()? 
            <Home {...props} activeLink="Home" token={auth.getAuthToken()}/>
            :<Redirect to={{pathname:"/login"}}/>} 
          />
        <Route 
        path ="/login"
        render={props=>(
          <Login {...props} loggedInStatus={auth.getAuthToString()} handleSucessfulAuth={handleSucessfulAuth}/>
        )} />
         <Route 
        path ="/logout"
        render={props=>(
         <Logout {...props} handleLogOut={handleLogOut}/>
        )} />
        <Route path ="/register">
          <Register/>
        </Route>
        <Route path ="/project/:owner_id/:id"
          render={props=>auth.getAuth()?
            <Editor {...props} token={auth.getAuthToken()}/>
            :<Redirect to={{pathname:"/login"}}/>}/>
        <Route
          path ="/create"
          render ={props=>(
            <Create activeLink="Create" {...props}/>
          )}/>
        <Route
          path ="/profile"
          render ={props=>(
            <Create activeLink="Profile" {...props}/>
          )}/>
      </Switch>

    </Router>
  );
}

export default App;
