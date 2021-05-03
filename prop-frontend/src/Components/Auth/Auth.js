import React, { useState } from "react"
import "./Auth.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import { PostReq } from "../../Model/Request"
import { BaseURL, Constants, EndPoints} from "../../Model/Constants"
import Loader from "react-loader-spinner";
import { CenteredRegisterModal } from "../Modal/Modal"

function Auth(){

    var [email , setEmail] = useState("")
    var [pass , setPass] = useState("")
    var [loading , setLoading] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    function LogIn(){
        setLoading(true)
        PostReq(BaseURL ,EndPoints.USER_LOGIN,{email:email , pass: pass},((res)=>{
            localStorage.setItem(Constants.authToken , res.data.token);
            window.location.replace("/")
        }))
    }

    function Register(){
        setModalShow(true)
    }
    

    return loading ? 
        (<Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            className = "loader"
        />):
        (
        <Container fluid className = "auth"> 
            <Form className = "auth-box">
                <Form.Group controlId="formBasicEmail" className = "form-g">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        value = {email} onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className = "form-g">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        value = {pass} onChange={e=>setPass(e.target.value)}
                    />
                </Form.Group>

                <Row className = "form-g">
                    <Col>
                        <Button variant="primary" type="submit" className="auth-btn" onClick={LogIn}>
                            Log In
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" className="auth-btn" onClick={Register}>
                            Sign Up
                        </Button>
                    </Col>
                </Row>
            </Form>
            <CenteredRegisterModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}

export default Auth