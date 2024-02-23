import {
  HardhatNetworkUserConfig,
  HardhatRuntimeEnvironment,
} from "hardhat/types";
import config from "../../utils/configs";

import reset from "../../utils/deploy/hardhatReset";

const networkConfig = config.get("network") as HardhatNetworkUserConfig;
export const resetBlockNumber = networkConfig.forking?.blockNumber || 47537432;

const func = async ({ network }: HardhatRuntimeEnvironment) => {
  // disable reset for normal hardhat node
  if (network.config.chainId !== 31337) {
    await reset(resetBlockNumber);
  }
};
func.tags = ["hardhat_polygon_reset"];

export default func;
