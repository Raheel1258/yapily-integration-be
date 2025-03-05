import * as api from "../../api/api.js";
import config from "../../config/config.js";

const getInstitutions = async () => {
  const institutions = await api.GET(`${config.yapilyApiUrl}/institutions`);
  return institutions;
};

const getInstitutionById = async (id) => {
  const institution = await api.GET(
    `${config.yapilyApiUrl}/institutions/${id}`
  );
  return institution;
};

export { getInstitutions, getInstitutionById };
