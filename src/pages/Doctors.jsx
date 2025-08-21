import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2, X } from "lucide-react";

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
  const [modalType, setModalType] = useState(""); // "view" | "edit"
  const [formData, setFormData] = useState({});

  // Handlers
  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setModalType("view");
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData(doctor); // prefill form
    setModalType("edit");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setModalType("");
    setFormData({});
  };

  const handleSave = (e) => {
    e.preventDefault(); // prevent refresh
    setDoctors(
      doctors.map((d) =>
        d.id === selectedDoctor.id ? { ...formData, id: d.id } : d
      )
    );
    closeModal();
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
        <div className="container mt-4">
          <h2 style={{ color: "black" }}>Doctors Directory</h2>
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
                      onClick={() => handleEdit(doc)}
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

        {/* Simple Modal */}
        {selectedDoctor && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h4>
                  {modalType === "view" ? "Doctor Details" : "Edit Doctor"}
                </h4>
                <button
                  className="btn btn-sm btn-light"
                  onClick={closeModal}
                >
                  <X size={18} />
                </button>
              </div>

              {modalType === "view" ? (
                <div>
                  <p><strong>Name:</strong> {selectedDoctor.name}</p>
                  <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                  <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
                  <p><strong>Email:</strong> {selectedDoctor.email}</p>
                  <p><strong>Status:</strong> {selectedDoctor.status}</p>
                  <p><strong>Location:</strong> {selectedDoctor.location}</p>
                </div>
              ) : (
                <form onSubmit={handleSave}>
                  <div className="mb-2">
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label>Specialization</label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({ ...formData, specialization: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label>Email</label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
