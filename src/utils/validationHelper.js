export const getValidAnswers = (userAnswers, errors) =>
  Object.fromEntries(
    Object.entries(userAnswers).filter(([fieldId, value]) => {
      if (errors[fieldId]) return false;
      if (value === undefined || value === "") return false;
      return true;
    })
  );

export const getErrorMessage = (widget) => {
  if (widget === "choice") return "Please select a choice";
  if (widget === "text") return "Please enter an answer";
  if (widget === "integer") return "Please enter a valid number";
  return "";
};

export const getFirstInvalidFieldIndex = (formLabels, userAnswers, errors) => {
  for (let i = 0; i < formLabels.length; i++) {
    const field = formLabels[i];
    // Check if this field is NOT in userAnswers or if there's an error
    if (!userAnswers[field.id] || errors[field.id]) {
      return i;
    }
  }
  return -1;
};

export const markMissingFieldsAsErrors = (formLabels, userAnswers) => {
  const newErrors = {};

  formLabels.forEach((field) => {
    const fieldId = field.id;
    const fieldValue = userAnswers[fieldId];
    const widgetType = field.widget;

    let isMissing = false;

    if (widgetType === "choice" || widgetType === "text") {
      if (fieldValue === "" || fieldValue === undefined) {
        isMissing = true;
      }
    } else if (widgetType === "integer") {
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

  return newErrors;
};
