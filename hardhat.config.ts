import config from "./utils/configs";
import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-docgen";
import "hardhat-contract-sizer";
import "hardhat-tracer";
import { parseUnits } from "ethers";
import {
  HardhatNetworkUserConfig,
  HardhatRuntimeEnvironment,
  HttpNetworkUserConfig,
} from "hardhat/types";
import { TASK_DEPLOY } from "hardhat-deploy";
import { setup } from "@tenderly/hardhat-tenderly";
import {
  HardhatAccounts,
  HardhatNetworkUserConfigExt,
  tenderlySetup,
} from "./typings/ProjectConfigTypes";
import { EthGasReporterConfig } from "hardhat-gas-reporter/dist/src/types";
import { TenderlyConfig } from "@tenderly/hardhat-tenderly/dist/tenderly/types";
import { isTrue } from "./utils/common";

setup(config.get<tenderlySetup>("tenderlySetup"));

const networksConfigs = (isHardhat = false): HttpNetworkUserConfig => {
  const baseConfig: HttpNetworkUserConfig = {
    accounts: config.get<HardhatAccounts>("accounts"),
    ...config.get<HardhatNetworkUserConfigExt>("network"),
  };

  if (isHardhat) {
    delete baseConfig.url;
  } else {
    // @ts-ignore-next-line
    delete baseConfig.forking;
  }

  return baseConfig;
};

const gasReporterConfig = (): EthGasReporterConfig => {
  const gsConfig = config.get<EthGasReporterConfig>("gasReporter");
  return {
    ...gsConfig,
    enabled: isTrue(gsConfig.enabled),
  };
};

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    // tenderly testing local fork
    local_tenderly_fork: networksConfigs(),
    hardhat: networksConfigs(true) as HardhatNetworkUserConfig,
    // using hardhat with forked states
    hardhat_fork: networksConfigs(),
    polygon: networksConfigs(),
    mumbai: networksConfigs(),
  },
  namedAccounts: {
    deployer: 0,
    proxyOwner: 1,
    minter: 2,
    pauser: 3,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
  gasReporter: gasReporterConfig(),
  // etherscan: config.get<EtherscanConfig>("etherscan"),
  tenderly: config.get<TenderlyConfig>("tenderly"),
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: false,
    except: ["^contracts/mocks"],
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  },
  mocha: {
    timeout: 0,
  },
};

// Tasks Definition --------------------------------

// yarn local-tenderly-polygon-fork get-balance-tenderly -- --account 0xFFdF11e38619B99d4D4FA21798E158c81aB16474
task("get-balance-tenderly", "Prints an account's balance")
  .addOptionalParam("account", "The account's address  (defaults to deployer)")
  .setAction(async ({ account }, { ethers, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    account = account || deployer;
    const balance = await ethers.provider.send("eth_getBalance", [
      account,
      "latest",
    ]);

    console.debug(
      `Account ${account} with balance ${BigInt(balance).toString()}`
    );
  });

// yarn local-tenderly-polygon-fork add-balance-tenderly -- --account 0xFFdF11e38619B99d4D4FA21798E158c81aB16474 --amount 2
task(
  "add-balance-tenderly",
  "Add native tokens to account's balance (only works for network accounts of tenderly)"
)
  .addOptionalParam("account", "The account's address (defaults to deployer)")
  .addOptionalParam("amount", "The amount to set (defaults to 1000 ETH)")
  .setAction(async ({ account, amount }, { ethers, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    account = account || deployer;
    const defaultAmount = parseUnits("1000", "ether").toString(16);
    amount = amount ? parseUnits(amount, "ether").toString(16) : defaultAmount;
    await ethers.provider.send("tenderly_addBalance", [account, "0x" + amount]);

    const balance = await ethers.provider.send("eth_getBalance", [
      account,
      "latest",
    ]);

    console.debug(
      `Successful add balance to account ${account}, balance: ${BigInt(
        balance
      ).toString()}`
    );
  });

// Internal Tasks --------------------------------

task(
  TASK_DEPLOY,
  async (
    taskArgs: { reset: boolean },
    hre: HardhatRuntimeEnvironment,
    runSuper
  ) => {
    await runSuper();
    // @dev run here some custom logic after deployment
  }
);

export default hardhatConfig;
