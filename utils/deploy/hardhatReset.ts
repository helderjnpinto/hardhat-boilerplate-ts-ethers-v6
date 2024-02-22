import { network } from "hardhat";
import config from "config";
import { HardhatNetworkUserConfig } from "hardhat/types";

export default async (resetBlockNumber: number, log = true) => {
  if (log) {
    console.info("\n Executing hardhat_reset:" + resetBlockNumber);
  }
  const networkConfig = config.get("network") as HardhatNetworkUserConfig;

  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: networkConfig.forking?.url,
          blockNumber: resetBlockNumber,
        },
      },
    ],
  });
};