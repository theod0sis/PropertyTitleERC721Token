// migrating the appropriate contracts
var PropertyTitleERC721Token = artifacts.require("./PropertyTitleERC721Token.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(PropertyTitleERC721Token);
//  deployer.deploy(SolnSquareVerifier);
};
