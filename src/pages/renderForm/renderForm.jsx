import React, { useEffect, useState, useRef  } from "react";
import { useFormData } from "../../hooks/useFormData";
import { Loading } from "../../components/common/loading/loading";
import { ProgressBar } from "../../components/common/progressBar/progressBar";
import { getValidAnswers, getErrorMessage } from "../../utils/helper";

import { FormField } from "../../components/form/fields/formField/formField";
import { ChoiceField } from "../../components/form/fields/choiceField/choiceField";
import { IntegerField } from "../../components/form/fields/integerField/integerField";
import { TextField } from "../../components/form/fields/textField/textField";
import { FormCard } from "../../components/form/formCard/formCard";

export const RenderForm = () => {
  const { formLabels, choices, loading } = useFormData();
  const [userAnswers, setUserAnswers] = useState({});
  const [errors, setErrors] = useState({});

  // Variables for progress bar
  const totalFields = formLabels.length;
  const validAnswers = getValidAnswers(userAnswers, errors);
  const filledValidCount = Object.keys(validAnswers).length;

  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array when formLabels change
    inputRefs.current = formLabels.map((_, i) => inputRefs.current[i] || React.createRef());
  }, [formLabels]);

  /*
  useEffect(() => {
    console.log("User answers:", userAnswers);
  }, [userAnswers]);
*/



  const handleInputChange = (fieldId, value, widget) => {
    // Handle empty value for "choice" and "text"
    if ((widget === "choice" || widget === "text") && (value === "" || value === undefined)) {
      setUserAnswers((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
      setErrors((prev) => ({
        ...prev,
        [fieldId]: getErrorMessage(widget)
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
        [fieldId]: getErrorMessage(widget)
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
    console.log("User answers:", userAnswers);
    // add any other save logic here
  };

  // Function to move to the next input (scroll/focus)
const moveToNextField = (currentIndex) => {
  const nextRef = inputRefs.current[currentIndex + 1];
  if (nextRef && nextRef.current) {
    const element = nextRef.current;
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + element.offsetHeight / 2; // center element
    const duration = 200;
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

  if (loading) return <Loading />;

  return (
    <div className="render-form">
      <ProgressBar value={Math.round((Object.keys(getValidAnswers(userAnswers, errors)).length / formLabels.length) * 100)} />
      <FormCard />
      {formLabels.map((field, idx) => (
        <FormField key={field.id} label={field.label} widgetType={field.widget}>
          {field.widget === "choice" && (
            <ChoiceField
              field={field}
              options={choices[field.id]}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={(id, value, widget) => {
                handleInputChange(id, value, widget);
                if (value) moveToNextField(idx); // jump to next after select
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
        <button className="save-button" onClick={handleSaveResponse}>
          Save Answers
        </button>
      </div>
    </div>
  );
};