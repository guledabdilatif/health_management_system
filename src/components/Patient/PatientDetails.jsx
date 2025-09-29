// src/patients/Details.jsx
import React from "react";
import { User, X } from "lucide-react";

const PatientDetails = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
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
          borderRadius: "12px",
          width: "80%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h4 style={{ margin: 0 }}>Patient Details</h4>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Patient Info */}
        <div className="row mb-4">
          <div className="col-md-4 text-center">
            <div className="d-flex flex-column align-items-center shadow p-4 rounded">
              <User size={64}  />
              <h5 className="mt-2">{patient.fullName}</h5>
              <p className="text-muted">{patient.patientId}</p>
              <button className="btn btn-success btn-sm mt-2">Update</button>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">Gender</p>
                  <h6>{patient.gender || "N/A"}</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">DOB</p>
                  <h6>
                    {patient.dateOfBirth
                      ? new Date(patient.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">Blood Group</p>
                  <h6>{patient.bloodGroup || "N/A"}</h6>
                </div>
              </div>
            </div>

            <h5 className="mt-4">Medical Info</h5>
            <p>
              <strong>Allergies:</strong>{" "}
              {patient.allergies?.length ? patient.allergies.join(", ") : "None"}
            </p>
            <p>
              <strong>Chronic Conditions:</strong>{" "}
              {patient.chronicConditions?.length
                ? patient.chronicConditions.join(", ")
                : "None"}
            </p>
            <p>
              <strong>Current Medications:</strong>{" "}
              {patient.currentMedications?.length
                ? patient.currentMedications.join(", ")
                : "None"}
            </p>
          </div>
        </div>

        {/* More Info */}
        <div>
          <h5>Information</h5>
          <p>
            <strong>Phone:</strong> {patient.phone || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {patient.email || "N/A"}
          </p>
          <p>
            <strong>Marital Status:</strong> {patient.maritalStatus || "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {patient.isActive ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </p>

          {/* Address */}
          {patient.address && (
            <p>
              <strong>Address (City):</strong>{" "}
              {`${patient.address.city}`}
            </p>
          )}

          {/* Emergency Contact */}
          {patient.emergencyContact && (
            <p>
              <strong>Emergency Contact:</strong>
              {patient.emergencyContact.phone}
            </p>
          )}

          {/* Insurance */}
          {patient.insurance && (
            <p>
              <strong>Insurance:</strong> {patient.insurance.provider} –{" "}
              {patient.insurance.policyNumber} <br/>
             <strong>Expiry</strong>: {" "} 
              {new Date(patient.insurance.expiryDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
