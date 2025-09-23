// src/staffs/Form.jsx
import React from "react";

const Form = ({ formData, handleChange, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* Full Name */}
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Staff ID */}
        <div className="col-md-6">
          <label className="form-label">Staff ID</label>
          <input
            type="text"
            name="staffId"
            className="form-control"
            value={formData.staffId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Staff Type */}
        <div className="col-md-6">
          <label className="form-label">Staff Type</label>
          <select
            name="staffType"
            className="form-select"
            value={formData.staffType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>LabTech</option>
            <option>Pharmacist</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Department */}
        <div className="col-md-6">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment Type */}
        <div className="col-md-6">
          <label className="form-label">Employment Type</label>
          <select
            name="employmentType"
            className="form-select"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Visiting</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Active & Suspended */}
        <div className="col-md-6 d-flex align-items-center gap-3">
          <div className="form-check">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Active</label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              name="isSuspended"
              checked={formData.isSuspended}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Suspended</label>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="col-md-6">
          <label className="form-label">Profile Photo (URL)</label>
          <input
            type="text"
            name="profilePhoto"
            className="form-control"
            value={formData.profilePhoto}
            onChange={handleChange}
          />
        </div>

        {/* Emergency Contact Name */}
        <div className="col-md-6">
          <label className="form-label">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            className="form-control"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
        </div>

        {/* Emergency Contact Phone */}
        <div className="col-md-6">
          <label className="form-label">Emergency Contact Phone</label>
          <input
            type="text"
            name="emergencyContactPhone"
            className="form-control"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
          />
        </div>

        {/* Specialization */}
        <div className="col-md-6">
          <label className="form-label">Specialization</label>
          <input
            type="text"
            name="specialization"
            className="form-control"
            value={formData.specialization}
            onChange={handleChange}
          />
        </div>

        {/* Qualifications */}
        <div className="col-md-6">
          <label className="form-label">Qualifications (comma separated)</label>
          <input
            type="text"
            name="qualifications"
            className="form-control"
            value={formData.qualifications}
            onChange={handleChange}
          />
        </div>

        {/* License Number */}
        <div className="col-md-6">
          <label className="form-label">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            className="form-control"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        {/* License Expiry */}
        <div className="col-md-6">
          <label className="form-label">License Expiry</label>
          <input
            type="date"
            name="licenseExpiry"
            className="form-control"
            value={formData.licenseExpiry}
            onChange={handleChange}
          />
        </div>

        {/* Years of Experience */}
        <div className="col-md-6">
          <label className="form-label">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            className="form-control"
            value={formData.yearsOfExperience}
            onChange={handleChange}
          />
        </div>

        {/* Consultation Fee */}
        <div className="col-md-6">
          <label className="form-label">Consultation Fee</label>
          <input
            type="number"
            name="consultationFee"
            className="form-control"
            value={formData.consultationFee}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-success px-4 float-end">
          {editingId ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
