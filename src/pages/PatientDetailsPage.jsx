import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
import PatientDetails from "../components/Patient/PatientDetails";

const API_URL = import.meta.env.VITE_API_URL;

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${API_URL}/patients/${id}`);
        console.log("Single patient response:", res.data);

        // 👇 adjust depending on your API response shape
        setPatient(res.data.data || res.data); 
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {/* Sidebar */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ width: "80%", height: "100vh" }}>
        <Navbar />
        <div className="container" style={{ marginTop: 10 }}>
          <h3 className="mb-4" style={{ color: "black" }}>
            Patient Details
          </h3>

          {patient ? (
            <PatientDetails patient={patient} />
          ) : (
            <p className="text-muted">No patient data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
