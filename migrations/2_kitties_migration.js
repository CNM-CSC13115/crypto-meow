const KittyFactory = artifacts.require("MeowFactory");

module.exports = function (deployer) {
  deployer.deploy(KittyFactory);
};
