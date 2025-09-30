// src/components/Patient/PatientDetails.jsx
import React, { useState } from "react";
import { User, Printer, Eye, Trash2 } from "lucide-react";

const PatientDetails = ({ patient }) => {
  const [activeTab, setActiveTab] = useState("prescriptions"); // toggle
  const [showModal, setShowModal] = useState(false);

  // Prescriptions
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  // Appointments
  const [appointment, setAppointment] = useState({
    date: "",
    reason: "",
  });
  const [appointments, setAppointments] = useState([]);

  if (!patient) return null;

  // handle prescription submit
  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;

    const newPrescription = {
      id: Date.now(),
      notes,
      date: new Date().toLocaleString(),
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setNotes("");
    setShowModal(false);
  };

  // handle appointment submit
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!appointment.date || !appointment.reason) return;

    const newAppointment = {
      id: Date.now(),
      date: appointment.date,
      reason: appointment.reason,
    };

    setAppointments([...appointments, newAppointment]);
    setAppointment({ date: "", reason: "" });
    setShowModal(false);
  };

  // print prescription
  const handlePrintPrescription = (prescription) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Prescription</title></head>
        <body>
          <h2>Prescription for ${patient.fullName}</h2>
          <p><strong>Date:</strong> ${prescription.date}</p>
          <p><strong>Notes:</strong></p>
          <p>${prescription.notes}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // print appointment
  const handlePrintAppointment = (appointment) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Appointment</title></head>
        <body>
          <h2>Appointment for ${patient.fullName}</h2>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Reason:</strong></p>
          <p>${appointment.reason}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // delete prescription
  const handleDeletePrescription = (id) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  // delete appointment
  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <div className="card shadow p-4">
      <div className="row mb-4">
        {/* Left Column: Patient info */}
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

        {/* Right Column: Toggle + Content */}
        <div className="col-md-8">
          {/* Toggle buttons */}
          <div className="d-flex mb-3 justify-content-between align-items-center">
            <div>
              <button
                className={`btn btn-sm me-2 ${activeTab === "prescriptions" ? "btn-success" : "btn-outline-dark"}`}
                onClick={() => setActiveTab("prescriptions")}
              >
                Prescriptions
              </button>
              <button
                className={`btn btn-sm ${activeTab === "appointments" ? "btn-success" : "btn-outline-dark"}`}
                onClick={() => setActiveTab("appointments")}
              >
                Appointments
              </button>
            </div>
            <button
              className="btn btn-success float-end btn-sm mb-3"
              onClick={() => setShowModal(true)}
            >
              + Add {activeTab === "prescriptions" ? "Prescription" : "Appointment"}
            </button>
          </div>

          {/* Prescription Table */}
          {activeTab === "prescriptions" && prescriptions.length > 0 && (
            <div>
              <h6 style={{ margin: "10px 0" }}>Prescriptions for <b>{patient.fullName}</b></h6>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p.id}>
                      <td>{p.date}</td>
                      <td>{p.notes}</td>
                      <td className="d-flex">
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => alert(p.notes)}
                        >
                          <Eye className="text-success" />
                        </button>
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => handlePrintPrescription(p)}
                        >
                          <Printer className="text-primary" />
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeletePrescription(p.id)}
                        >
                          <Trash2 className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Appointments Table */}
          {activeTab === "appointments" && appointments.length > 0 && (
            <div>
              <h6 style={{ margin: "10px 0" }}>Appointments for <b>{patient.fullName}</b></h6>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id}>
                      <td>{a.date}</td>
                      <td>{a.reason}</td>
                      <td className="d-flex">
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => alert(a.reason)}
                        >
                          <Eye className="text-success" />
                        </button>
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => handlePrintAppointment(a)}
                        >
                          <Printer className="text-primary" />
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteAppointment(a.id)}
                        >
                          <Trash2 className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={
                  activeTab === "prescriptions"
                    ? handlePrescriptionSubmit
                    : handleAppointmentSubmit
                }
              >
                <div className="modal-header">
                  <h5 className="modal-title">
                    Add {activeTab === "prescriptions" ? "Prescription" : "Appointment"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {activeTab === "prescriptions" ? (
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      <textarea
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={appointment.date}
                          onChange={(e) =>
                            setAppointment({ ...appointment, date: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Reason</label>
                        <textarea
                          className="form-control"
                          value={appointment.reason}
                          onChange={(e) =>
                            setAppointment({ ...appointment, reason: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save {activeTab === "prescriptions" ? "Prescription" : "Appointment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
