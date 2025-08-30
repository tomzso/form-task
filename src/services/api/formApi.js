import { postApi, getApi } from "./apis.js";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const FORM_PATH = `${import.meta.env.VITE_API_URL_FORM_PATH}`
const CHOICE_PATH = `${import.meta.env.VITE_API_URL_CHOICE_PATH}`
const SAVE_PATH = `${import.meta.env.VITE_API_URL_SAVE_PATH}`

export const getLabels = async () => {
  let link = `${BASE_URL}${FORM_PATH}`;
  return await getApi(link);
};

export const getChoices = async (labelId) => {
  let link = `${BASE_URL}${CHOICE_PATH}/${labelId}`;
  return await getApi(link);
};

export const createForm = async ( userAnswers) => {
  let link = `${BASE_URL}${SAVE_PATH}`;
  return await postApi(userAnswers, link);
};