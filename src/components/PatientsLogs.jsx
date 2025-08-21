import React from "react";

const PatientsLogs = () => {
  const logs = [
    {
      id: 1,
      username: "John Doe",
      activity: "Working on Project A",
      location: "Nairobi, Kenya",
      date: "2025-08-18",
      status: "Active",
    },
    {
      id: 2,
      username: "Jane Smith",
      activity: "On Leave",
      location: "-",
      date: "2025-08-18",
      status: "Leave",
    },
    {
      id: 3,
      username: "Ali Ahmed",
      activity: "Client Meeting",
      location: "Mombasa, Kenya",
      date: "2025-08-18",
      status: "Active",
    },
    {
      id: 4,
      username: "Mary W.",
      activity: "Documentation",
      location: "Kisumu, Kenya",
      date: "2025-08-18",
      status: "Active",
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
              <th scope="col">Username</th>
              <th scope="col">Activity</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0,10).map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td className="fw-semibold">{log.username}</td>
                <td>{log.activity}</td>
                <td>
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  {log.location}
                </td>
                <td>{log.date}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      log.status === "Active"
                        ? "bg-success"
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
