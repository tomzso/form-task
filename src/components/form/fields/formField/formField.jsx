import React from "react";
import "./formField.css";
import "../../formCard/formCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faParagraph,
  faListUl,
  faInfo,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

export const FormField = ({ label, widgetType, className, children, warning = false, error = false }) => {
  return (
    <div className={`form-field form-field--${widgetType} form-field-width ${className || ""}`}>
      <div className="form-header-row">
        <label className="form-label">{label}</label>
        {warning && !error && <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="warning-icon"/>}
        {error && <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="error-icon"/>}
        {!error && !warning && widgetType === "text" && <FontAwesomeIcon icon={faParagraph} size="1x" className="type-icon"/>}
        {!error && !warning && widgetType === "integer" && <FontAwesomeIcon icon={faInfo} size="1x" className="type-icon"/>}
        {!error && !warning && widgetType === "choice" && <FontAwesomeIcon icon={faListUl} size="1x" className="type-icon"/>}
      </div>
      {children}
    </div>
  );
};
