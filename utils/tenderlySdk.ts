import config from "./configs";
import { Tenderly } from "@tenderly/sdk";

export default () => {
  const tenderlyConfig = config.get("tenderly") as any;
  const tenderlySDKConfig = config.get("tenderlySDK") as any;

  if (tenderlySDKConfig && tenderlySDKConfig.accessKey) {
    const tenderlyInstance = new Tenderly({
      accountName: tenderlyConfig.username,
      projectName: tenderlyConfig.project,
      accessKey: tenderlySDKConfig.accessKey,
      network: parseInt(tenderlyConfig.forkNetwork),
    });
    
    const addWallet = async (walletAddress: string, displayName: string) => {
      try {
        const addedWallet = await tenderlyInstance.wallets.add(walletAddress, {
          displayName,
        });
        console.log("Added wallet:", addedWallet);
      } catch (error) {
        console.error("Error adding wallet:", error);
      }
    };

    const updateContractDisplayName = async (
      contractAddress: string,
      displayName: string
    ) => {
      try {
        const contract = await tenderlyInstance.contracts.update(
          contractAddress,
          {
            displayName,
          }
        );
        console.log("Updated contract:", contract);
      } catch (error) {
        console.error("Error updating contract:", error);
      }
    };

    return {
      tenderlyInstance,
      addWallet,
      updateContractDisplayName,
    };
  }
  return null;
};
