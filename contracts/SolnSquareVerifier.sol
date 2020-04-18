pragma solidity >=0.4.21 <0.6.0;

import "./PropertyTitleERC721Token.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is PropertyTitleERC721Token {

    struct Solution {
        address sAddress;
        uint tokenId;
    }

    mapping(address => Solution) solutions;
    mapping(bytes32 => bool) solutionExist;

    event SolutionAdded(address sAdddress, uint tokenId);

    Verifier private verifier;

    constructor(address verifierAddress) public {
        verifier = Verifier(verifierAddress);
    }

    function addSolution(address _address, uint _tokenId) internal {
        solutions[_address] = Solution({
            sAddress : _address,
            tokenId : _tokenId
        });
        emit SolutionAdded(_address, _tokenId);
    }

    function mintToken(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool){
        require(verifier.verifyTx(a, b, c, input), "Solutions is not verified");
        bytes32 hash = keccak256(abi.encodePacked(a, b, c, input));
        require(!solutionExist[hash], "solution already exist");
        addSolution(to, tokenId);
        return super.mint(to, tokenId);
    }
}


























