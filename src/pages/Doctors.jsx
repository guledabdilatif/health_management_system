import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react";
import DoctorsDetail from "./DoctorsDetail"; 
import { colors } from "../constant.js/colors";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      phone: "+254 700 123456",
      email: "johndoe@hospital.com",
      status: "available",
      location: "Nairobi, Kenya",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Pediatrician",
      phone: "+254 711 654321",
      email: "janesmith@hospital.com",
      status: "on_leave",
      location: "Mombasa, Kenya",
    },
    {
      id: 3,
      name: "Dr. Michael Brown",
      specialization: "Dermatologist",
      phone: "+254 722 987654",
      email: "michaelbrown@hospital.com",
      status: "available",
      location: "Kisumu, Kenya",
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {/* Sidebar */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ width: "80%", height: "100vh" }}>
        <Navbar />
        <div className="container " style={{marginTop:90}}>
          <h4 style={{ color: colors.secondary }}>Doctors Directory</h4>
          <table className="table table-bordered table-striped">
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={doc.id}>
                  <td>{idx + 1}</td>
                  <td style={{ color: "black" }}>{doc.name}</td>
                  <td style={{ color: "black" }}>{doc.specialization}</td>
                  <td style={{ color: "black" }}>{doc.phone}</td>
                  <td style={{ color: "black" }}>{doc.email}</td>
                  <td>
                    {doc.status === "available" ? (
                      <span
                        className="badge"
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Available
                      </span>
                    ) : (
                      <span
                        className="badge"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        On Leave
                      </span>
                    )}
                  </td>
                  <td style={{ color: "black" }}>{doc.location}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleView(doc)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      // your edit handler here
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show DoctorsDetail ifF selected */}
        {selectedDoctor && (
          <DoctorsDetail
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Doctors;
