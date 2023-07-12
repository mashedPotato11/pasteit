import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div style={{ display: "block", width: "auto", padding: 30 }}>
        <h3>Your Paste is Loading</h3>
        <Spinner animation="border" variant="primary" /> <br />
        <Spinner animation="grow" variant="warning" />
      </div>
    </div>
  );
};

export default Loader;
