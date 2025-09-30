// src/components/Patient/PatientDetails.jsx
import React from "react";
import { User } from "lucide-react";

const PatientDetails = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="card shadow p-4">
      <div className="row mb-4">
        {/* Left Column: Avatar + Basic Info */}
        <div className="col-md-4">
          <div className="d-flex flex-column align-items-center shadow-sm p-4 rounded text-center">
            <User size={64} />
            <h5 className="mt-2">{patient.fullName}</h5>
            <p className="text-muted">{patient.patientId}</p>
          </div>
          <div className="mt-4">
            <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
            <p><strong>DOB:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "N/A"}</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</p>
            <p><strong>Phone:</strong> {patient.phone || "N/A"}</p>
            <p><strong>Email:</strong> {patient.email || "N/A"}</p>
            <p><strong>Marital Status:</strong> {patient.maritalStatus || "N/A"}</p>
            <p><strong>Status:</strong> {patient.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>
        <div className="col-md-8" >
          <button className="btn btn-success float-end btn-sm">+ Add prescription</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
