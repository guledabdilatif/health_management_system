import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import { Eye, Edit, Trash2 } from "lucide-react";

const Documents = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      employee: "John Doe",
      task: "Prepare Monthly Report",
      dueDate: "2025-08-25",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      task: "Client Presentation",
      dueDate: "2025-08-22",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    employee: "",
    task: "",
    dueDate: "",
  });

  const employees = ["John Doe", "Jane Smith", "Michael Johnson"]; // dummy employees

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        ...newTask,
        status: "Pending", // default
      },
    ]);
    setNewTask({ employee: "", task: "", dueDate: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleShow = (task) => {
    alert(`Task: ${task.task}\nAssigned to: ${task.employee}\nDue: ${task.dueDate}`);
  };

  const handleEdit = (task) => {
    setNewTask({ employee: task.employee, task: task.task, dueDate: task.dueDate });
    setTasks(tasks.filter((t) => t.id !== task.id)); // temporarily remove until re-added
    setShowForm(true);
  };

  // Calculate remaining days
  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0; // if overdue, show 0
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

        <div className="d-flex justify-content-between align-items-center my-3">
          <h3 style={{ color: "black" }}>Tasks Management</h3>
          <button
            className="btn"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => setShowForm(true)}
          >
            + Assign Task
          </button>
        </div>

        {/* Task Table */}
        <table className="table table-bordered text-center">
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Days Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.employee}</td>
                <td>{t.task}</td>
                <td>{t.dueDate}</td>
                <td>
                  {calculateDaysRemaining(t.dueDate)}{" "}
                  {calculateDaysRemaining(t.dueDate) === 1 ? "day" : "days"}
                </td>
                <td
                  style={{
                    color: t.status === "Completed" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {t.status}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleShow(t)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleEdit(t)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Assign Task Form (Centered Overlay) */}
        {showForm && (
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
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                width: "60%",
              }}
            >
              <h4 style={{ color: "black" }}>Assign New Task</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Employee</label>
                  <select
                    className="form-control"
                    name="employee"
                    value={newTask.employee}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp, idx) => (
                      <option key={idx} value={emp}>
                        {emp}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Task</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="task"
                    value={newTask.task}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
