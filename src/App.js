import React from 'react';
import './App.css';
import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
  SandpackConsumer
} from "react-smooshpack/es/components"
import "react-smooshpack/dist/styles.css"

const files = {
  "/index.js": {
    code: `\
import React from "react";
import { render } from "react-dom";
import './styles.css'

import { UserList } from './components/UserList.js'

const getUrl = userCount => \`https://randomuser.me/api/?results=\${userCount}\`;

function App() {
  const [userCount, setUserCount] = React.useState(5);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch(getUrl(userCount))
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results)
      });
  }, [userCount])



  return (
    <div className="app">
      <h1 className="title">Hello from React App</h1>
      <button type="button" onClick={() => setUserCount(userCount + 1)}>Get more users</button>
      <UserList users={users}/>
    </div>
  );
}

render(<App />, document.getElementById("react-app"));`
  },
  "/components/UserList.js": {
    code: `\
import React from "react";

function UserList({ users }) {
  return (
    <div style={{ background: '#eee', padding: 5, fontSize: '18px' }}>
      <p style={{marginBottom: 20 }}>Hello from the child component.</p>
      <p>Fetched <b>{users.length}</b> users from API:</p>
      <ul>
      {users.map((user) => (
        <li key={user.email}>
          <div style={{display: 'flex', alignItems: "center", height: 40 }}>
            <p style={{display: 'inline-block' }}>{user.name.first} {user.name.last}</p>
            <img style={{ width: 30, marginLeft: 10 }} src={user.picture.thumbnail} alt="User profile" />
          </div>
        </li>
        )
      )}
      </ul>
    </div>
  );
}

export { UserList }`
  },
  "/styles.css": {
    code: `\
body, h1, h2, h3, p {
  margin: 0;
}
.app > * {
  margin-bottom: 10px;
}
.title {
  color: #4e486c;
}
button {
  width: 100%;
  background-color: #4e486c;
  font-weight: bold;
  color: white;
  padding: 15px 32px;
  font-size: 18px;
  cursor: pointer;
}
`
  },
  "/public/index.html": {
    code: `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>App</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="react-app"></div>
</body>
</html>
`
  }
};

const dependencies = {
  react: "latest",
  "react-dom": "latest"
};

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50}}>
      <SandpackProvider
        files={files}
        dependencies={dependencies}
        entry="/index.js"
        showOpenInCodeSandbox={false}
        style={{
          width: "100%",
          maxWidth: 1800
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid black"
          }}
          >
            <FileExplorer style={{ width: "180px", border: "1px solid black" }} />
            <CodeMirror style={{ flex: 1, border: "1px solid black", overflowX: "hidden" }} />
            <BrowserPreview style={{ flex: 1, border: "1px solid black", overflowX: "hidden" }} />
          </div>
      </SandpackProvider>
    </div>
  );
}

export default App;
