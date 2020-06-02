import React, { useState, useEffect } from 'react';
import '../stylesheet/navbar.css'
import {Link} from 'react-router-dom';
import $ from 'jquery'

function Navbar(props){
    const [active,setActive]= useState("");

    useEffect(()=>{
        console.log(props.activeLink);
        setActive(props.activeLink);
        $('#'+props.activeLink).addClass('active');

    })
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav justify-content-around ml-auto mr-5">
        <li id="project" className="nav-item px-4">
            <Link to="/"className="nav-link">Projects</Link>
        </li>
        <li id="create" className="nav-item px-4">
            <Link to="/create"className="nav-link">Create</Link>
        </li>
        <li id="profile" className="nav-item  px-4">
            <Link to="/profile"className="nav-link">Profile</Link>
        </li>
        <li className="nav-item  px-4">
            <Link to="/logout"className="nav-link">Logout</Link>
        </li>
    </ul>
  </div>
</nav>
    )
}


export default Navbar;