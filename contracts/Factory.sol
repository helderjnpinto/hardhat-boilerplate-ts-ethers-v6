// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import {IReceiverWallet} from "./ReceiverWallet.sol";

contract Factory is Initializable, AccessControlUpgradeable {
  using Clones for address;

  address public walletImplementation = address(0);
  event NewReceiverWalletCreated(address newReceiver, address defaultAdmin);
  error InvalidImpl();
  error ImplNotSetYet();

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address defaultAdmin) public initializer {
    _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
  }

  function setImplementationReceiverWallet(
    address receiverImpl
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    if (receiverImpl == address(0)) {
      revert InvalidImpl();
    }
    walletImplementation = receiverImpl;
  }

  function createReceiverWallet(address defaultAdmin) external {
    if (walletImplementation == address(0)) {
      revert ImplNotSetYet();
    }

    address newReceiver = walletImplementation.clone();
    IReceiverWallet(newReceiver).initialize(defaultAdmin);

    emit NewReceiverWalletCreated(newReceiver, defaultAdmin);
  }
}
