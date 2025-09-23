// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
 
  FolderOpen,
  FileText,
} from "lucide-react";
import { colors } from "../constant.js/colors";
import logo from "/logo-transparent.png";

const linkBase =
  "nav-link d-flex align-items-center px-3 py-2 rounded text-decoration-none";

const Sidebar = () => {
  return (
    <aside
      className="d-flex flex-column text-white p-3 shadow"
      style={{ width: "240px", height: "150vh", backgroundColor: colors.primary }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            filter: "brightness(0) invert(1)",
            width: "200px",
            marginBottom: "12px",
          }}
        />
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-white-50"}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.secondary : "transparent",
            })}
          >
            <LayoutDashboard size={18} className="me-2" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/staffs"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-white-50"}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.secondary : "transparent",
            })}
          >
            <ClipboardList size={18} className="me-2" />
            <span>Staffs</span>
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-white-50"}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.secondary : "transparent",
            })}
          >
            <Users size={18} className="me-2" />
            <span>Patients</span>
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-white-50"}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.secondary : "transparent",
            })}
          >
            <FileText size={18} className="me-2" />
            <span>Documents</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : "text-white-50"}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.secondary : "transparent",
            })}
          >
            <FolderOpen  size={18} className="me-2" />
            <span>Reports</span>
          </NavLink>
        </li>

      
      </ul>
    </aside>
  );
};

export default Sidebar;
