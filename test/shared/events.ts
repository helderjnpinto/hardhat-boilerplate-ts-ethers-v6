import {
  BaseContract,
  ContractTransactionResponse,
  TransactionReceipt,
  TransactionResponse,
} from "ethers";
import { ethers } from "hardhat";

export const getLog = async (
  contract: BaseContract,
  logName: string,
  tx: (
    | ContractTransactionResponse
    | TransactionResponse
    | TransactionReceipt
  ) & { minedBlockNumber?: number },
  contractToDecode?: BaseContract,
  logEmittedBy?: string
): Promise<any> => {
  if (tx) {
    let blockHash = tx.blockHash;

    if (!tx.blockHash) {
      const transaction = await ethers.provider.getTransaction(tx.hash);
      if (transaction) {
        blockHash = transaction?.blockHash;
      } else {
        throw new Error("Transaction not found: " + tx.hash);
      }
    }

    if (!blockHash) throw new Error("Block hash invalid");
    const logs = await ethers.provider.getLogs({
      blockHash,
    });
    const contractInterface = contractToDecode || contract;
    const decodedLogs = logs
      .filter(
        (log) =>
          log.address.toLowerCase() ==
          (logEmittedBy || (contract.target as string)).toLowerCase()
      )
      .map((log) => {
        const parsedLog = contractInterface.interface.parseLog({
          topics: log.topics.slice(),
          data: log.data,
        });

        if (parsedLog && parsedLog.name === logName) {
          const logObject: any = {};

          parsedLog.fragment.inputs.forEach((input, index) => {
            const inputName = input.name;
            const inputValue = parsedLog.args[index];
            logObject[inputName] = inputValue;
          });

          return logObject;
        }
      })
      .filter((log) => log);

    if (decodedLogs.length > 0) {
      return decodedLogs[0];
    }
  }
};
