import React, { useState, useEffect} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import {Link} from 'react-router-dom'

function AreYouSure(props){
    
    const [sure,setSure]= useState(false);

    function showModal(){
        $('#modal-sure').modal('show');
    }
    useEffect(()=>{
        showModal();
    },[])
    
    function handleDelete(){
        setSure(true)
        props.handleDelete(true);
        $('#modal-sure').modal('hide');

    }
    function closeModal(){
        props.handleDelete(false);
        $('#modal-sure').modal('hide');

    }

    
    return(
        <div className="modal fade show" id="modal-sure" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
 
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">WARNING!</h5>
                        <button type="button" onClick={closeModal} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{props.text}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                 </div>
            </div>
        </div>
    )

}
export default AreYouSure