import { deployments, ethers } from "hardhat";
import { MyToken } from "../typechain-types";
import { Signer } from "ethers";
import { expect } from "chai";

describe("MyToken", function () {
  let myToken: MyToken;
  let deployer: Signer;
  let minter: Signer;
  let pauser: Signer;

  before(async () => {
    await deployments.fixture(["hardhat_MyToken"]);
    const {
      deployer: deployerSigner,
      minter: minterSigner,
      pauser: pauserSigner,
    } = await ethers.getNamedSigners();

    deployer = deployerSigner;
    minter = minterSigner;
    pauser = pauserSigner;

    myToken = await ethers.getContract("MyToken");
  });

  it("Should have the right roles", async () => {
    expect(
      await myToken.hasRole(
        await myToken.DEFAULT_ADMIN_ROLE(),
        await deployer.getAddress()
      )
    ).to.be.true;

    expect(
      await myToken.hasRole(
        await myToken.MINTER_ROLE(),
        await minter.getAddress()
      )
    ).to.be.true;

    expect(
      await myToken.hasRole(
        await myToken.PAUSER_ROLE(),
        await pauser.getAddress()
      )
    ).to.be.true;
  });

  it("Should have minted with right decimals", async () => {
    const initialMinting = await myToken.balanceOf(await deployer.getAddress());
    expect(initialMinting).to.equal(1000n * (10n ** 6n));
    expect(await myToken.decimals()).to.equal(6n);
  });
});
