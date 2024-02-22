// SPDX-License-Identifier: SEE LICENSE IN LICENSE
// solhint-disable
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// @dev workaround to be able to se on tenderly the proxy as named contract for easy indentification
// TODO: fix this when tenderly have the api to set a label to a given address
contract FactoryProxy is TransparentUpgradeableProxy {
  constructor(
    address _logic,
    address admin_,
    bytes memory _data
  ) payable TransparentUpgradeableProxy(_logic, admin_, _data) {}
}

contract MyTokenProxy is TransparentUpgradeableProxy {
  constructor(
    address _logic,
    address admin_,
    bytes memory _data
  ) payable TransparentUpgradeableProxy(_logic, admin_, _data) {}
}

abstract contract TransparentUpgradeableProxyAccess is
  TransparentUpgradeableProxy
{}

abstract contract ERC1967ProxyAccess is ERC1967Proxy {}

abstract contract ProxyAdminAccess is ProxyAdmin {}
