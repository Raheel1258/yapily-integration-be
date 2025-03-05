import { model, Schema } from "mongoose";

const AccountIdentificationSchema = new Schema({
  type: String,
  identification: String,
});

const AccountBalanceSchema = new Schema({
  type: String,
  dateTime: String,
  balanceAmount: {
    amount: Number,
    currency: String,
  },
  creditLineIncluded: Boolean,
});

const LinkedAccountSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  balance: Number,
  currency: String,
  usageType: String,
  accountType: String,
  accountNames: [{ name: String }],
  accountIdentifications: [AccountIdentificationSchema],
  accountBalances: [AccountBalanceSchema],
});

const LinkedAccount = model("LinkedAccount", LinkedAccountSchema);

export { LinkedAccount };
