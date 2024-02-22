import { ProjectConfig } from "../typings/ProjectConfigTypes";

const config: Partial<ProjectConfig> = {
  network: {
    name: "local-tenderly-fork",
    url: "https://rpc.tenderly.co/fork/<fork-id-replace-this>",
    chainId: 137,
    gas: 6_000_000,
    gasPrice: 8_000_000_000,
    live: true,
  },
  tenderlySetup: {
    automaticVerifications: true,
  }
};

export default config;
