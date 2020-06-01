import React, { useState } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import "../stylesheet/login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]= useState("");

  function validateForm() {
    return name.length> 0 && email.length > 0 && password.length > 0;
  }

  async function handleSubmit (event){
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name:name, email: email, password:password})
    };
    const response = await fetch('http://localhost:8000/api/user/register', requestOptions);
    const data = await response.json();
  }

  return (
    <div className="container-fluid height-max">
      <div className="row h-100">
        <div className="col-lg-6 p-0 overflow-none">
          <img src="login.gif" className="h-100"/>
        </div> 
        <div className=" col-lg-6 d-flex justify-content-center align-items-center">
          <div className="Login px-5">
          <h1 className="text-center">Cogether</h1>
          <p className="text-center">Register today for free, forever!</p>
            <form onSubmit={handleSubmit}>
            <FormGroup controlId="name">
                Name
                <FormControl
                  autoFocus
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="email">
                Email
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="password" >
                Password
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <Button block disabled={!validateForm()} type="submit">
                Login
              </Button>
            </form>

        </div>
      </div>
      </div>
    </div>
  );
}