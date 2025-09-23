import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center px-3">
      <h1 className="display-1 fw-bold text-dark">404</h1>
      <p className="fs-3 fw-semibold mt-3">Page Not Found</p>
      <p className="text-muted">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn btn-success btn-lg mt-4 shadow">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
