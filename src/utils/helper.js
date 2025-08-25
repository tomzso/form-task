export const getValidAnswers = (userAnswers, errors) =>
  Object.fromEntries(
    Object.entries(userAnswers).filter(([fieldId, value]) => {
      if (errors[fieldId]) return false;
      if (value === undefined || value === '') return false;
      return true;
    })
  );

export const getErrorMessage = (widget) => {
  if (widget === 'choice') return "Please select a choice";
  if (widget === 'text') return "Please enter an answer";
  if (widget === 'integer') return "Please enter a valid number";
  return "";
};