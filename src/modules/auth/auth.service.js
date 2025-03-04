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

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({
    email,
    password: hashedPassword,
  }).save();

  return {
    id: user._id,
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
      id: user._id,
    };
  }

  throw new HTTPException(404, "Invalid user id");
};

export { createUser, loginUser, getCurrentUser };
