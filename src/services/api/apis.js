import { apiFetch } from "../../utils/apiHelper.js";

export const getApi = async (url) => {
  return await apiFetch("GET", url);
};

export const postApi = async (token, data, url) => {
  return await apiFetch("POST", url, token, data);
};



