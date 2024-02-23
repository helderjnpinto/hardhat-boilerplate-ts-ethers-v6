import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Factory, ReceiverWallet } from "../../typechain-types";
import { getImplementationAddress } from "@openzeppelin/upgrades-core";
// @ts-ignore
import { tenderly } from "hardhat";
import tenderlySdk from "../../utils/tenderlySdk";

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
  ethers,
  network,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer, proxyOwner, minter, pauser } = await getNamedAccounts();

  const chainId = network.config.chainId;
  console.info("\n Deploying polygon_Factory on " + chainId);

  const tenderlySDK = tenderlySdk();

  const { newlyDeployed } = await deploy("Factory", {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          args: [
            deployer // default admin
          ],
          methodName: "initialize",
        },
      },
      owner: proxyOwner,
      proxyContract: "FactoryProxy",
      viaAdminContract: "DefaultProxyAdmin",
      proxyArgs: ["{implementation}", "{admin}", "{data}"],
    },
  });

  const instance: Factory = await ethers.getContract("Factory", deployer);

  const factoryAddress = await instance.getAddress();
  console.info(`\n Factory address: ${factoryAddress}`);

  const implementation = await getImplementationAddress(
    ethers.provider,
    factoryAddress
  );

  const receiver: ReceiverWallet = await ethers.getContract("ReceiverWallet");

  if (newlyDeployed) {
    console.info(
      `\n Setting new receiver wallet implementation ${receiver.target}`
    );
    await instance.setImplementationReceiverWallet(receiver.target);
  }

  if (network?.name && network.name.includes("tenderly")) {
    try {
      await tenderly.verify(
        {
          name: "Factory",
          address: implementation,
        },
        {
          name: "FactoryProxy",
          address: factoryAddress,
        }
      );
    } catch (error) {
      console.error("Tenderly verification:", error);
    }

    if (tenderlySDK) {
      // TODO: waiting for api.
      // await tenderlySDK.updateContractDisplayName(
      //   factoryAddress,
      //   "Factory Proxy"
      // );
    }
  }
};

func.id = "polygon_Factory";
func.tags = ["production", "polygon_core", "polygon_Factory"];
func.dependencies = ["polygon_ReceiverWallet"];

export default func;
