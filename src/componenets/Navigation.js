import React, { useContext, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import { DepartmentContext } from '../contexts/DepartmentContext';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const { department, setDepartment } = useContext(DepartmentContext);

  const handleSelect = (eventKey) => {
    setDepartment(eventKey);
    setExpanded(false); // Close the navbar when a department is selected
  };

  return (
    <Navbar bg="light" expand="lg px-3" expanded={expanded}>
      <Dropdown onSelect={handleSelect} id="dropdown-basic">
        <Dropdown.Toggle>
          {department}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Packing">Packing</Dropdown.Item>
          <Dropdown.Item eventKey="Wood Finishing">Wood Finishing</Dropdown.Item>
          <Dropdown.Item eventKey="Marble">Marble</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Navbar.Brand>
        <Link to="/" className="nav-link home-link">
          Home
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/P2" className="nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 200)}>
            Create Product
          </Link>
          <Link to="/SupervisorSearch" className="nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 200)}>
            Supervisor Search
          </Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;