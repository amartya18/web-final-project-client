import React, { useState } from "react";
import {Link} from 'react-router-dom';
import DetailView from './DetailView'


function ProjectList(props){

    const [load,setLoad]=useState("");

    function handleClick(id){
        setLoad(id);
    }

    function handleClose(){
        setLoad("");
    }
    return(
        <div className="row">
    {props.projects.map((project)=>(
        <div key ={project._id} className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'350px',overflow:'hidden'}}>
                <img className="card-img-top" src={`${project.projectType}.png`} alt="Card image cap"/>
                <div className="card-body">
                    {/* <h5 className="card-title"><Link to={`/project/${project.owner_id}/${project._id}`}>{project.title}</Link></h5> */}
                    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Launch demo modal
                    </button> */}
                    <button type="button" onClick={e=>handleClick(project._id)}> click me</button>
                    <h5 className="card-title"></h5>
                    <p className="card-text">{project.description}</p>
                    <p className="card-text"><small className="text-muted">Last Updated {project.last_updated}</small></p>
                </div>
            </div>
        </div>
    ))}
    <div className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'350px',overflow:'hidden'}}>
                <div className="card-body d-flex align-items-center  text-center">
                    <h5 className="card-title"><Link to={'/create'}>Create New Projects</Link></h5>
                </div>
            </div>
        </div>
        
        {load.length>0 &&<DetailView {...props} id={load} handleClose={handleClose}/>}
    </div>

    )
}

export default ProjectList;