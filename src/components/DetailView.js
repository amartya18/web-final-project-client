import React, { useState, useEffect} from 'react'
import Popper from 'popper.js';
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import {Link} from 'react-router-dom'

function DetailView(props){
    
    const [detailData,setDetailData]= useState({});
    const [user,setUser]= useState({});
    function showModal(){
        $('#modal').modal('show');
    }
    
    function closeModal(){
        $('#modal').modal('hide');
        props.handleClose();

    }
    useEffect(()=>{
        async function fetchData(){
            const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            };
            const response = await fetch(`http://localhost:8000/api/project/${props.id}`, requestOptions);
            const data = await response.json();
            console.log(data);
            setDetailData(data.projects);
            setUser(data.user);
            showModal();
        }fetchData();
    },[]);
    return(
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered" role="document">
 
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{detailData.title}</h5>
                        <button type="button" onClick={closeModal}className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                         <p>Description: {detailData.description}</p>
                         <p>Yang punya namanya : {user.name}</p>
                        {/* {detailData.collaborator.map((collab)=>(
                            <li key ={collab.key}>{collab.name}</li>
                        ))}                          */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Edit</button>
                        <button type="button" onClick={closeModal} className="btn btn-primary"><Link to={`/project/${detailData._id}`}>Open in Editor</Link></button>
                    </div>
                 </div>
            </div>
        </div>
    )

}
export default DetailView