import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ReceiverWallet } from "../../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const deployerWallet = await ethers.getSigner(deployer);

  const chainId = hre.network.config.chainId;
  console.info("\n Deploying polygon_ReceiverWallet on " + chainId);

  await deploy("ReceiverWallet", {
    from: deployer,
    log: true,
    args: [],
  });


  const contract: ReceiverWallet = await ethers.getContract(
    "ReceiverWallet",
    deployerWallet
  );

  console.info(`\n ReceiverWallet address: ${await contract.getAddress()}`);
};

func.id = "polygon_ReceiverWallet";
func.tags = ["production", "polygon_core", "polygon_ReceiverWallet"];

export default func;
