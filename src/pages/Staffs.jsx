import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react";
import DoctorsDetail from "./StaffDetails";
import { colors } from "../constant.js/colors";
import axios from "axios";
import Form from "../components/Staffs/Form";

const API_URL = "https://health-mngt-system.vercel.app/staff";

const Staffs = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editingId, setEditingId] = useState(null);

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

  // Fetch staff list
  const fetchStaff = async () => {
    try {
      const res = await axios.get(API_URL);
      // support a few shapes: { staff: [...] } or { data: { results: [...] } } or direct array
      setDoctors(res.data.staff || res.data.data?.results || res.data.data || res.data || []);
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
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      // reload to reflect deletion
      window.location.reload();
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit -> create or update, then hide modal and reload page
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare payload
    const payload = {
      ...formData,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
      },
      qualifications: formData.qualifications
        ? formData.qualifications.split(",").map((q) => q.trim()).filter(Boolean)
        : [],
    };

    // if editing and password is empty, don't send password to avoid overwriting
    if (editingId && (!payload.password || payload.password === "")) {
      delete payload.password;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      // Try to hide modal (works when bootstrap JS is loaded). If not available, fallback to clicking close btn.
      const modalEl = document.getElementById("staffModal");
      if (modalEl) {
        try {
          if (window.bootstrap && window.bootstrap.Modal) {
            const inst = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
            inst.hide();
          } else {
            const closeBtn = modalEl.querySelector('[data-bs-dismiss="modal"], .btn-close');
            if (closeBtn) closeBtn.click();
          }
        } catch (hideErr) {
          console.warn("Could not hide modal via Bootstrap API, falling back to click:", hideErr);
          const closeBtn = modalEl.querySelector('[data-bs-dismiss="modal"], .btn-close');
          if (closeBtn) closeBtn.click();
        }
      }

      // Full reload as you requested
      window.location.reload();
    } catch (err) {
      console.error("Error saving staff:", err.response?.data || err);
      // you can show an alert/toast here if you want
    }
  };

  // start edit: prefill form and open modal (we rely on data-bs-toggle on button OR programmatic show)
  const startEdit = (staff) => {
    setEditingId(staff._id || staff.id);
    setFormData({
      fullName: staff.fullName || staff.name || "",
      phone: staff.phone || "",
      email: staff.email || "",
      gender: staff.gender || "",
      dateOfBirth: staff.dateOfBirth ? staff.dateOfBirth.split("T")[0] : "",
      staffId: staff.staffId || "",
      staffType: staff.staffType || "",
      department: staff.department || "",
      employmentType: staff.employmentType || "Full-time",
      isActive: staff.isActive ?? true,
      isSuspended: staff.isSuspended ?? false,
      profilePhoto: staff.profilePhoto || "",
      emergencyContactName: staff.emergencyContact?.name || staff.emergencyContactName || "",
      emergencyContactPhone: staff.emergencyContact?.phone || staff.emergencyContactPhone || "",
      password: "", // keep empty during edit
      specialization: staff.specialization || "",
      qualifications: Array.isArray(staff.qualifications) ? staff.qualifications.join(", ") : (staff.qualifications || ""),
      licenseNumber: staff.licenseNumber || "",
      licenseExpiry: staff.licenseExpiry ? staff.licenseExpiry.split("T")[0] : "",
      yearsOfExperience: staff.yearsOfExperience || 0,
      consultationFee: staff.consultationFee || 0,
    });

    try {
      if (window.bootstrap && window.bootstrap.Modal) {
        const modalEl = document.getElementById("staffModal");
        const inst = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        inst.show();
      }
    } catch (err) {
    }
  };

  // search and filters 
  const [filters, setFilters] = useState({
    search: "",
    employmentType: "",
    staffType: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  // Apply search & filters
  const filteredDoctors = doctors.filter((doc) => {
    const searchMatch =
      filters.search === "" ||
      (doc.fullName?.toLowerCase().includes(filters.search.toLowerCase())) ||
      (doc.email?.toLowerCase().includes(filters.search.toLowerCase()));

    const employmentMatch =
      filters.employmentType === "" ||
      doc.employmentType === filters.employmentType;

    const staffTypeMatch =
      filters.staffType === "" ||
      doc.staffType === filters.staffType;

    return searchMatch && employmentMatch && staffTypeMatch;
  });


  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {/* Sidebar */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ width: "80%", height: "100vh" }}>
        <Navbar />
        <div className="container" style={{ marginTop: 90 }}>
          <h4 style={{ color: colors.secondary }}>Doctors Directory</h4>

          {/* search and filters  */}
          <div className="d-flex justify-content-around mb-4 gap-3 align-items-center">
            {/* Search */}
            <input
              type="text"
              name="search"
              placeholder="Search by name or email"
              className="form-control"
              value={filters.search}
              onChange={handleFilterChange}
            />

            {/* Employment Type */}
            <select
              name="employmentType"
              className="form-select"
              value={filters.employmentType}
              onChange={handleFilterChange}
            >
              <option value="">All Employment Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            {/* Staff Type */}
            <select
              name="staffType"
              className="form-select"
              value={filters.staffType}
              onChange={handleFilterChange}
            >
              <option value="">All Staff Types</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="LabTech">LabTech</option>
              <option value="Pharmacist">Pharmacist</option>
            </select>

            {/* Add Staff Button */}
            <button
              className="btn btn-success btn-sm float-end"
              style={{ minWidth: "120px" }}
              data-bs-toggle="modal"
              data-bs-target="#staffModal"
              onClick={() => {
                setEditingId(null);
                setFormData({
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
              }}
            >
              + Add Staff
            </button>
          </div>
          {/* end search & filter  */}

          {/* Table */}
          <table className="table table-bordered table-striped">
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Staff</th>
                <th>Staff Type</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc, idx) => (
                <tr key={doc._id || doc.id}>
                  <td>{idx + 1}</td>
                  <td style={{ color: "black" }}>{doc.fullName || doc.name}</td>
                  <td style={{ color: "black" }}>{doc.specialization || "-"}</td>
                  <td style={{ color: "black" }}>{doc.phone}</td>
                  <td style={{ color: "black" }}>{doc.email}</td>
                  <td>
                    {doc.isActive || doc.status === "available" ? (
                      <span className="badge" style={{ backgroundColor: "green", color: "white" }}>
                        Available
                      </span>
                    ) : (
                      <span className="badge" style={{ backgroundColor: "red", color: "white" }}>
                        On Leave
                      </span>
                    )}
                  </td>
                  <td style={{ display: "flex" }}>
                    <button type="button" className="btn btn-sm btn-info me-2" onClick={() => handleView(doc)}>
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

                    <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(doc._id || doc.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add/Edit Staff Modal */}
          <div className="modal fade" id="staffModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: "80%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {editingId ? "Edit Staff" : "Add Staff"}
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                  />

                </div>
              </div>
            </div>
          </div>

          {/* Doctor Detail Modal */}
          {selectedDoctor && <DoctorsDetail doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}
        </div>
      </div>
    </div>
  );
};

export default Staffs;
