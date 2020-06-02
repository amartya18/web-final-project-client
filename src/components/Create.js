import React, { useState } from 'react'
import Navbar from './Navbar'
import ChooseProject from './ChooseProject'
import { Button} from "react-bootstrap";


function Create(props){

    return(
        <div>
            <Navbar {...props}/>
            <div className="container height-max">
                <ChooseProject {...props} />
            </div>
        </div>
    )

}
export default Create