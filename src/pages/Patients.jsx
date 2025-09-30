// src/pages/Patients.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react";
import PatientForm from "../components/Patient/PatientForm";
import axios from "axios";
import PatientDetails from "../components/Patient/PatientDetails";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState(initialForm());
  const [viewPatient, setViewPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  {/* inside table row */ }
  <button
    className="btn btn-info btn-sm"
    onClick={() => setSelectedPatient(patient)}
  >
    View
  </button>

  {/* modal */ }
  <PatientDetails
    patient={selectedPatient}
    onClose={() => setSelectedPatient(null)}
  />



  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_URL}/patients`);
      setPatients(res.data.data.results || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // handle nested fields like address.street
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewPatient((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setNewPatient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newPatient,
      allergies: newPatient.allergies
        ? newPatient.allergies.split(",").map((s) => s.trim())
        : [],
      chronicConditions: newPatient.chronicConditions
        ? newPatient.chronicConditions.split(",").map((s) => s.trim())
        : [],
      currentMedications: newPatient.currentMedications
        ? newPatient.currentMedications.split(",").map((s) => s.trim())
        : [],
      isActive: newPatient.status === "active",
    };

    try {
      if (selectedPatient) {
        await axios.put(`${API_URL}/patients/${selectedPatient._id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      await fetchPatients();
      resetForm();
    } catch (error) {
      console.error("Error saving patient:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await axios.delete(`${API_URL}/patients/${id}`);
        setPatients(patients.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setNewPatient({
      ...patient,
      allergies: patient.allergies?.join(", ") || "",
      chronicConditions: patient.chronicConditions?.join(", ") || "",
      currentMedications: patient.currentMedications?.join(", ") || "",
      status: patient.isActive ? "active" : "inactive",
    });
    setShowForm(true);
  };
  function initialForm() {
    return {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      maritalStatus: "",
      bloodGroup: "",
      allergies: "",
      chronicConditions: "",
      currentMedications: "",
      address: { street: "", city: "", state: "", postalCode: "", country: "" },
      emergencyContact: { name: "", phone: "", relation: "" },
      insurance: { provider: "", policyNumber: "", expiryDate: "" },
      status: "active",
    };
  }

  const resetForm = () => {
    setNewPatient(initialForm());
    setSelectedPatient(null);
    setShowForm(false);
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
        <div className="container" style={{ marginTop: 70 }}>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn btn-success btn-sm float-end fs-9"
          >
            + Add Patient
          </button>

          {/* Patients Table */}
          <table className="table table-hover table-striped text-center">
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, idx) => (
                <tr key={p._id}>
                  <td>{idx + 1}</td>
                  <td style={{ color: "black" }}>{p.fullName}</td>
                  <td>{p.gender}</td>
                  <td>{p.phone}</td>
                  <td>{p.bloodGroup || "N/A"}</td>
                  <td>
                    {p.isActive ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => navigate(`/patients/${p._id}`)}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleEdit(p)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {viewPatient && (
          <PatientDetails
            patient={viewPatient}
            onClose={() => setViewPatient(null)}
          />
        )}
        {/* Patient Form */}
        {showForm && (
          <div
            className="fixed items-center justify-center "
            style={{ position: "absolute", top: "40px", width: "100%" }}
          >
            <div className="bg-white p-5 rounded-3 shadow" style={{ width: "75%", margin: 0, }}>
              <h3 className="mb-3" style={{ color: "black" }}>
                {selectedPatient ? "Edit Patient" : "Add Patient"}
              </h3>
              <PatientForm
                formData={newPatient}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={selectedPatient?._id}
                style={{ backgroundColor: 'red' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
