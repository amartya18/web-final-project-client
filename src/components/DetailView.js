import React, { useState, useEffect} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import {Link} from 'react-router-dom'
import AreYouSure from './AreYouSure'

function DetailView(props){
    
    const [detailData,setDetailData]= useState({});
    const [user,setUser]= useState({});
    const [deleteBox,setDeleteBox]=useState(false);
    function showModal(){
        $('#modal').modal('show');
    }
    
    function closeModal(){
        $('#modal').modal('hide');
        props.handleClose();

    }
    function closeModalReload(){
        $('#modal').modal('hide');
        props.handleCloseReload();
    }
    function HandleDeleteBox(){
        setDeleteBox(true);
    }
    function handleDelete(answer){
        setDeleteBox(false);
        if (answer) deleteObject();
    }

    async function deleteObject(){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            };
            const response = await fetch(`http://localhost:8000/api/project/delete/${props.id}`, requestOptions);
            const data = await response.json();
            closeModalReload();
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
                        <h5 className="modal-title" id="exampleModalLongTitle">Project Name: {detailData.title}</h5>
                        <button type="button" onClick={closeModal} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                         <p>Description: {detailData.description}</p>
                         <p>Owner Name : {user.name}</p>
                         <p>Created at: {detailData.date_created}</p>
                         <p>Last updated at: {detailData.last_updated}</p>
                        {/* {detailData.collaborator.map((collab)=>(
                            <li key ={collab.key}>{collab.name}</li>
                        ))}                          */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={HandleDeleteBox} className="btn btn-danger" >Delete</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Edit</button>
                        <button type="button" onClick={closeModal} className="btn btn-primary"><Link className="text-white"to={`/project/${detailData._id}`}>Code it now</Link></button>
                    </div>
                 </div>
                 {deleteBox && <AreYouSure text={"Are you sure you want to delete this project?"}handleDelete={handleDelete}/>}
            </div>
        </div>
    )

}
export default DetailView