import { ProjectConfig } from "../typings/ProjectConfigTypes";


const config: Partial<ProjectConfig> = {
  network: {
    chainId: 137,
    name: "polygon",
    tags: ["production"],
    live: true,
  },
};

export default config;
