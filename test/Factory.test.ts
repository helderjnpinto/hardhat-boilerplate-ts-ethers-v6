import { deployments, ethers } from "hardhat";
import { Factory, ReceiverWallet } from "../typechain-types";
import { Signer, ZeroAddress } from "ethers";
import { expect } from "chai";
import { getLog } from "./shared/events";

describe("Factory", function () {
  let factory: Factory;
  let deployer: Signer;

  before(async () => {
    await deployments.fixture(["polygon_Factory"]);
    const { deployer: deployerSigner } = await ethers.getNamedSigners();

    deployer = deployerSigner;

    factory = await ethers.getContract("Factory");
  });

  it("Should have the right roles", async () => {
    expect(
      await factory.hasRole(
        await factory.DEFAULT_ADMIN_ROLE(),
        await deployer.getAddress()
      )
    ).to.be.true;
  });

  it("Should have the implementation set", async () => {
    const impl = await factory.walletImplementation();
    expect(impl).not.equal(ZeroAddress);
  });

  describe("Create receiver wallet", () => {
    it("Should bob create new wallet", async () => {
      const [_1, _2, _3, _4, _5, bob] = await ethers.getSigners();

      const createTx = await factory
        .connect(bob)
        .createReceiverWallet(bob.address);

      expect(createTx)
        .emit(factory, "NewReceiverWalletCreated")
        .withArgs("address", bob.address);

      const { newReceiver } = await getLog(
        factory,
        "NewReceiverWalletCreated",
        createTx
      );

      const receiver: ReceiverWallet = await ethers.getContractAt(
        "ReceiverWallet",
        newReceiver
      );

      expect(await receiver.owner()).to.equal(bob.address);
    });
  });
});
