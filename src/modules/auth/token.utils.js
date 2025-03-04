import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const generateToken = (id) =>
  jwt.sign({ user: { id } }, config.jwtSecret, { expiresIn: "60d" });

export { generateToken };
