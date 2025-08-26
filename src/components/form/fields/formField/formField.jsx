import React from "react";
import "./formField.css";

export const FormField = ({ label, widgetType, children }) => {
  return (
    <div className={`form-field form-field--${widgetType}`}>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
};
