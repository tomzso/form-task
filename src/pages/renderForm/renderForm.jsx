import React, { useEffect, useState, useRef } from "react";
import { useFormData } from "../../hooks/useFormData";
import { Loading } from "../../components/common/loading/loading";
import { ProgressBar } from "../../components/common/progressBar/progressBar";
import { getValidAnswers, getErrorMessage, getFirstInvalidFieldIndex, scrollToAndFocusElement  } from "../../utils/helper";

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
  const [userAnswers, setUserAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const inputRefs = useRef([]);

  const [flashFields, setFlashFields] = useState(new Set());

  // Function to trigger flashes for empty/invalid fields
  const flashMissingFields = (fieldIds) => {
    setFlashFields(new Set(fieldIds));
    setTimeout(() => setFlashFields(new Set()), 3000); // 400ms: match your animation
  };

  useEffect(() => {
    // Initialize refs array when formLabels change
    inputRefs.current = formLabels.map(
      (_, i) => inputRefs.current[i] || React.createRef()
    );
  }, [formLabels]);

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

  // Function to move to the next input (scroll/focus)
  const moveToNextField = (currentIndex) => {
    const nextRef = inputRefs.current[currentIndex + 1];
    if (nextRef && nextRef.current) {
      const element = nextRef.current;
      const start = window.scrollY;
      const end =
        element.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        element.offsetHeight / 2; // center element
      const duration = 500;
      let startTime = null;

      const animateScroll = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        window.scrollTo(0, start + (end - start) * progress);
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          element.focus(); // focus after scroll completes
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  // Handler for onKeyDown in Text/Integer field
  const handleFieldKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      moveToNextField(idx);
    }
  };

  // New function to mark only missing fields as errors
  const markMissingFieldsAsErrors = () => {
    const newErrors = {};
    formLabels.forEach((field) => {
      const fieldId = field.id;
      const fieldValue = userAnswers[fieldId];
      const widgetType = field.widget;

      let isMissing = false;

      if (widgetType === "choice" || widgetType === "text") {
        // For choice and text, an empty string or undefined means missing
        if (fieldValue === "" || fieldValue === undefined) {
          isMissing = true;
        }
      } else if (widgetType === "integer") {
        // For integer, empty string, undefined, or not a valid number means missing
        if (
          fieldValue === "" ||
          fieldValue === undefined ||
          isNaN(Number(fieldValue))
        ) {
          isMissing = true;
        }
      }

      if (isMissing) {
        newErrors[fieldId] = getErrorMessage(widgetType);
      }
    });

    // Update the errors state by merging newErrors with existing ones.
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleSaveResponse = async () => {
    markMissingFieldsAsErrors();

    const missingFields = formLabels
      .filter((field) => !userAnswers[field.id] || errors[field.id])
      .map((field) => field.id);

    if (missingFields.length > 0) {
      flashMissingFields(missingFields);
    }
    console.log("hello");

    const invalidIdx = getFirstInvalidFieldIndex(formLabels, userAnswers, errors);
    if (invalidIdx !== -1) {
      // Scroll and focus to the first invalid/empty field
      moveToNextField(invalidIdx - 1); // -1 because moveToNextField expects the previous index
      return;
    }
    // Everything is valid → do your save logic
    console.log("User answers:", userAnswers);
    // ... any further save logic
  };

  if (loading) return <Loading />;

  return (
    <div className="render-form">
      <ProgressBar
        value={Math.round(
          (Object.keys(getValidAnswers(userAnswers, errors)).length /
            formLabels.length) *
            100
        )}
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
