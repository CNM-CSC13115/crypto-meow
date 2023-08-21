// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../MeowContract.sol";

contract TestMeowContract is MeowContract {
    event Test(uint256 message);

    function setKittyToOwner(uint256 _kittyId, address _address) public {
        kittyToOwner[_kittyId] = _address;
    }

    function setOwnerKittyCount(address _address, uint256 _count) public {
        ownerKittyCount[_address] = _count;
    }

    function addKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        uint256 _cooldownIndex,
        address _owner
    ) public {
        Kitty memory newKitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            cooldownEndTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation),
            cooldownIndex: uint16(_cooldownIndex)
        });
       uint256 id = kitties.length;  // Get the current length as the new ID
       kitties.push(newKitty);
       kittyToOwner[id] = _owner;
       ownerKittyCount[_owner] += 1;
    }
}
