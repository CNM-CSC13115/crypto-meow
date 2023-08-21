// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../MeowAdmin.sol";

contract MeowAdminTest is MeowAdmin {
  function test_getKittyCreatorFromArray(uint256 _index) public view returns (address) {
    return kittyCreators[_index];
  }

  function test_getKittyCreatorFromMapping(address _address) public view returns (uint256) {
    return addressToKittyCreatorId[_address];
  }

  function testOnlyKittyCreatorModifier() public view onlyKittyCreator returns (bool) {
    return true;
  }
}
