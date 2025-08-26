import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log("User answers:", userAnswers);
  }, [userAnswers]);


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

    // Integer specific validation (empty OR not a valid number)
    if (widget === "integer") {
      if (value === "" || isNaN(Number(value))) {
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
    }

    setUserAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSaveResponse = async () => {
    console.log("User answers:", userAnswers);
    // add any other save logic here
  };

  if (loading) return <Loading />;

  return (
    <div className="render-form">
      <ProgressBar
        value={Math.round((filledValidCount / totalFields) * 100)}
      />

      <FormCard />


      {formLabels.map((field) => (
        <FormField key={field.id} label={field.label} widgetType={field.widget}>
          {field.widget === "choice" && (
            <ChoiceField
              field={field}
              options={choices[field.id]}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={handleInputChange}
            />
          )}

          {field.widget === "integer" && (
            <IntegerField
              field={field}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={handleInputChange}
            />
          )}

          {field.widget === "text" && (
            <TextField
              field={field}
              value={userAnswers[field.id]}
              error={errors[field.id]}
              onChange={handleInputChange}
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