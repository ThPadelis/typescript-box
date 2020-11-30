const contract = require("@truffle/contract");
import { error } from "winston";
import web3 from "./web3";
const helloArtifact = require("../build/contracts/Hello.json");

const Hello = contract(helloArtifact);
Hello.setProvider(web3.currentProvider);

const getAccounts = async () => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getAccounts()
      .then((accounts) => {
        if (!accounts || accounts.length === 0)
          reject({ error: {}, message: "Unable to get accounts" });
        resolve(accounts);
      })
      .catch((error) => {
        reject({ error, message: "Unable to get accounts" });
      });
  });
};

const getBalance = (account: string) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBalance(account)
      .then((balance: string) => {
        resolve(balance);
      })
      .catch((error) => {
        reject({ error, message: "Unable to get balance of account" });
      });
  });
};

// const transfer = ({ sender, receiver, amount }) => {
// 	return new Promise((resolve, reject) => {
// 		MetaCoin.deployed().then((instance) => {
// 			return instance.sendCoin(receiver, amount, { from: sender })
// 		}).then(resolve)
// 			.catch((error) => {
// 				reject(boomifyError({ error, message: 'Unable to transfer coins' }))
// 			})
// 	})
// }

const defaultAccount = async () => {
  return new Promise((resolve) => {
    resolve(web3.eth.defaultAccount);
  });
};

export { getAccounts, getBalance, defaultAccount };
