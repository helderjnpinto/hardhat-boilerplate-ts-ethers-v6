import { ProjectConfig } from "../typings/ProjectConfigTypes";

const config: Partial<ProjectConfig> = {
  network: {
    chainId: 80001,
    name: "mumbai",
    live: true,
    gasPrice: 5_000_000_000,
  },
};

export default config;
