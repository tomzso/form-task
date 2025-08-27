import React from "react";
import "./formField.css";
import "../../formCard/formCard";

export const FormField = ({ label, widgetType, children }) => {
  return (
    <div className={`form-field form-field--${widgetType} form-field-width`}>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
};
