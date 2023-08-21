// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract TestBadNFTReceiver {
    fallback() external payable {}
}
