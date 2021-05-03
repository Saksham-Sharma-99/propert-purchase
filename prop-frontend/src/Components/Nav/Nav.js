import React from "react"
import "./Nav.css"
import { Navbar , Nav , NavDropdown } from "react-bootstrap"
import CenteredLandModal from "../Modal/Modal.js"

function NavBar(props){

    const [modalShow, setModalShow] = React.useState(false);

    function LogOut(){
        sessionStorage.clear()
        localStorage.clear()
        window.location.reload()
    }

    function showModal(){
        setModalShow(true)
    }
    
    return(
        <Navbar sticky="top" className='topNav' expand="lg">
            <Navbar.Brand href="/"><h2>Prop-Purchase</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto">
                <Nav.Link onClick={showModal}>Add</Nav.Link>
                <NavDropdown title="User Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={LogOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            <CenteredLandModal 
                show={modalShow}
                onHide={() => setModalShow(false)}/>
        </Navbar>
    )
}

export default NavBar