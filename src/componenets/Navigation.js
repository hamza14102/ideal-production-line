import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar bg="light" expand="lg px-3" expanded={expanded}>
      <Navbar.Brand>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {/* Home */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Link to="/" className="nav-link">
            Home
          </Link> */}
          {/* <Link to="/P1" className="nav-link">
            Distribution Calculator
          </Link> */}
          <Link to="/P2" className="nav-link" onClick={() => setExpanded(false)}>
            Create Product
          </Link>
          <Link to="/SupervisorSearch" className="nav-link" onClick={() => setExpanded(false)}>
            Supervisor Search
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;