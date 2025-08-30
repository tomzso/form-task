import React, { useEffect, useState, useRef } from "react";
import { useFormData } from "../../hooks/useFormData";
import { useFieldNavigation } from "../../hooks/useFieldNavigation";
import { useFlashFields } from "../../hooks/useFlashFields";
import { useNotification } from "../../hooks/useNotification";
import { getValidAnswers, getErrorMessage, getFirstInvalidFieldIndex, markMissingFieldsAsErrors } from "../../utils/validationHelper";

import { saveFormResponse } from "../../services/formResponseService";

import { Loading } from "../../components/common/loading/loading";
import { ProgressBar } from "../../components/common/progressBar/progressBar";
import { Notification } from "../../components/common/notification/notification";

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
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";



export const RenderForm = () => {
  const notificationDuration = 5000;

  const { formLabels, choices, loading } = useFormData();
  const { inputRefs, moveToNextField, handleFieldKeyDown } = useFieldNavigation(formLabels);

  const [userAnswers, setUserAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const { flashFields, flashMissingFields } = useFlashFields();
  const { notification, showNotification } = useNotification(notificationDuration);





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

  const handleValidateResponse = (saveResponse) => {
    const newErrors = markMissingFieldsAsErrors(formLabels, userAnswers);

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    const missingFields = formLabels
      .filter((field) => !userAnswers[field.id] || errors[field.id] || newErrors[field.id])
      .map((field) => field.id);

    if (missingFields.length > 0) {
      flashMissingFields(missingFields);
      showNotification("Please fill in all required fields correctly!", "warning");
    } else {
      if(!saveResponse){
        showNotification("All fields are valid!", "validation-success");
      }
    }

    const invalidIdx = getFirstInvalidFieldIndex(formLabels, userAnswers, {
      ...errors,
      ...newErrors,
    });

    if (invalidIdx !== -1) {
      moveToNextField(invalidIdx - 1);
      return false;
    }

    return true;
  };

  const handleSaveResponse = async () => {
    const validUserAnswer = handleValidateResponse(true);
    if (validUserAnswer) {
      const result = await saveFormResponse(userAnswers);
      if (result.success) {
        showNotification("Saved successfully!", "success");
        console.log("User response saved successfully:", result.data);
      } else {
        showNotification("Server error!", "error");
        console.error(result.error);
      }
    }
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
              lastField={idx === formLabels.length - 1}
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
          onClick={() => handleValidateResponse(false)}
        >
          Review <FontAwesomeIcon icon={faTriangleExclamation} size="lg" />
        </button>
      </div>

      <Notification message={notification.message} type={notification.type} duration={notification.duration} />


    </div>
  );
};
