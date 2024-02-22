const func = async () => {
  console.info("\n Deploying hardhat_polygon_Factory");
};
func.id = "hardhat_polygon_Factory";
func.tags = ["test", "local", "hardhat_polygon_Factory"];
func.dependencies = [
  "hardhat_polygon_reset",
  "polygon_Factory",
];

export default func;
