import { apiFetch } from "../../utils/apiHelper.js";

export const getApi = async (url) => {
  return await apiFetch("GET", url);
};

export const postApi = async (userAnswers, url) => {
  return await apiFetch("POST", url, userAnswers);
};