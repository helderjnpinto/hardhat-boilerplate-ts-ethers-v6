import { ProjectConfig } from "../typings/ProjectConfigTypes";

// import { deferConfig as defer } from '../utils/defer.js';
// example with defer functions
// https://github.com/node-config/node-config/blob/master/test/x-config-ts/default.ts

const defaultConfiguration: ProjectConfig = {
  accounts: {
    mnemonic: "test test test test test test test test test test test junk",
  },
  // default is hardhat network forking polygon network
  network: {
    name: "hardhat",
    live: false,
    url: "",
    saveDeployments: true,
    tags: ["test", "local"],
  },
  tenderly: {
    project: "projectName",
    username: "corpName",
    privateVerification: true,
    forkNetwork: "137",
  },
  tenderlySDK: {
    accessKey: undefined,
  },
  tenderlySetup: {
    automaticVerifications: false,
  },
  etherscan: {
    // Api key should be set by environment variable
    apiKey: "",
    customChains: [
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://mumbai.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://polygonscan.com/api",
          browserURL: "https://polygonscan.com",
        },
      },
    ],
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    token: "MATIC",
    gasPrice: 250,
    noColors: true,
  },
};

export default defaultConfiguration;
