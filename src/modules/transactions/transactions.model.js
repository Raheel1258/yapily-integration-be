import { model, Schema } from "mongoose";

const isoCodeSchema = new Schema({
  code: String,
  name: String,
});

const TransactionsSchema = new Schema({
  id: String,
  accountId: String,
  date: String,
  bookingDateTime: String,
  valueDateTime: String,
  status: String,
  amount: Number,
  currency: String,
  transactionAmount: {
    amount: Number,
    currency: String,
  },
  reference: String,
  description: String,
  transactionInformation: [String],
  isoBankTransactionCode: {
    domainCode: isoCodeSchema,
    familyCode: isoCodeSchema,
    subFamilyCode: isoCodeSchema,
  },
  proprietaryBankTransactionCode: {
    code: String,
    issuer: String,
  },
  balance: {
    type: String,
    balanceAmount: {
      amount: Number,
      currency: String,
    },
  },
}, {
    typeKey: '$type'
});

const Transaction = model("Transactions", TransactionsSchema);

export { Transaction };
