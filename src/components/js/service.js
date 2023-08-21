import Web3 from "web3";
import KittyService from "./kitty.service";
import KittyMarketPlaceService from "./kittyMarketPlace.service";
import WalletService from "./walletService";

export default class Service {
  static chainIdToAddress = {
    // '0x1': // Etereum MainNet
    "0x3": {
      // Ropsten Test'
      kitty: "0xD4Bcc3f1C483Ea10fDb97523357CA660E6B3c71E",
      market: "0xa67e70910341DDF96537F005280a4417b5B29578",
    },
    "0x539": {
      // Ganache Local
      kitty: "0x950FE8528a8ff2F058F4eaF06f94c8cB76b533fD",
      market: "0x7d4CBb768bcbdACF0e685115743bEd94A57A2542",
    },
  };

  static web3;
  static kitty;
  static market;
  static wallet;

  static web3ProviderAvailable = () => Boolean(Web3.givenProvider);

  static initServices = () => {
    if (!Service.web3ProviderAvailable()) {
      throw new Error("No web 3 provider available. Please install Metamask");
    }

    this.web3 = new Web3(Web3.givenProvider);
    this.kitty = new KittyService(Service.web3);
    this.market = new KittyMarketPlaceService(Service.web3);
    this.wallet = new WalletService(Service.web3);
  };

  static initContracts = async (chainId) => {
    const contractAddresses = this.chainIdToAddress[chainId];
    if (!contractAddresses) {
      throw new Error(`Contract init error. Unsupported chainId: ${chainId}`);
    }

    Service.kitty.init(contractAddresses.kitty);
    Service.market.init(contractAddresses.market, Service.kitty);
  };
}
