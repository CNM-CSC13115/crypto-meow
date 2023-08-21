// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../MeowMarketplace.sol";

contract TestMeowMarketPlace is MeowMarketPlace {
    constructor(address _kittyContractAddress)
        public
        MeowMarketPlace(_kittyContractAddress)
    {}

    function getKittyContractAddress() public view returns (address addr) {
        return address(_kittyContract);
    }

    function test_createOffer(
        address payable _seller,
        uint256 _price,
        uint256 _tokenId,
        bool _isSireOffer,
        bool _active
    ) public {
        Offer memory newOffer = Offer(
            _seller,
            _price,
            0,
            _tokenId,
            _isSireOffer,
            _active
        );
      
      
         offers.push(newOffer);  // Add the new offer to the array

        uint256 index = offers.length - 1;  // Get the index of the newly added offer

        offers[index].index = index;

        tokenIdToOffer[_tokenId] = offers[index];
    }
}
