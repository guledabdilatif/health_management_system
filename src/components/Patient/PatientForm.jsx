// src/patients/Form.jsx
import React from "react";

const PatientForm = ({ formData, handleChange, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* Full Name */}
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Age */}
        <div className="col-md-6">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
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
          </select>
        </div>

        {/* Contact */}
        <div className="col-md-6">
          <label className="form-label">Contact</label>
          <input
            type="text"
            name="contact"
            className="form-control"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="col-md-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Blood Group */}
        <div className="col-md-6">
          <label className="form-label">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            className="form-control"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
        </div>

        {/* Allergies */}
        <div className="col-md-6">
          <label className="form-label">Allergies</label>
          <input
            type="text"
            name="allergies"
            className="form-control"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        {/* Conditions */}
        <div className="col-md-12">
          <label className="form-label">Medical Conditions</label>
          <textarea
            name="conditions"
            className="form-control"
            value={formData.conditions}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-success px-4 float-end">
          {editingId ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
