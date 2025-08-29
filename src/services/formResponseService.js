import { createForm } from "./api/formApi";

/**
 * Saves the user answers via API.
 * @param {Object} userAnswers - The user's responses.
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export const saveFormResponse = async (userAnswers) => {
  try {
    const response = await createForm(userAnswers);
    if (response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Failed to save form response" };
    }
  } catch (err) {
    return { success: false, error: err.message || "Error saving form response" };
  }
};
