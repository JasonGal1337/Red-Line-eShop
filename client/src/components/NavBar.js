import React, { useState, useEffect } from 'react';
import { Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {

  return (
      <Navbar bg="light" expand="lg" className="navbar-container fixed-top">
        <div className="navbar-content">
          <Form inline onSubmit={handleSearchSubmit}>
            <FormControl type="text" name="search" placeholder="Search" className="mr-sm-2" />
          </Form>
        </div>
        {/* Use Link component for the logo */}
        <Link to="/homepage">
          <img src="https://i.ibb.co/txxcV4F/Capture.png" alt="" height="100" width="300" />
        </Link>
        <div className="navbar-content">
          <Nav>
            {/* Use Link component for "Sign Up" and "Login" links */}
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/">Login</Nav.Link>
          </Nav>
        </div>
      </Navbar>      
  );
};

export default NavBar;