import { LinkedAccount } from "./linked-accounts.model.js";

const getAllLinkedAccounts = async () => {
  const linkedAccounts = await LinkedAccount.find();
  return linkedAccounts;
};

const getLinkedAccountById = async (accountId) => {
  const account = await LinkedAccount.findOne({ id: accountId });
  return account;
};

export { getAllLinkedAccounts, getLinkedAccountById };
