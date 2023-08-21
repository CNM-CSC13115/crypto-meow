# Final project Blockchain: Crypto Meow

CryptoMeow is a blockchain-based virtual pet game that gained widespread attention for its innovative use of non-fungible tokens (NFTs) on the Ethereum network. In CryptoKitties, players collect, breed, and trade unique digital cats, each represented as an NFT with distinct genetic traits and characteristics.

### Tech Stack

Contracts: Solidity, Truffle, Ganache

Front End: React

### Meow DNA

The DNA structure is a 16 digit number with the following breakdown. The Kitten DNA is a random combination of the parent DNA with a chance for a completely random value.

| DNA Digits | Cattribute           | Values |
| ---------- | -------------------- | ------ |
| 00-01      | Body Color           | 10-99  |
| 02-03      | Accent Color         | 10-99  |
| 04-05      | Eye Color            | 10-99  |
| 06-07      | Ear Color            | 10-99  |
| 08         | Eye Shape            | 0-7    |
| 09         | Pattern              | 0-3    |
| 10-11      | Pattern Color        | 10-99  |
| 12-13      | Pattern Accent Color | 10-99  |
| 14         | Animation            | 0-4    |
| 15         | Mysterious           | 0-7    |

### Cooldown

When parent meow breed they need time to rest before breeding again. Breed cooldowns are defined below.

https://guide.cryptokitties.co/guide/cat-features/cooldown-speed

| Generation | Cooldown Name | Cooldown Time |
| ---------- | ------------- | ------------- |
| 0, 1       | fast          | 1 minute      |
| 2, 3       | swift         | 2 minutes     |
| 4, 5       | swift         | 5 minutes     |
| 6, 7       | snappy        | 10 minutes    |
| 8, 9       | snappy        | 30 minutes    |
| 10, 11     | brisk         | 1 hour        |
| 12, 13     | brisk         | 2 hours       |
| 14, 15     | plodding      | 4 hours       |
| 16, 17     | plodding      | 8 hours       |
| 18, 19     | slow          | 16 hours      |
| 20, 21     | slow          | 24 hours      |
| 22, 23     | sluggish      | 2 days        |
| 24, 25     | sluggish      | 4 days        |
| 26+        | catatonic     | 1 week        |

## Installation

The project has 2 part:

- Smart contract: A Ethereum blockchain that mine, store transactions and execute the smart contracts
- Front-end: The UI of **CryptoMeow**

### Running smart contract

1. Have `node` installed
2. Install the Truffle suite globally via `npm install -g truffle`
3. `npm install` to install the project dependencies
4. You'll need a local ETH blockchain like Ganache. Can use either the <a href="https://www.trufflesuite.com/ganache" target="_blank">graphical interface</a> or the CLI (`npm install -g ganache-cli`). If using the graphical app create a new workspace and link the truffle config file `/truffle-config.js` to the workspace.
5. Deploy the contracts
   1. `truffle console`
   2. `migrate`

### Running Front-end

1. Copy the `MeowContract` and `MeowMarketPlace` contract deployed addresses into `/src/components/js/service.js` into the `static chainIdToAddress` variable with ID `0x539` (this is the chain ID for Ganache)
2. Run the app with `npm start` and open a browser to `http://localhost:3000`
3. Use the account that ganache provided
https://user-images.githubusercontent.com/63916162/261995333-dd1b019d-f940-4b5f-8eeb-1a864d4da113.png
- Download [The crypto wallet for Defi, Web3 Dapps and NFTs | MetaMask](https://metamask.io/) extension for your browser. Add Network > Fill in like the image

- Log in to one of accounts above
