import React, {useEffect, useState}from 'react';
import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
  SandpackConsumer
} from "react-smooshpack/es/components"
import "react-smooshpack/dist/styles.css"
import Navbar from './Navbar'
import CodeEditor from './CodeEditor';
import axios from 'axios';
import FileExplorerHeader from './FileExplorerHeader'



function Editor(props) {

  const [files, setFiles] = useState({});
  const [projectEntry,setProjectEntry]=useState(null);

  function getFile(content){
    const dic={};
    for(let i =0; i<content.length;i++){
      try{
      dic[content[i].filename] = {code:content[i].code};
      }catch(err){
        dic[content[i].filename] = {code:''};

      }
      
    }
    setFiles(dic);    
  }

  function projectEntryList(projectType){
    if (projectType==="vanilla"){
      setProjectEntry("/index.js");
    }else{
      setProjectEntry("/src/index.js");
    }

  }

  function isEmpty(obj){
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
  }
  function refetch(){
    // setFiles({});
    fetchData();
  }

  async function fetchData(){
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 
                'auth-token': props.token}
    };
    try{
      const response = await axios(`http://localhost:8000/api/project/read/${props.match.params.id}`, requestOptions)
      projectEntryList(response.data.projectType);
      getFile(response.data.source);
    }catch(err){
      console.log(err);
    //   if (err.response.status==401){
    //     props.history.push('/')
    //   }else if (err.response.status==403) props.history.push('/login');
    // else{
    //   console.log(err);
    //   props.history.push('/');
    // }
  }
}
  useEffect(()=>{
fetchData();
    
},[]);
      
  
  return (
    <div style={{ display: "block ", height: "100vh",width:"100vw", overflow:"hidden"}}>
      <Navbar {...props}/>
      {(isEmpty(files) || !projectEntry)
        ?<div>loading...</div>
      :<SandpackProvider
        files={files}
        dependencies={files["/package.json"].code}
        entry={projectEntry}
        showOpenInCodeSandbox={false}
        style={{
          width: "100%",
          height:"100%"
        }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid black"
          }}
          >
            <div>
              <SandpackConsumer>
                {sandpack=>{
                  return <FileExplorerHeader {...props} sandpack={sandpack} refetch={refetch} projectId={props.match.params.id}/>
                }}
              </SandpackConsumer>
            <FileExplorer style={{ width: "180px", resize:"horizontal",width:"unset", minWidth:"180px", height:"100%"}}>
              </FileExplorer>
            </div>
            <SandpackConsumer>
              {sandpack => {
                return <CodeEditor sandpack={sandpack} style={{ flex: 1, border: "1px solid black", overflowX: "hidden", resize:"both"}} />
              }}
            </SandpackConsumer>
            <BrowserPreview style={{ flex: 1, border: "1px solid black", overflowX: "hidden", resize:"horizontal",width:"unset", minWidth:"180px"}} />
          </div>
      </SandpackProvider>
      }
    </div>
  );
}

export default Editor;
