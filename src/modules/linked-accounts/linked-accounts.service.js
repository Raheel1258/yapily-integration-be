import { User } from "../auth/user.model.js";
import { LinkedAccount } from "./linked-accounts.model.js";

const getAllLinkedAccounts = async (id) => {
  const linkedAccounts = await LinkedAccount.find({ userId: id });
  return linkedAccounts;
};

const getLinkedAccountById = async (accountId) => {
  const account = await LinkedAccount.findOne({ id: accountId });
  return account;
};

export { getAllLinkedAccounts, getLinkedAccountById };
