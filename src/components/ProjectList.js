import React from "react";
import {Link} from 'react-router-dom';

function ProjectList({projects}){
    return(
        <div className="row">
    {projects.map((project)=>(
        <div key ={project._id} className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'320px',overflow:'hidden'}}>
                <img className="card-img-top" src='vanilla.jpg' alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/project/${project.owner_id}/${project._id}`}>{project.title}</Link></h5>
                    <p className="card-text">{project.description}</p>
                    <p className="card-text"><small className="text-muted">Last Updated {project.last_updated}</small></p>
                </div>
            </div>
        </div>
    ))}
    <div className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'320px',overflow:'hidden'}}>
                <div className="card-body d-flex align-items-center  text-center">
                    <h5 className="card-title"><Link to={'/create'}>Create New Projects</Link></h5>
                </div>
            </div>
        </div>
    </div>

    )
}

export default ProjectList;