const contract = require("@truffle/contract");
import web3 from "./web3";
import metaCoinArtifact from "../build/contracts/MetaCoin.json";

const MetaCoin = contract(metaCoinArtifact);
MetaCoin.setProvider(web3.currentProvider);

const getAccounts = async () => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getAccounts()
      .then((accounts) => {
        if (!accounts || accounts.length === 0)
          reject({ error: {}, message: "Unable to get accounts" });
        resolve({ accounts });
      })
      .catch((error) => {
        reject({ error, message: "Unable to get accounts" });
      });
  });
};

const getBalance = (account: string) => {
  return new Promise(async (resolve, reject) => {
    if (!account) reject({ message: "Missing account address" });
    try {
      const instance = await MetaCoin.deployed();
      const balance = await instance.getBalance.call(account, {
        from: account,
      });
      const amount = web3.utils.fromWei(Number(balance).toString(), "ether");
      const ether = Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
      resolve({ balance: ether });
    } catch (error) {
      reject(error);
    }
  });
};

const transfer = ({
  sender,
  receiver,
  amount,
}: {
  sender: string;
  receiver: string;
  amount: string;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const instance = await MetaCoin.deployed();
      const wei = web3.utils.toWei(amount, "ether");
      const receipt = await instance.sendCoin(receiver, wei, {
        from: sender,
      });
      resolve(receipt);
    } catch (error) {
      reject({ error, message: "Unable to transfer coins" });
    }
  });
};

const getReceipt = (hash: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const receipt = await web3.eth.getTransactionReceipt(hash);
      resolve({ receipt });
    } catch (error) {
      reject({ error, message: "Unable to get transaction receipt" });
    }
  });
};

export { getAccounts, getBalance, transfer, getReceipt };
