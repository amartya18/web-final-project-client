import React, { useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

// with ES6 import
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const CodeEditor = ({ sandpack }) => {
  // not sure if this is how to do it properly
  const { files, openedPath } = sandpack;

  // read more about react states
  const languages = {
    "html": "html",
    "css": "css",
    "js": "javascript",
    "ts": "typescript",
    "tsx": "typescript",
    "json": "json",
  };

  const options = {
    selectOnLineNumber: true,
  };
  const fileOpened = (files) => {
    // console.log(openedPath);
    return files[openedPath].code;
  };
  const fileLanguage = (openedPath) => {
    const file = (openedPath.replace('/', '').split('.').pop());
    return languages[file];
  };
  const onChange = (newValue, e, file) => {
    // e is an array
    // console.log('onChange', newValue, e);
    sandpack.updateFiles({
      ...sandpack.files,
      [sandpack.openedPath]: {
        code: newValue,
      },
    });
    socket.emit('new-operations', { pathFile: sandpack.openedPath, ops: newValue });
  };
  const editorDidMount = (editor, monaco) => {
    // console.log('editorDidMount', editor);
    // editor.focus();
  };

  const id = useRef(`${Date.now()}`);
  const editor = useRef(null);
  const remote = useRef(false);

  useEffect(() => {
    console.log('component did fucking mount')
    socket.on('new-remote-operations', ({pathFile, ops}) => {
      // if (id.current !== editorId) {
      remote.current = true;
      // parse new operation from other remote ide 
      console.log('SOCKET RECEIVING');
      // add time interval before updating sandpack state 
      sandpack.updateFiles({ 
        ...sandpack.files,
        [pathFile]: { 
          code: ops
        },
      });
      remote.current = false;
    })
  }, []);

  return (
    <MonacoEditor
      ref={editor}
      width="800"
      height="100%"
      language={fileLanguage(openedPath)}
      theme="vs-dark"
      value={fileOpened(files)}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;