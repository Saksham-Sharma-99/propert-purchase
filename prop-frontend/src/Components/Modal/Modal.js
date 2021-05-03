import React, { useState } from "react"
import "./Modal.css"
import {Modal , Button, Form} from "react-bootstrap"
import { PostReq } from "../../Model/Request"
import { BaseURL, EndPoints } from "../../Model/Constants"



function SubmitButton(props){

    function AddLand(){
        if(props.name.length != 0 &&
            props.area.length != 0 &&
            props.city.length != 0 &&
            props.state.length != 0 &&
            props.country.length != 0){
                PostReq(BaseURL , EndPoints.LAND , {
                    name : props.name,
                    area : props.area,
                    city : props.city,
                    state : props.state,
                    country : props.country 
                } , (res)=>{
                    if(res.data.error == null){
                        sessionStorage.clear()
                        window.location.replace("/")
                    }else{
                        alert("Can't add this land")
                    }
                })
            }else{
                alert("Fill all details first")
            }
    }


    
    return <Button onClick={AddLand}>Submit</Button>
    
}

function CenteredLandModal(props){

    var [name,setName] = useState("")
    var [area,setArea] = useState("")
    var [city,setCity] = useState("")
    var [state,setState] = useState("")
    var [country,setCountry] = useState("")

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Land
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Land Details</h4>
            <Form>
                <Form.Label className="modal-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter New Name" 
                    value = {name} onChange={e=>setName(e.target.value)}
                />
                <Form.Label className="modal-label">Area</Form.Label>
                <Form.Control type="text" placeholder="Enter its Area" 
                    value = {area} onChange={e=>setArea(e.target.value)}
                />
                <Form.Label className="modal-label">City</Form.Label>
                <Form.Control type="text" placeholder="Enter its City" 
                    value = {city} onChange={e=>setCity(e.target.value)}
                />
                <Form.Label className="modal-label">State</Form.Label>
                <Form.Control type="text" placeholder="Enter its State" 
                    value = {state} onChange={e=>setState(e.target.value)}
                />
                <Form.Label className="modal-label">Country</Form.Label>
                <Form.Control type="text" placeholder="Enter its Country" 
                    value = {country} onChange={e=>setCountry(e.target.value)}
                />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton  name={name} area={area} city={city} state={state} country={country}/>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}



function RegisterButton(props){

    function AddUser(){
        if(props.name.length != 0 &&
            props.email.length != 0 &&
            props.pass.length != 0) {
                PostReq(BaseURL , EndPoints.USER_REGISTER , {
                    name : props.name,
                    email : props.email,
                    pass : props.pass
                } , (res)=>{
                    if(res.data.error == null){
                        alert("User added successfully")
                        sessionStorage.clear()
                        window.location.replace("/")
                    }else{
                        alert("Can't add this user")
                    }
                })
            }else{
                alert("Fill all details first")
            }
    }

    return <Button onClick={AddUser}>Submit</Button>
}


function CenteredRegisterModal(props){
    var [name,setName] = useState("")
    var [email,setEmail] = useState("")
    var [pass,setPass] = useState("")

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>User Details</h4>
            <Form>
                <Form.Label className="modal-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter New Name" 
                    value = {name} onChange={e=>setName(e.target.value)}
                />
                <Form.Label className="modal-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Your Email" 
                    value = {email} onChange={e=>setEmail(e.target.value)}
                />
                <Form.Label className="modal-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Password" 
                    value = {pass} onChange={e=>setPass(e.target.value)}
                />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <RegisterButton  name={name} email={email} pass={pass}/>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default CenteredLandModal
export {CenteredRegisterModal}