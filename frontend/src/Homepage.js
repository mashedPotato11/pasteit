import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavBar from "./NavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
const Homepage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("text");
  const [password, setPassword] = useState("default");
  const [title, setTitle] = useState("");

  const [content, setContent] = React.useState();

  const submitHandler = async () => {
    if (!content || !title) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://pasteit-now.onrender.com/api/snippets",
        { title, content, password, language },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(`/${data.slug}`, {
        password,
        setPassword,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <div>
      <div className="mx-5 fluid">
        <NavBar />
      </div>
      <div className="text-center mt-5">
        <h1>Paste your snippet now!</h1>
        <p className="px-3">
          Click on Create Snippet and save it for further use.
        </p>
      </div>
      <Container className="">
        <div class="App-tools mt-5 mb-2">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Language: {language}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLanguage("text")}>
                Language: Text
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage("cpp")}>
                Language: Cpp
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage("js")}>
                Language: Js
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div class="w-loader w-loader-default"></div>
        </div>
      </Container>
      <Container className="w-tc-editor-var">
        <CodeEditor
          // className="d-flex"
          width="auto"
          minHeight="400px"
          // data-color-mode="dark"
          value={content}
          language={language}
          placeholder="Please enter your text or code."
          onChange={(evn) => setContent(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#2b2b2b",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </Container>

      <Container className="mt-5 pb-2">
        <Row>
          <Col className="col-12 col-lg-6">
            <Container className="border mr-5" data-bs-theme="dark">
              <Container className="p-2">
                <h3>Paste Options</h3>
              </Container>
              <Container className="p-1">
                <div className="ml-auto">
                  <InputGroup size="lg" className="mt-3 mb-3">
                    <InputGroup.Text
                      id="inputGroup-sizing-lg"
                      style={{ width: "105px" }}
                    >
                      TITLE
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="TITLE"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(evn) => setTitle(evn.target.value)}
                    />
                  </InputGroup>
                </div>
              </Container>
              <Container className="p-1">
                <div className="ml-auto">
                  <InputGroup size="lg" className="mb-3">
                    <InputGroup.Text
                      id="inputGroup-sizing-lg"
                      style={{ width: "105px" }}
                    >
                      Password
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Password"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(evn) => setPassword(evn.target.value)}
                    />
                  </InputGroup>
                </div>
              </Container>

              <Container className="mb-5">
                <Button
                  variant="success"
                  onClick={submitHandler}
                  style={{
                    marginLeft: "40%",

                    width: "60%",
                  }}
                >
                  Create New Paste
                </Button>
              </Container>
            </Container>
          </Col>
          <Col>
            <Container className=" mr-5" data-bs-theme="dark"></Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
