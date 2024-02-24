// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./IReceiverWallet.sol";

/// @custom:security-contact security@gmail.com
contract ReceiverWallet is IReceiverWallet, Initializable, OwnableUpgradeable {
  event NewReceiverWalletCreated(address newReceiver, address defaultAdmin);

  constructor() {
    _disableInitializers();
  }

  function initialize(address newOwner) external initializer {
    _transferOwnership(newOwner);
  }

  receive() external payable {
    emit NewReceiverWalletCreated(address(this), msg.sender);
  }
}
