import * as api from "../../api/api.js";
import config from "../../config/config.js";
import HTTPException from "../../models/http-exception-model.js";

const getAllAccounts = async (consent) => {
  if (!consent) {
    throw new HTTPException(400, "Invalid consent header");
  }
  const response = await api.GET(`${config.yapilyApiUrl}/accounts`, {
    consent,
  });
  return response;
};

const getAccountById = async (accountId, consent) => {
  const response = await api.GET(
    `${config.yapilyApiUrl}/accounts/${accountId}`,
    {
      consent,
    }
  );
  return response;
};

export { getAllAccounts, getAccountById };
