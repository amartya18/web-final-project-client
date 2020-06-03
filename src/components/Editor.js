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



function Editor(props) {

  const [files, setFiles] = useState({});
  const [projectType,setProjectType]=useState("");

  function getFile(content){
    const dic={};
    for(let i =0; i<content.length;i++){
      dic[content[i].filename] = {code:content[i].code};
    }
    setFiles(dic);
  }

  function isEmpty(obj){
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
  }

  useEffect(()=>{
    async function fetchData(){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': props.token}
        };
        const response = await fetch(`http://localhost:8000/api/project/read/${props.match.params.id}`, requestOptions);
        const data = await response.json();
        getFile(data.source);
        setProjectType(data.projectType);
    }fetchData();
},[]);
      
  
  return (
    <div style={{ display: "block ", height: "100vh",width:"100vw", overflow:"hidden"}}>
      <Navbar {...props}/>
      {isEmpty(files)
        ? <div>loading...</div>
        :
      <SandpackProvider
        files={files}
        dependencies={files["/package.json"].code}
        entry="/package.json"
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
            <FileExplorer style={{ width: "180px", border: "1px solid black", resize:"horizontal",width:"unset", minWidth:"180px"}} />
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
