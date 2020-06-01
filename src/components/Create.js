import React, { useState } from 'react'


function Create(){
    const [title,setTitle]= useState("");


    // return(
    //     <div className="container-fluid height-max">
    //     <div className="row h-100">
    //       <div className="col-lg-6 p-0 overflow-none d-lg-block d-none">
    //         <img src="login.gif" className="h-100"/>
    //       </div> 
    //       <div className=" col-lg-6 d-flex justify-content-center align-items-center">
    //         <div className="Login px-5">
    //         <h1 className="text-center">Cogether</h1>
          
    //         <p className="text-center">You are {props.loggedInStatus}</p>
    //           <form onSubmit={handleSubmit}>
    //             <FormGroup controlId="email">
    //               Email
    //               <FormControl
    //                 autoFocus
    //                 type="email"
    //                 value={email}
    //                 onChange={e => setEmail(e.target.value)}
    //               />
    //             </FormGroup>
    //             <FormGroup controlId="password" >
    //               Password
    //               <FormControl
    //                 value={password}
    //                 onChange={e => setPassword(e.target.value)}
    //                 type="password"
    //               />
    //             </FormGroup>
    //             <Button block disabled={!validateForm()} type="submit">
    //               Login
    //             </Button>
    //           </form>
    //       </div>
    //     </div>
    //     </div>
    //     <div>
    // </div>
    //   </div>
    // )

}
export default Create