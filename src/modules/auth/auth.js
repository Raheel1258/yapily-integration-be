import { expressjwt as jwt } from "express-jwt";
import config from "../../config/config.js";

const auth = {
  required: jwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: config.jwtSecret,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};

export { auth }