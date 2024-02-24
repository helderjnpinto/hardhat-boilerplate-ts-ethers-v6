import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ReceiverWallet, MyToken } from "../../typechain-types";
import { getImplementationAddress } from "@openzeppelin/upgrades-core";
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
  console.info("\n Deploying polygon_MyToken on " + chainId);

  const tenderlySDK = tenderlySdk();

  const { newlyDeployed } = await deploy("MyToken", {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          args: [
            deployer, // default administrator
            pauser,
            minter,
          ],
          methodName: "initialize",
        },
      },
      owner: proxyOwner,
      proxyContract: "MyTokenProxy",
      viaAdminContract: "DefaultProxyAdmin",
      proxyArgs: ["{implementation}", "{admin}", "{data}"],
    },
  });

  const instance: MyToken = await ethers.getContract("MyToken");

  const proxyAddress = await instance.getAddress();
  console.info(`\n MyToken address: ${proxyAddress}`);

  const implementationAddress = await getImplementationAddress(
    ethers.provider,
    proxyAddress
  );

  if (newlyDeployed && tenderlySDK && network.name.includes("tenderly")) {
    await tenderlySDK.addWallet(minter, "minter wallet");
    await tenderlySDK.addWallet(pauser, "pauser wallet");
  }

  if (network?.name && network.name.includes("tenderly")) {
    try {
      await tenderly.verify(
        {
          name: "MyToken",
          address: implementationAddress,
        },
        {
          name: "MyTokenProxy",
          address: proxyAddress,
        }
      );
    } catch (error) {
      console.error("Tenderly verification:", error);
    }

    if (tenderlySDK) {
      // TODO: waiting for api.
      // await tenderlySDK.updateContractDisplayName(
      //   myTokenAddress,
      //   "MyToken Proxy"
      // );
    }
  }
};

func.id = "polygon_MyToken";
func.tags = ["production", "polygon_MyToken"];

export default func;
