import React from "react";
import { Form, FormControl, Nav, Navbar } from "react-bootstrap";
import "../styles/NavigationBar.css";

export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Navbar.Brand href="#home">
        <i className="bi bi-github"></i>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto git">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
          </Form>
          <Nav.Link href="#pullrequests">Pull Requests</Nav.Link>
          <Nav.Link href="#pricing">Issues</Nav.Link>
          <Nav.Link href="#marketplace">MarketPlace</Nav.Link>
          <Nav.Link href="#explore">Explore</Nav.Link>
        </Nav>
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
