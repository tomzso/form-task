import React from "react";
import "./formField.css";
import "../../formCard/formCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export const FormField = ({ label, widgetType, className, children, error }) => {
  return (
    <div className={`form-field form-field--${widgetType} form-field-width ${className || ""}`}>
      <div className="form-header-row">
        <label className="form-label">{label}</label>
         {error && <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="error-icon"/>}
      </div>
      {children}
    </div>
  );
};
