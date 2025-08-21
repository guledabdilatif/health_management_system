import React from "react";

const PatientsLogs = () => {
  const logs = [
    {
      id: 1,
      name: "John Doe",
      diagnosis: "Malaria",
      ward: "Ward 3A - Nairobi, Kenya",
      admissionDate: "2025-08-15",
      status: "Admitted",
    },
    {
      id: 2,
      name: "Jane Smith",
      diagnosis: "Fracture - Left Arm",
      ward: "Ward 1B - Nairobi, Kenya",
      admissionDate: "2025-08-10",
      status: "Discharged",
    },
    {
      id: 3,
      name: "Ali Ahmed",
      diagnosis: "Diabetes Check-up",
      ward: "Outpatient - Mombasa, Kenya",
      admissionDate: "2025-08-18",
      status: "Under Treatment",
    },
    {
      id: 4,
      name: "Mary W.",
      diagnosis: "Pneumonia",
      ward: "Ward 2C - Kisumu, Kenya",
      admissionDate: "2025-08-17",
      status: "Admitted",
    },
  ];

  return (
    <div className="mt-4">
      <h4 className="mb-3 fw-bold">Patients Logs</h4>
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Ward/Room</th>
              <th scope="col">Admission Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 10).map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td className="fw-semibold">{log.name}</td>
                <td>{log.diagnosis}</td>
                <td>
                  <i className="bi bi-hospital text-danger me-2"></i>
                  {log.ward}
                </td>
                <td>{log.admissionDate}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      log.status === "Admitted"
                        ? "bg-success"
                        : log.status === "Discharged"
                        ? "bg-secondary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsLogs;
