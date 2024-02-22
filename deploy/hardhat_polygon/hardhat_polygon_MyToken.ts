const func = async () => {
  console.info("\n Deploying hardhat_MyToken");
};
func.id = "hardhat_MyToken";
func.tags = ["test", "local", "hardhat_MyToken"];
func.dependencies = ["hardhat_polygon_reset", "polygon_MyToken"];

export default func;
