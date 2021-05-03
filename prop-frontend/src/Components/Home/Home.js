import React, { useState } from "react"
import "./Home.css"
import {Button, Col, Container, Form, OverlayTrigger, Popover, Row} from "react-bootstrap"
import NavBar from "../Nav/Nav"
import { DeleteReq, PutReq } from "../../Model/Request"
import { BaseURL, EndPoints } from "../../Model/Constants"
import HeadShake from 'react-reveal/HeadShake';



function Details(props){

    var [name , setName] = useState("")

    function EditName(land){
        PutReq(BaseURL , EndPoints.LAND + "/" + land._id,{name:name} , ((res)=>{
            sessionStorage.clear()
            window.location.replace("/")
        }))
    }

    function DeleteLand(land){
        DeleteReq(BaseURL , EndPoints.LAND + "/" + land._id , ((res)=>{
            sessionStorage.clear()
            window.location.replace("/")
        }))
    }
    
    const popover = (<Popover id="popover-basic">
                        <Popover.Title as="h3">Change Details</Popover.Title>
                        <Popover.Content>
                            <Form >
                            <Form.Control type="test" placeholder="Enter New Name" 
                                    value = {name} onChange={e=>setName(e.target.value)}
                                />
                                <Button variant="primary" className="auth-btn" type="submit" 
                                onClick={()=>{EditName(props.land)}}>
                                    Edit
                                </Button>
                            </Form>
                            <hr />
                            <Button variant="primary" type="submit" onClick={()=>{DeleteLand(props.land)}}> Delete</Button>
                        </Popover.Content>
                    </Popover>)



    return(
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
            <Button className="land-btn"> <span>&#8942;</span></Button>
        </OverlayTrigger>
    )
    
}

function Home(props){
    var lands = props.data.lands
    
    return(
        <div>
        <NavBar />
        <Container fluid className="home-con">
            <HeadShake cascade>
                <Row className="land-r">
                    {lands.map((land)=>
                        <Col className = "land-det" md={4}>
                            <Container>
                            <Row className="land-btn-r">
                                <Details  land={land}/>
                            </Row>
                            <Row>
                                <h1 className="content content-name">{land.name}</h1>
                                <h4 className="content content-det">
                                {land.area + ", " + land.city + ", " + land.state + ", " + land.country}
                                </h4>
                            </Row>
                            </Container>
                        </Col>
                    )}
                </Row>
            </HeadShake>
        </Container>
        </div>
    )
}

export default Home