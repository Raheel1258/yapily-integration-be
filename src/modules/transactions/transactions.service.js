import { Transaction } from "./transactions.model.js";

const getTransactionByAccountId = async (accountId) => {
  const transactions = await Transaction.find({ accountId });
  return transactions;
};

export { getTransactionByAccountId }