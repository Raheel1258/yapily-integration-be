import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
  },
  applicationUuid: {
    type: String,
  },
  referenceId: {
    type: String,
  },
  institutionConsents: {
    type: [String],
  },
});

const User = model("User", userSchema);

export { User };
