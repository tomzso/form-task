import React, { useEffect, useState, useRef } from "react";
import { useFormData } from "../../hooks/useFormData";
import { useFieldNavigation } from "../../hooks/useFieldNavigation";
import { useFlashFields } from "../../hooks/useFlashFields";

import { Loading } from "../../components/common/loading/loading";
import { ProgressBar } from "../../components/common/progressBar/progressBar";
import { getValidAnswers, getErrorMessage, getFirstInvalidFieldIndex, markMissingFieldsAsErrors } from "../../utils/validationHelper";

import { FormField } from "../../components/form/fields/formField/formField";
import { ChoiceField } from "../../components/form/fields/choiceField/choiceField";
import { IntegerField } from "../../components/form/fields/integerField/integerField";
import { TextField } from "../../components/form/fields/textField/textField";
import { FormCard } from "../../components/form/formCard/formCard";

import "./renderForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export const RenderForm = () => {
  const { formLabels, choices, loading } = useFormData();
  const { inputRefs, moveToNextField, handleFieldKeyDown } = useFieldNavigation(formLabels);

  const [userAnswers, setUserAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const { flashFields, flashMissingFields } = useFlashFields();

  const handleInputChange = (fieldId, value, widget) => {
    // Handle empty value for "choice" and "text"
    if (
      (widget === "choice" || widget === "text") &&
      (value === "" || value === undefined)
    ) {
      setUserAnswers((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
      setErrors((prev) => ({
        ...prev,
        [fieldId]: getErrorMessage(widget),
      }));
      return;
    }

    // Handle value reset if valid for "choice" or "text"
    if (widget === "choice" || widget === "text") {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
    }

    setUserAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Integer specific validation (empty OR not a valid number)
    if (widget === "integer" && (value === "" || isNaN(Number(value)))) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: getErrorMessage(widget),
      }));
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
    }
  };


  const handleSaveResponse = async () => {
    const newErrors = markMissingFieldsAsErrors(formLabels, userAnswers);

    // Merge newErrors with existing ones
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    const missingFields = formLabels
      .filter((field) => !userAnswers[field.id] || errors[field.id] || newErrors[field.id])
      .map((field) => field.id);

    if (missingFields.length > 0) {
      flashMissingFields(missingFields);
    }

    const invalidIdx = getFirstInvalidFieldIndex(formLabels, userAnswers, {
      ...errors,
      ...newErrors,
    });

    if (invalidIdx !== -1) {
      moveToNextField(invalidIdx - 1);
      return;
    }

    console.log("User answers:", userAnswers);
    // ... any further save logic
  };


  if (loading) return <Loading />;

  return (
    <div className="render-form">
      <ProgressBar
        value={Math.round(
          (Object.keys(getValidAnswers(userAnswers, errors)).length / formLabels.length) * 100)}
      />
      <FormCard />
      {formLabels.map((field, idx) => (
        <FormField
          key={field.id}
          label={field.label}
          widgetType={field.widget}
          className={flashFields.has(field.id) ? "form-field--flash" : ""}
          error={errors[field.id]}
        >
          {field.widget === "choice" && (
            <ChoiceField
              field={field}
              options={choices[field.id]}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={(id, value, widget) => {
                handleInputChange(id, value, widget);
                if (value) moveToNextField(idx);
              }}
              inputRef={inputRefs.current[idx]}
            />
          )}

          {field.widget === "integer" && (
            <IntegerField
              field={field}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={handleInputChange}
              inputRef={inputRefs.current[idx]}
              onKeyDown={(e) => handleFieldKeyDown(e, idx)}
            />
          )}

          {field.widget === "text" && (
            <TextField
              field={field}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={handleInputChange}
              inputRef={inputRefs.current[idx]}
              onKeyDown={(e) => handleFieldKeyDown(e, idx)}
            />
          )}
        </FormField>
      ))}
      <div className="form-actions">
        <button
          className="save-button form-button"
          onClick={handleSaveResponse}
        >
          Submit <FontAwesomeIcon icon={faCheck} size="lg" />
        </button>

        <button
          className="review-button form-button"
          onClick={handleSaveResponse}
        >
          Review <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
        </button>
      </div>
    </div>
  );
};
