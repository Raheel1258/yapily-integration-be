import config from "../../config/config.js";
import HTTPException from "../../models/http-exception-model.js";
import { generateToken } from "./token.utils.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

const checkUserUniqueness = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HTTPException(422, "A user by that email already exists");
  }
};

const createUser = async (email, password) => {
  if (!email) {
    throw new HTTPException(422, "Email is required");
  }

  if (!password) {
    throw new HTTPException(422, "Password is required");
  }

  await checkUserUniqueness(email);

  const response = await fetch(`https://api.yapily.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Basic ${Buffer.from(
        `${config.applicationId}:${config.applicationSecret}`
      ).toString("base64")}`,
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new HTTPException(data.error?.code ?? 500, data.error.message);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({
    email,
    password: hashedPassword,
    uuid: data.uuid,
    applicationUuid: data.applicationUuid,
    referenceId: data.referenceId,
    institutionConsents: data.institutionConsents,
  }).save();

  return {
    id: user._id,
    uuid: user.uuid,
    applicationUuid: user.applicationUuid,
    referenceId: user.referenceId,
    institutionConsents: user.institutionConsents,
    accessToken: generateToken(user._id),
  };
};

const loginUser = async (email, password) => {
  const userEmail = email.trim();
  const userPassword = password.trim();

  if (!email) {
    throw new HTTPException(422, "Email is required");
  }

  if (!password) {
    throw new HTTPException(422, "Password is required");
  }

  const user = await User.findOne({ email: userEmail });

  if (user) {
    const match = await bcrypt.compare(userPassword, user.password);
    if (match) {
      return {
        email: user.email,
        id: user._id,
        uuid: user.uuid,
        applicationUuid: user.applicationUuid,
        referenceId: user.referenceId,
        institutionConsents: user.institutionConsents,
        accessToken: generateToken(user._id),
      };
    }
  }

  throw new HTTPException(403, "Invalid email or password");
};

const getCurrentUser = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return {
      email: user.email,
      uuid: user.uuid,
      applicationUuid: user.applicationUuid,
      referenceId: user.referenceId,
      institutionConsents: user.institutionConsents,
      id: user._id,
    };
  }

  throw new HTTPException(404, "Invalid user id");
};

export { createUser, loginUser, getCurrentUser };
