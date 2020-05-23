import React from 'react';
import MonacoEditor from 'react-monaco-editor';

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
    return files[openedPath].code
  };
  const fileLanguage = (openedPath) => {
    const file = (openedPath.replace('/', '').split('.').pop());
    return languages[file];
  };
  const onChange = (newValue, e, file) => {
    // e is an array
    // console.log('onChange', newValue, e);
    console.log('onChange', newValue);
    sandpack.updateFiles({
      ...sandpack.files,
      [sandpack.openedPath]: {
        code: newValue,
      },
    });
  };
  const editorDidMount = (editor, monaco) => {
    // console.log('editorDidMount', editor);
    // editor.focus();
    console.log(sandpack);
  };

  return (
    <MonacoEditor
      width="800"
      height="600"
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