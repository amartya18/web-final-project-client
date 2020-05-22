import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = ({ sandpack }) => {
  const { files, openedPath } = sandpack;

  const options = {
    selectOnLineNumber: true,
  };

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e)
  };
  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
      value={files[openedPath].code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;