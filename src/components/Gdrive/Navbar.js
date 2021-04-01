import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
export default function NavbarComponent() {
  const {currentUser} = useAuth()
  const {logout} = useAuth()
  function logouthanlder()
  {
    logout()
  }
  return (
    
    <Navbar  bg="dark"  variant  = "dark"  expand="sm "  >
      <Navbar.Brand className = "mr-auto"  as={Link} to="/user"  >
      Welcome : {currentUser.email}
      </Navbar.Brand>
      <Nav>
        
        <Nav.Link  as={Link} to="/user" >
          Profile
        </Nav.Link>
       {currentUser && 
        <Nav.Link  as={Link} to="/login" onClick ={logouthanlder} >
          Logout
        </Nav.Link>}
      </Nav>
    </Navbar>
   
  )
}