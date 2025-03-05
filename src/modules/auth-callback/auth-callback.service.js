import { LinkedAccount } from "../linked-accounts/linked-accounts.model.js";
import * as api from "../../api/api.js";
import config from "../../config/config.js";
import { Transaction } from "../transactions/transactions.model.js";
import HTTPException from "../../models/http-exception-model.js";

const saveFinancialData = async (consent) => {
  if (!consent) {
    throw new HTTPException(400, "Invalid consent header");
  }
  const response = await api.GET(`${config.yapilyApiUrl}/accounts`, {
    consent,
  });
  const linkedAccounts = response.data;
  const transactionPromises = linkedAccounts.map((account) =>
    api.GET(`${config.yapilyApiUrl}/accounts/${account.id}/transactions`, {
      consent,
    })
  );
  const transactions = await Promise.all(transactionPromises);
  await saveTransactions(linkedAccounts, transactions);
  await saveLinkedAccounts(linkedAccounts);
};

const saveLinkedAccounts = async (accounts) => {
  const bulkOperations = accounts.map((account, i) => ({
    updateOne: {
      filter: { id: account.id },
      update: account,
      upsert: true,
    },
  }));
  await LinkedAccount.init();
  await LinkedAccount.bulkWrite(bulkOperations);
};

const saveTransactions = async (linkedAccounts, transactions) => {
  let bulkOperations = [];
  transactions.forEach((transaction, i) => {
    const accountId = linkedAccounts[i].id;
    transaction.data.forEach((data) => {
      bulkOperations.push({
        updateOne: {
          filter: { id: data.id, accountId },
          update: { ...data, accountId },
          upsert: true,
        },
      });
    });
  });
  await Transaction.init();
  await Transaction.bulkWrite(bulkOperations);
};

export { saveFinancialData };
