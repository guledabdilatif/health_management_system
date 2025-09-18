import React from "react";
import { User, X } from "lucide-react";
import { colors } from "../constant.js/colors";

const DoctorsDetail = ({ doctor, onClose }) => {
  if (!doctor) return null;

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
          <h4 style={{ margin: 0 }}>Doctor Details</h4>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="row mb-4">
          <div className="col-md-4 text-center">
            <div className="d-flex flex-column align-items-center shadow p-4 rounded">
              {doctor.profilePhoto ? (
                <img
                  src={doctor.profilePhoto}
                  alt={doctor.fullName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <User size={64} color={colors.primary} />
              )}
              <h5 className="mt-2">{doctor.fullName}</h5>
              <p className="text-muted">{doctor.specialization || "N/A"}</p>
              <button className="btn btn-success btn-sm mt-2">Update</button>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">Staff ID</p>
                  <h6>{doctor.staffId || "N/A"}</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">License</p>
                  <h6>{doctor.licenseNumber || "N/A"}</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 shadow rounded text-center">
                  <p className="mb-1">Experience</p>
                  <h6>{doctor.yearsOfExperience || 0} yrs</h6>
                </div>
              </div>
            </div>

            <h5 className="mt-4">Appointments</h5>
            <p className="text-muted">No appointment data linked yet.</p>
          </div>
        </div>

        {/* More Info */}
        <div>
          <h5>Information</h5>
          <p>
            <strong>Department:</strong> {doctor.department || "N/A"}
          </p>
          <p>
            <strong>Employment Type:</strong> {doctor.employmentType}
          </p>
          <p>
            <strong>Phone:</strong> {doctor.phone}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {doctor.isActive ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </p>
          <p>
            <strong>Emergency Contact:</strong>{" "}
            {doctor.emergencyContactName} ({doctor.emergencyContactPhone})
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorsDetail;
