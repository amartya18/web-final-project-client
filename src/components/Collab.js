import React, { useState ,useEffect} from 'react'
import { Redirect } from 'react-router-dom';

function Collab(props){

    const [projectId,setProjectId]= useState(null);
    useEffect(()=>{

        async function checkCollab (){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',
                        'auth-token': props.token},
              body: JSON.stringify({ project_id: props.match.params.id, sharedPassword:props.match.params.password})
            };
            const response = await fetch('http://localhost:8000/api/project/collab', requestOptions);
            const data = await response.json();
            console.log(data);
            if (data.status==="OK"){
                setProjectId(props.match.params.id);
            }else{
                props.history.push('/');
            }

    
        
          }checkCollab();
    },[])
  
    return(
        
        !projectId ? <div>loading</div>:<Redirect to={{pathname:`/project/${projectId}`}}/>

    )
}
export default Collab;