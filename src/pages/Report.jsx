import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import autoTable from "jspdf-autotable"; // ✅ Correct import

const Report = () => {
  const [reports] = useState([
    { id: 1, employee: "John Doe", task: "Prepare Sales Report", status: "Completed", daysTaken: 3 },
    { id: 2, employee: "Jane Smith", task: "Client Follow-up", status: "Pending", daysTaken: 5 },
    { id: 3, employee: "Ali Mohamed", task: "System Upgrade", status: "Completed", daysTaken: 7 },
  ]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Reports", 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [["#", "Employee", "Task", "Status", "Days Taken"]],
      body: reports.map((r, i) => [i + 1, r.employee, r.task, r.status, r.daysTaken]),
      styles: { halign: "center", valign: "middle" },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Black header, white text
    });

    doc.save("reports.pdf");
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

        <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold text-dark">Reports</h2>
            <button onClick={exportPDF} className="btn btn-danger">
              <Download /> <span>Export as PDF</span>
            </button>
          </div>

          {/* Reports Table */}
          <table className="table table-striped table-bordered w-100 text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Task</th>
                <th>Status</th>
                <th>Days Taken</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.employee}</td>
                  <td>{report.task}</td>
                  <td>
                    <span
                      className={`badge ${
                        report.status === "Completed" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>{report.daysTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
