import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import illustration from "/illustration.jpg";
import { colors } from "../constant.js/colors";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Later we’ll add backend login check
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid d-flex mt-4 align-items-center justify-content-center bg-light">
      <div
        className="row w-100 shadow-lg bg-white rounded "
        style={{ maxWidth: "1000px" }}
      >
        {/* Left side illustration */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-4">
          <img
            src={illustration}
            alt="Illustration"
            className="img-fluid"
            style={{ maxHeight: "450px" }}
          />
        </div>

        {/* Right side login form */}
        <div className="col-md-6 p-5 d-flex flex-column align-items-center justify-content-center">
          {/* Centered Logo */}
          <img src={logo} alt="Logo" className="mb-3" style={{ maxWidth: "120px" }} />

          {/* Title */}
          <h3 className="fw-bold text-center" style={{ color: "black" }}>
            HEALTH MANAGEMENT SYSTEM <br />
            <span style={{ color: colors.primary }}>Health Care</span>
          </h3>

          <h6 className="mt-4 fw-bold" style={{ color: colors.secondary }}>
            LOGIN
          </h6>
          <p className="text-muted">Login to access your account</p>

          {/* Form */}
          <form className="w-100" onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control border-0 border-bottom rounded-0 shadow-none"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
              </div>
              <a href="#" className="text-decoration-none" style={{ color: "green" }}>
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold"
              style={{ backgroundColor:colors.primary, color: "white" }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
