// src/patients/PatientForm.jsx
import React from "react";
import { X } from 'lucide-react';
const PatientForm = ({ formData, handleChange, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit} style={{position:'relative'}}>
      <button
          type="button" 
                
          onClick={() => window.location.reload()} // refresh body on close
          style={{position:'absolute', right:'0', top:'-70px', border:'none'}}
        ><X size={28} color="green"/></button>
      <div className="row">
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

        {/* Date of Birth */}
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth?.split("T")[0] || ""}
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
          />
        </div>

        {/* Marital Status */}
        <div className="col-md-6">
          <label className="form-label">Marital Status</label>
          <select
            name="maritalStatus"
            className="form-select"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* Blood Group */}
        {/* Blood Group */}
        <div className="col-md-6">
          <label className="form-label">Blood Group</label>
          <select
            name="bloodGroup"
            className="form-select"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Blood Group --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Allergies */}
        <div className="col-md-6">
          <label className="form-label">Allergies (comma-separated)</label>
          <input
            type="text"
            name="allergies"
            className="form-control"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        {/* Chronic Conditions */}
        <div className="col-md-12">
          <label className="form-label">Chronic Conditions (comma-separated)</label>
          <input
            type="text"
            name="chronicConditions"
            className="form-control"
            value={formData.chronicConditions}
            onChange={handleChange}
          />
        </div>

        {/* Current Medications */}
        <div className="col-md-12">
          <label className="form-label">Current Medications (comma-separated)</label>
          <input
            type="text"
            name="currentMedications"
            className="form-control"
            value={formData.currentMedications}
            onChange={handleChange}
          />
        </div>

        {/* Address Fields */}
        <div className="col-md-12">
          <h5>Address</h5>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            className="form-control"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address.city"
            placeholder="City"
            className="form-control"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address.state"
            placeholder="State"
            className="form-control"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address.postalCode"
            placeholder="Postal Code"
            className="form-control"
            value={formData.address.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            className="form-control"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>

        {/* Emergency Contact */}
        <div className="col-md-12">
          <h5>Emergency Contact</h5>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="emergencyContact.name"
            placeholder="Name"
            className="form-control"
            value={formData.emergencyContact.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="emergencyContact.phone"
            placeholder="Phone"
            className="form-control"
            value={formData.emergencyContact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="emergencyContact.relation"
            placeholder="Relation"
            className="form-control"
            value={formData.emergencyContact.relation}
            onChange={handleChange}
          />
        </div>

        {/* Insurance */}
        <div className="col-md-12">
          <h5>Insurance</h5>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="insurance.provider"
            placeholder="Provider"
            className="form-control"
            value={formData.insurance.provider}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="insurance.policyNumber"
            placeholder="Policy Number"
            className="form-control"
            value={formData.insurance.policyNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            name="insurance.expiryDate"
            className="form-control"
            value={formData.insurance.expiryDate?.split("T")[0] || ""}
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
