import { EtherscanConfig } from "@nomicfoundation/hardhat-verify/types";
import { TenderlyConfig } from "@tenderly/hardhat-tenderly/dist/tenderly/types";
import { EthGasReporterConfig } from "hardhat-gas-reporter/dist/src/types";
import { HttpNetworkUserConfig } from "hardhat/types";

export type NullableString = null | string;
export type BooleanString = boolean | string;

export type HardhatAccounts = {
  mnemonic: string;
};

export interface HardhatNetworkUserConfigExt extends HttpNetworkUserConfig {
  name: string;
  forking?: {
    url: string;
    blockNumber: number;
  };
  live?: boolean;
  saveDeployments?: boolean;
  tags?: string[];
}

export type tenderlySDK = {
  accessKey: string | undefined;
};

export type tenderlySetup = {
  automaticVerifications: boolean;
};

export type ProjectConfig = {
  accounts: HardhatAccounts;
  network: HardhatNetworkUserConfigExt;
  tenderly: TenderlyConfig;
  tenderlySDK: tenderlySDK;
  tenderlySetup: tenderlySetup;
  etherscan?: EtherscanConfig;
  gasReporter?: EthGasReporterConfig;
};
