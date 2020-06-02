import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Project from './components/Project';
import Logout from './components/Logout'
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Create from './components/Create'
import Profile from './components/Profile'
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
            <Project {...props} activeLink="project" token={auth.getAuthToken()}/>
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
          render ={props=>(auth.getAuth()? 
            <Create {...props} activeLink="create" token={auth.getAuthToken()}/>
            : <Redirect to={{pathname:"/login"}}/>
          )}/>
        <Route
          path ="/profile"
          render ={props=>(auth.getAuth()? 
            <Profile {...props} activeLink="profile" token={auth.getAuthToken()}/>
            : <Redirect to={{pathname:"/login"}}/>
            )}
          />
      </Switch>

    </Router>
  );
}

export default App;
