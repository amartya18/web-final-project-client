import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList'
import Navbar from './Navbar';

function Project(props){
    const [load,setLoad]=useState(false);
    const [projects,setProjects]= useState();

    function reFetch(){
        fetchData();
    }

    async function fetchData(){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': props.token},
        };
        const response = await fetch('http://localhost:8000/api/project', requestOptions);
        const data = await response.json();
        setProjects(data);
        setLoad(true);
    }
    useEffect(()=>{
       fetchData();
    },[]);

    return(
        <div>
            <Navbar {...props}/>
            <div className="container">
                <h1 className="text-center p-4">My projects</h1>
                {!load 
                ? <div>Loading...</div> 
                :<ProjectList {...props} projects= {projects.projects} reFetch={reFetch}/>}  

        </div>
       </div>
    );
}

export default Project;