import { HardhatNetworkUserConfig } from 'hardhat/types';
import config from "../../utils/configs";

import reset from '../../utils/deploy/hardhatReset';

const networkConfig = config.get("network") as HardhatNetworkUserConfig;
export const resetBlockNumber = networkConfig.forking?.blockNumber || 47537432;

const func = async () => await reset(resetBlockNumber);
func.tags = ["hardhat_polygon_reset"];

export default func;