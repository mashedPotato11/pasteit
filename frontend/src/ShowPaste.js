import React, { useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import NavBar from "./NavBar";
import axios from "axios";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { Navigate, useNavigate, useParams } from "react-router";
import * as copy from "clipboard-copy";
import PasswordEnter from "./PasswordEnter";
import LoadingScreen from "react-loading-screen";
import Loader from "./Loader";

const ShowPaste = () => {
  const params = useParams();
  const key = params.key;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [password, setPassword] = useState("default");
  const [showContent, setShowContent] = useState(false);
  const [wrongPasswordCount, setWrongPasswordCount] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/snippets/${key}/${password}`);
      const responseData = response.data;
      setData(responseData);
      setShowContent(true); // Assuming the response indicates the password is valid
      setWrongPasswordCount(0); // Reset the wrong password count
      if (response.status == 404) {
        console.log("working");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // API returned a 404 status
        setNotFound(true);
        navigate("/error/error404");
        setShowContent(false);
      } else {
        console.log(error.message);
        // Handle other errors here
      }
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds
      }, 2000);
    }
  };

  useEffect(() => {
    if (key) fetchContent();
  }, [password]);

  const handlePasswordSubmit = async (enteredPassword) => {
    setLoading(true);
    setPassword(enteredPassword);
    setWrongPasswordCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (wrongPasswordCount >= 3) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [wrongPasswordCount]);

  return (
    <div>
      <div className="text-center">
        {!loading && (
          <div className="mx-5 fluid">
            <NavBar />
            <div className="text-center pt-5">
              <h1>Here's Your Paste: {key}!</h1>
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            {!showContent ? (
              <>
                <h3 className="mt-5 mb-1 pb-1">
                  This paste is password protected.
                </h3>
                {wrongPasswordCount >= 3 && (
                  <div className="mt-3 mb-1" style={{ color: "red" }}>
                    Wrong password exceeded maximum attempts.
                  </div>
                )}
                {wrongPasswordCount < 3 && (
                  <>
                    {wrongPasswordCount > 0 && (
                      <div className="mt-3 mb-1" style={{ color: "red" }}>
                        Wrong password ({3 - wrongPasswordCount} attempts
                        remaining)
                      </div>
                    )}
                    <PasswordEnter onSubmit={handlePasswordSubmit} />
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  className="mt-3 mb-4"
                  variant="success"
                  onClick={() => copy(window.location)}
                >
                  Copy Link to clipboard
                </Button>
                <Container className="w-tc-editor-var">
                  <CodeEditor
                    className="d-flex"
                    width="1100px"
                    minHeight="800px"
                    value={data?.content}
                    language="text"
                    disabled
                    placeholder={data?.content}
                    padding={15}
                    style={{
                      fontSize: 18,
                      backgroundColor: "#2b2b2b",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </Container>
              </>
            )}
            {!loading && notFound && (
              <div className="text-center mt-5">
                <h3>Page Not Found</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowPaste;
