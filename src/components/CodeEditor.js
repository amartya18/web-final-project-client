import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb from 'sharedb/lib/client';

const socket = new ReconnectingWebSocket('ws://localhost:9001');
const connection = new sharedb.Connection(socket);

const CodeEditor = ({ sandpack }) => {
  // not sure if this is how to do it properly
  const { files, openedPath } = sandpack;
  const editorRef = useRef();

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

    console.log(e);

    // console.log(e.changes[0].range); contains columns and rows
    const newText = e.changes[0].text;
    const offset = e.changes[0].rangeOffset;

    var ops = null;

    if (newText !== null) {
      ops = [{ p: ['code', offset], si: newText }];
    } else {
      ops = [{ p: ['code', offset], sd: '' }];
    }

    const doc = connection.get('project', pathFile);
    doc.fetch(function(err){
      if (err) throw err;
    });

    // submit change

    doc.submitOp(ops, function(err) {
      if (err) throw err;
    });;

    sandpack.updateFiles({
      ...sandpack.files,
      [pathFile]: {
        code: newValue,
      },
    });
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition((e) => {
      // console.log(e);
    });
    // editor.onDidChangeCursorSelection();

    monaco.editor.createModel(
      sandpack.files['/src/components/UserList.js'].code,
      'javascript',
      monaco.Uri.parse(`file:///UserList.js`)
    )

    monaco.editor.createModel(
      sandpack.files['/src/index.js'].code,
      'javascript',
      monaco.Uri.parse(`file:///index.js`)
    )

    const temp = monaco.editor.getModel('file:///index.js');

    editor.setModel(temp);

    editor.focus();

    const doc = connection.get('project', '/src/index.js');
    doc.subscribe();
    doc.on('load', update);
    doc.on('op', update);

    function update() {
      sandpack.updateFiles({
        ...sandpack.files,
        [doc.data.filename]: {
          code: doc.data.code,
        }
      });
    }
  };

  const fileOpened = (files) => {
    return files[openedPath].code;
  };

  useEffect(() => {
    // editorRef.current.getModels();
    console.log(editorRef.current);
  }, [openedPath]);


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