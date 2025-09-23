import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react"; // ✅ icons
import PatientForm from "../components/Patient/PatientForm";

const Patients = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 32,
      gender: "Male",
      contact: "0712345678",
      address: "Nairobi",
      bloodGroup: "O+",
      allergies: "Penicillin",
      conditions: "Diabetes",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      contact: "0798765432",
      address: "Mombasa",
      bloodGroup: "A+",
      allergies: "None",
      conditions: "Asthma",
      status: "inactive",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    conditions: "",
    status: "active",
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPatient) {
      setPatients(
        patients.map((p) =>
          p.id === selectedPatient.id ? { ...selectedPatient, ...newPatient } : p
        )
      );
      setSelectedPatient(null);
    } else {
      setPatients([...patients, { id: patients.length + 1, ...newPatient }]);
    }

    setNewPatient({
      name: "",
      age: "",
      gender: "",
      contact: "",
      address: "",
      bloodGroup: "",
      allergies: "",
      conditions: "",
      status: "active",
    });
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setNewPatient(patient);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const handleView = (p) => {
    alert(
      `Patient Details:\n\nName: ${p.name}\nAge: ${p.age}\nGender: ${p.gender}\nContact: ${p.contact}\nAddress: ${p.address}\nBlood Group: ${p.bloodGroup}\nAllergies: ${p.allergies}\nConditions: ${p.conditions}\nStatus: ${p.status}`
    );
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
              setShowForm(true);
              setSelectedPatient(null);
              setNewPatient({
                name: "",
                age: "",
                gender: "",
                contact: "",
                address: "",
                bloodGroup: "",
                allergies: "",
                conditions: "",
                status: "active",
              });
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
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td style={{ color: "black" }}>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.contact}</td>
                  <td>{p.bloodGroup}</td>
                  <td>
                    {p.status === "active" ? (
                      <span className="badge" style={{ backgroundColor: "green", color: "white" }}>
                        Active
                      </span>
                    ) : (
                      <span className="badge" style={{ backgroundColor: "red", color: "white" }}>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => handleView(p)}
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
                        onClick={() => handleDelete(p.id)}
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
        {showForm && (
          <div
            className="fixed inset-0 items-center justify-center"
            style={{ position: "absolute", top: "20px", width: "100%" }}
          >
            <div className="bg-white p-5 rounded-3 shadow-lg" style={{ width: "60%" }}>
              <h3 className="mb-3" style={{ color: "black" }}>
                {selectedPatient ? "Edit Patient" : "Add Patient"}
              </h3>
              <PatientForm
                formData={newPatient}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={selectedPatient?.id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
