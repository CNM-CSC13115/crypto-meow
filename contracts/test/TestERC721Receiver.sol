// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract TestERC721Receiver is IERC721Receiver {
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

        function onERC721Received(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    ) external returns (bytes4) {
        return MAGIC_ERC721_RECEIVED;
    }
}