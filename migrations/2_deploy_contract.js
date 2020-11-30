var ConvertLib = artifacts.require("../contracts/ConvertLib.sol");
var MetaCoin = artifacts.require("../contracts/MetaCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
