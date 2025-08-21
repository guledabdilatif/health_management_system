import React from "react";
import { User, X } from "lucide-react";
import { colors } from "../constant.js/colors";

const DoctorsDetail = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "90%",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <h4>Doctor Details</h4>
                    <button className="btn btn-sm btn-light" onClick={onClose}>
                        <X size={18} />
                    </button>

                </div>

                {/* Doctor Info */}
                <div className="row">
                    <div className="col-md-4 text-center">
                        <div className=" d-flex flex-column align-items-center shadow p-4 rounded mb-4">
                            <User size={48} color={colors.primary} />
                            <p>{doctor.name}</p>
                            <button className="btn btn-success btn-sm">Update</button>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-4">
                                <div className=" p-4 shadow rounded">
                                     card 1
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=" p-4 shadow rounded">
                                     card 2
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=" p-4 shadow rounded">
                                    card 3
                                </div>
                            </div>
                        </div>.
                        <div className="col-md-12 mb-4 p-4 shadow rounded">
                            card 4
                        </div>
                        <h2>Apointments</h2>

                    </div>
                </div>

                <div>
                    <h2>Information</h2>
                    <p><strong>Specialization:</strong> {doctor.specialization}</p>
                    <p><strong>Phone:</strong> {doctor.phone}</p>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Status:</strong> {doctor.status}</p>
                    <p><strong>Location:</strong> {doctor.location}</p>
                </div>

            </div>
        </div>
    );
};

export default DoctorsDetail;
