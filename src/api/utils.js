import config from "../config/config.js";

const getYapilyAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      `${config.applicationId}:${config.applicationSecret}`
    ).toString("base64")} `,
  };
};

export { getYapilyAuthHeaders }