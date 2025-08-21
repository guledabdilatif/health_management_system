// src/components/Navbar.jsx
import React, { useState } from "react";
import { User, LogOut } from "lucide-react";
import { colors } from "../constant.js/colors";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <nav className="navbar navbar-expand-lg  px-3" style={{position:'fixed', width:'83%', top:0, right:0, zIndex:1000}}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-success" href="/" style={{color:colors.primary
        }}>
         Health Care
        </a>

        <div className="ms-auto position-relative">
          <button
            className="btn btn-light border shadow text-center"
            onClick={handleToggle}
            style={{width:50, height:50, borderRadius:"50%", display:'flex', alignItems:'center'}}
          >
            <User size={30} color={colors.primary} style={{fontWeight:'bold'}}/>
          </button>

          {/* Profile dropdown */}
          {open && (
            <div
              className="card position-absolute end-0 mt-2"
              style={{ width: "250px", zIndex: 1000 }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle shadow text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
                    <User size={20} color={colors.primary} />
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
