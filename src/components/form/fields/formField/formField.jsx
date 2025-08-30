import React from "react";
import "./formField.css";
import "../../formCard/formCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faParagraph,
  faListUl,
  faInfo
} from "@fortawesome/free-solid-svg-icons";

export const FormField = ({ label, widgetType, className, children, error = false }) => {
  return (
    <div className={`form-field form-field--${widgetType} form-field-width ${className || ""}`}>
      <div className="form-header-row">
        <label className="form-label">{label}</label>
        {error && <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="error-icon"/>}
        {!error && widgetType === "text" && <FontAwesomeIcon icon={faParagraph} size="1x" className="type-icon"/>}
        {!error && widgetType === "integer" && <FontAwesomeIcon icon={faInfo} size="1x" className="type-icon"/>}
        {!error && widgetType === "choice" && <FontAwesomeIcon icon={faListUl} size="1x" className="type-icon"/>}
      </div>
      {children}
    </div>
  );
};
