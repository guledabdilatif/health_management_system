import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react";
import DoctorsDetail from "./DoctorsDetail";
import { colors } from "../constant.js/colors";
import axios from "axios";

const API_URL = "https://health-mngt-system.vercel.app/staff"; // update to match your backend

const Staffs = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    staffId: "",
    staffType: "",
    department: "",
    employmentType: "Full-time",
    isActive: true,
    isSuspended: false,
    profilePhoto: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    password: "",
    specialization: "",
    qualifications: "",
    licenseNumber: "",
    licenseExpiry: "",
    yearsOfExperience: 0,
    consultationFee: 0,
  });

  // fetch staff
  const fetchStaff = async () => {
    try {
      const res = await axios.get(API_URL);
      setDoctors(res.data.data?.results || res.data.data || []);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStaff();
      } catch (err) {
        console.error("Error deleting staff:", err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // update staff
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        // add staff
        await axios.post(API_URL, formData);
      }
      fetchStaff();

      // close modal after save
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("staffModal")
      );
      modal.hide();
    } catch (err) {
      console.error("Error saving staff:", err);
    }
  };

  const startEdit = (staff) => {
    setEditingId(staff._id || staff.id);
    setFormData({
      fullName: staff.fullName || "",
      phone: staff.phone || "",
      email: staff.email || "",
      gender: staff.gender || "",
      dateOfBirth: staff.dateOfBirth || "",
      staffId: staff.staffId || "",
      staffType: staff.staffType || "",
      department: staff.department || "",
      employmentType: staff.employmentType || "Full-time",
      isActive: staff.isActive ?? true,
      isSuspended: staff.isSuspended ?? false,
      profilePhoto: staff.profilePhoto || "",
      emergencyContactName: staff.emergencyContactName || "",
      emergencyContactPhone: staff.emergencyContactPhone || "",
      password: "", // 🔒 keep empty
      specialization: staff.specialization || "",
      qualifications: staff.qualifications || "",
      licenseNumber: staff.licenseNumber || "",
      licenseExpiry: staff.licenseExpiry || "",
      yearsOfExperience: staff.yearsOfExperience || 0,
      consultationFee: staff.consultationFee || 0,
    });

    // 👉 open modal programmatically
    const modal = new window.bootstrap.Modal(
      document.getElementById("staffModal")
    );
    modal.show();
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
        <div className="container " style={{ marginTop: 90 }}>
          <h4 style={{ color: colors.secondary }}>Doctors Directory</h4>

          <div className="d-flex justify-content-end gap-4 align-items-center mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              className="form-control"
            />
            <form action="">
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
            </form>
            <form action="">
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
            </form>
            <button
              className="btn btn-success btn-sm float-end"
              data-bs-toggle="modal"
              data-bs-target="#staffModal"
            >
              + Add Staff
            </button>
          </div>

          {/* Table */}
          <table className="table table-bordered table-striped">
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={doc._id || doc.id}>
                  <td>{idx + 1}</td>
                  <td style={{ color: "black" }}>{doc.fullName || doc.name}</td>
                  <td style={{ color: "black" }}>
                    {doc.specialization || "-"}
                  </td>
                  <td style={{ color: "black" }}>{doc.phone}</td>
                  <td style={{ color: "black" }}>{doc.email}</td>
                  <td>
                    {doc.isActive || doc.status === "available" ? (
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
                  <td style={{ display: "flex" }}>
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
                      onClick={() => startEdit(doc)}
                      data-bs-toggle="modal"
                      data-bs-target="#staffModal"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(doc._id || doc.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add/Edit Staff Modal (kept intact) */}
          <div
            className="modal fade"
            id="staffModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{ maxWidth: "80%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {editingId ? "Edit Staff" : "Add Staff"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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

                      {/* DOB */}
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

                      {/* Emergency Contact */}
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

                      {/* Password */}
                      <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Doctor-Specific */}
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

                    {/* Submit */}
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-success px-4 float-end">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Detail Modal */}
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

export default Staffs;
