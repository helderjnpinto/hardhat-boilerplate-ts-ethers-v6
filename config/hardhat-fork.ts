import { ProjectConfig } from "../typings/ProjectConfigTypes";

const defaultConfiguration: Partial<ProjectConfig> = {
  network: {
    name: "hardhat-fork",
    chainId: 137,
    forking: {
      url: "",
      blockNumber: 47537432,
    },
    live: false,
    saveDeployments: true,
    tags: ["test", "local"],
  },
  tenderlySetup: {
    automaticVerifications: false,
  },
};

export default defaultConfiguration;
