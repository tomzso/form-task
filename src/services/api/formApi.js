import { postApi, getApi} from "./apis.js";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const FORM_PATH = `${import.meta.env.VITE_API_URL_FORM_PATH}`
const CHOICE_PATH = `${import.meta.env.VITE_API_URL_CHOICE_PATH}`


export const getLabels = async () => {
  let link = `${BASE_URL}${FORM_PATH}`;
  return await getApi(link);
};

export const getChoices = async (labelId) => {
  let link = `${BASE_URL}${CHOICE_PATH}/${labelId}`;
  return await getApi(link);
};



export const createForm = async (token, formTitle, formDescription, type) => {

  if (!formTitle || formTitle === "") {
    console.error("Error: Form title is required");
    return {
      success: false,
      message: "Form title is required.",
    };
  }

  const form = {
    title: formTitle,
    description: formDescription,
    status: "draft", // default status,
    type: type,
  };

  return await postApi(token, form, BASE_URL);
};

export const getFormByUser = async (token) => {
  let url = `${BASE_URL}/user`;
  return await getApi(token, url);
};




