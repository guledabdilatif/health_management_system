import React from "react";
import { Stethoscope , UserRound, Hospital , FileText } from "lucide-react";
import { colors } from "../constant.js/colors";

const DashboardCards = () => {
  const cards = [
    {
      title: "Doctors",
      value: 12,
      icon: <Stethoscope  size={32} color={colors.primary} />, // blue
    },
    {
      title: "Patients",
      value: 3,
      icon: <UserRound size={32} color={colors.primary} />, // green
    },
    {
      title: "Facilities",
      value: 25,
      icon: <Hospital  size={32} color={colors.primary} />, // yellow
    },
    {
      title: "Documents",
      value: 8,
      icon: <FileText size={32} color={colors.primary} />, // red
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card shadow-sm text-center p-3 border-0">
              <div className="mb-2">{card.icon}</div>
              <h5 className="fw-bold">{card.title}</h5>
              <p className="fs-4 mb-0">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
