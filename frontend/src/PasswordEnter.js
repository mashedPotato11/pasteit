import React, { useState } from "react";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@chakra-ui/react";
const PasswordEnter = ({ onSubmit }) => {
  const [enteredPassword, setEnteredPassword] = useState("");

  const handlePasswordSubmit = () => {
    onSubmit(enteredPassword);
  };

  return (
    <div className="mt-1">
      <Container>
        <FormGroup>
          <FloatingLabel>
            <InputGroup>
              <Form.Control
                style={{ width: "300px" }}
                type="password"
                placeholder="Enter Password to unlock this paste"
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
              <Button
                className="py-2"
                variant="primary"
                onClick={handlePasswordSubmit}
              >
                Unlock Your Paste
              </Button>
            </InputGroup>
          </FloatingLabel>
        </FormGroup>
        <div style={{ height: "70vh" }}>
          <h1></h1>
        </div>
      </Container>
    </div>
  );
};

export default PasswordEnter;
