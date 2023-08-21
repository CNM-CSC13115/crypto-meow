const KittyFactory = artifacts.require("MeowFactory");
const KittyMarketPlace = artifacts.require("MeowMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(KittyMarketPlace, KittyFactory.address);
};
