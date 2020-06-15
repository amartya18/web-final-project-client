import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

import io from 'socket-io-client';

const socket = io('http://localhost:9001');

const CodeEditor = ({ sandpack,project_id }) => {
  // not sure if this is how to do it properly
  const { files, openedPath } = sandpack;
  const id = useRef(`${Date.now()}`);
  const remote = useRef(false);

  // read more about react states
  const languages = {
    "html": "html",
    "css": "css",
    "js": "javascript",
    "ts": "typescript",
    "tsx": "typescript",
    "json": "json",
  };

  const fileLanguage = (openedPath) => {
    const file = (openedPath.replace('/', '').split('.').pop());
    return languages[file];
  };

  const onChange = (newValue, e) => {
    const pathFile = sandpack.openedPath;

    sandpack.updateFiles({
      ...sandpack.files,
      [pathFile]: {
        code: newValue,
      },
    });

  };

  const editorDidMount = (editor, monaco) => {};

  const fileOpened = (files) => {
    return files[openedPath].code;
  };

  useEffect(() => {
    // fetch DATA and set initial value
    // fetch() files...
    socket.on(project_id, (editorId, ops) => {
      if (id.current !== editorId) {
        remote.current = true;
        sandpack.updateFiles({
          ...sandpack.files,
          [pathFile]: {
            code: ops[openedPath].code,
          }
        })
      }
    });
  }); // not sure to use [] or not

  return (
    <MonacoEditor
      width="800"
      height="100%"
      language={fileLanguage(openedPath)}
      theme="vs-dark"
      value={fileOpened(files)}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;