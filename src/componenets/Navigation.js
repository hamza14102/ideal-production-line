import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg px-3">
      <Navbar.Brand>My Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/P1" className="nav-link">
            Distribution Calculator
          </Link>
          <Link to="/P2" className="nav-link">
            Create Product
          </Link>
          <Link to="/SupervisorSearch" className="nav-link">
            Supervisor Search
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;