import { getChoices as apiGetChoices } from "./api/formApi";

/**
 * Fetches all choice options for the given form labels.
 * @param {Array} formLabels - Array of form field definitions
 * @returns {Promise<Object>} - Object with fieldId as key and choices array as value
 */
export const fetchChoicesForForm = async (formLabels) => {
  const choices = {};

  for (const field of formLabels) {
    if (field.widget === "choice") {
      const choiceData = await apiGetChoices(field.id);
      choices[field.id] = choiceData.data;
    }
  }

  return choices;
};
