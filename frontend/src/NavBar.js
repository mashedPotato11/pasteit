import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Button from "react-bootstrap/esm/Button";
import { useToast } from "@chakra-ui/react";

import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router";

function NavBar() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/");
  };
  const handleLogin = () => {
    toast({
      title: "Error",
      description: "Login feature will be available soon",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand className="mx-4">
          <b>Paste It!</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex">
              <Button
                className="mx-3 w-100"
                variant="success"
                onClick={handleCreate}
              >
                Create New Snippet
              </Button>
            </Form>
          </Nav>

          <Form className="d-flex">
            <Button
              className="ml-auto mx-3 w-100"
              variant="success"
              onClick={handleLogin}
            >
              Login Here
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
