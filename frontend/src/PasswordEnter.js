import React, { useState } from "react";
import FormGroup from "react-bootstrap/FormGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "@chakra-ui/react";

const PasswordEnter = ({ onSubmit }) => {
  const [enteredPassword, setEnteredPassword] = useState("");

  const handlePasswordSubmit = () => {
    onSubmit(enteredPassword);
  };

  return (
    <div className="mt-3">
      <Container>
        <FormGroup>
          <FloatingLabel>
            <InputGroup>
              <Form.Control
                style={{
                  width: "100%",
                }}
                type="password"
                placeholder="Enter Password to unlock this paste"
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
              <Button
                style={{
                  width: "100%",
                }}
                className="mt-2 mt-md-0 px-4"
                variant="primary"
                onClick={handlePasswordSubmit}
              >
                Unlock Your Paste
              </Button>
            </InputGroup>
          </FloatingLabel>
        </FormGroup>
        <div style={{ height: "80vh" }}>
          <h1></h1>
        </div>
      </Container>
    </div>
  );
};

export default PasswordEnter;
