import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/footer.css"

const Footer = () => {
  return (
    <Navbar bg="light" expand="lg" className="footer-container">
      <Link to="/homepage">
        <img src="https://i.ibb.co/txxcV4F/Capture.png" alt="" height="200" width="400" />
      </Link>
    </Navbar>
  );
};

export default Footer;