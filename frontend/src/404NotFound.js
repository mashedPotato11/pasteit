import React from "react";
import Container from "react-bootstrap/Container";
// import "./NotFoundPage.css"; // Import the CSS file for additional styling if needed

const NotFoundPage = () => {
  return (
    <div className="not-found-page p-5 px-5" style={{ height: "100vh" }}>
      <Container className="text-center">
        <h1 className="pt-5">404 Error</h1>
        <h3 className="text-white">Page Not Found</h3>
        <p className="text-white">
          The page you are looking for does not exist or has been deleted by the
          owner.
        </p>
      </Container>
    </div>
  );
};

export default NotFoundPage;
