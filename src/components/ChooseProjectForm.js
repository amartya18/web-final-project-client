import React,{useState} from 'react'
import { Button, FormGroup, FormControl} from "react-bootstrap";


function ChooseProjectForm(props){
    console.log(props);
    const [title,setTitle]= useState("");
    const [description,setDescription]= useState("");

     async function handleSubmit (event){
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'auth-token': props.token},
          body: JSON.stringify({title: title, 
                                description :description, 
                                projectType:props.projectType})
        };
        const response = await fetch('http://localhost:8000/api/project/create', requestOptions);
        const data = await response.json();
        try{
            if (data.status==='success'){
                props.history.push(`/project/${data.owner_id}/${data._id}`);
            }else{
                console.log("Failed to create");
            }
        }catch(err){
            console.log("Failed To create");
        }
      }
    
    function validateForm() {
        return title.length > 0;;
      }

    return(                        
    <form onSubmit={handleSubmit}>
        <FormGroup controlId="title">
        Project Title
        <FormControl
            autoFocus
            type="text"
            default ="myProject"
            value={props.title}
            onChange={e => setTitle(e.target.value)}
        />
        </FormGroup>
        <FormGroup controlId="description" >
        Description of the project:
        <FormControl
            as="textarea"
            rows="3"
            value={props.description}
            onChange={e => setDescription(e.target.value)}
            type="text"
        />
        <div className="pt-2">
        <Button 
            block 
            disabled={!validateForm()} 
            type="submit"
            >
            Create Project Now
        </Button>
        </div>
        </FormGroup>
    </form>)
}


export default ChooseProjectForm