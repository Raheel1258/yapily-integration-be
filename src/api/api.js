import HTTPException from "../models/http-exception-model.js";
import { getYapilyAuthHeaders } from "./utils.js";

const GET = async (url, headers = {}) => {
  const response = await fetch(url, {
    headers: { ...headers, ...getYapilyAuthHeaders() },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new HTTPException(
      data.error?.code ?? 500,
      data.error?.message ?? "Something went wrong"
    );
  }
  return data;
};

const POST = async (url, body = {}, headers = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers, ...getYapilyAuthHeaders() },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new HTTPException(
      data.error?.code ?? 500,
      data.error?.message ?? "Something went wrong"
    );
  }
  return data;
};

export { GET, POST };
