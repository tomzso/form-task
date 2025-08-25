import React, { useEffect, useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { Loading } from "../../components/common/loading/loading";

import { FormField } from "../../components/form/fields/formField";
import { ChoiceField } from "../../components/form/fields/choiceField";
import { IntegerField } from "../../components/form/fields/integerField";
import { TextField } from "../../components/form/fields/textField";

export const RenderForm = () => {
  const { formLabels, choices, loading } = useFormData();
  const [userAnswers, setUserAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("User answers:", userAnswers);
  }, [userAnswers]);

  const handleInputChange = (fieldId, value, widget) => {
    setUserAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (widget === "integer") {
      if (value === "" || isNaN(Number(value))) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: "Please enter a valid number",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    }
  };

  const handleSaveResponse = async () => {
    console.log("User answers:", userAnswers);
  };

  if (loading) return <Loading />;

  return (
    <div className="render-form">
      {formLabels.map((field) => (
        <FormField key={field.id} label={field.label}>
          {field.widget === "choice" && (
            <ChoiceField
              field={field}
              options={choices[field.id]}
              value={userAnswers[field.id]}
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
