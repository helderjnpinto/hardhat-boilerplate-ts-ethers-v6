export default {
  accounts: {
    mnemonic: "ACCOUNTS_MNEMONIC",
  },
  network: {
    chainId: "NETWORK_CHAIN_ID",
    // forking Is only valid for development / testing with hardhat + polygon fork
    url: "NETWORK_URL",
    forking: {
      url: "NETWORK_FORKING_URL",
      blockNumber: "NETWORK_FORKING_BLOCK_NUMBER",
    },
  },
  tenderly: {
    project: "TENDERLY_PROJECT",
    username: "TENDERLY_USERNAME",
    forkNetwork: "TENDERLY_FORK_NETWORK",
  },
  tenderlySDK: {
    accessKey: "TENDERLY_SDK_ACCESS_KEY",
  },
  tenderlySetup: {
    automaticVerifications: "TENDERLY_SETUP_AUTOMATIC_VERIFICATIONS",
  },
  etherscan: {
    apiKey: "ETHERSCAN_API_KEY",
  },
  gasReporter: {
    enabled: "GAS_REPORTER_ENABLED",
    coinmarketcap: "GAS_REPORTER_COINMARKETCAP",
    gasPriceApi: "GAS_REPORTER_GAS_PRICE_API",
    outputFile: "GAS_REPORTER_OUTPUT_FILE",
  },
};
