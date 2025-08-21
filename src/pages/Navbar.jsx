// src/components/Navbar.jsx
import React, { useState } from "react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <nav className="navbar navbar-expand-lg navbar-light  px-3">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-success" href="/" style={{color:'green'
        }}>
          Attendance System
        </a>

        <div className="ms-auto position-relative">
          <button
            className="btn btn-light rounded-full border"
            onClick={handleToggle}
          >
            <User size={20} />
          </button>

          {/* Profile dropdown */}
          {open && (
            <div
              className="card position-absolute end-0 mt-2"
              style={{ width: "250px", zIndex: 1000 }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                    <User size={20} />
                  </div>
                  <div className="ms-2">
                    <h6 className="mb-0">John Doe</h6>
                    <small className="text-muted">johndoe@email.com</small>
                  </div>
                </div>
                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
                  <LogOut size={18} className="me-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
