# Real Estate Market 
This is the fifth and final project for @Udemy Blockchain developer Nanodegree. The purpose of this project is 
to create a ERFC721 smart contract. The Smart Contract will have the ability to mint tokens. Each token will represent
my title to the house properties. To verify the mint of tokens zk-SNARKs was used  which can prove that someone 
own the title to the property without revealing specific information on the property. Succinct Zero-Knowledge proofs 
(zkSnarks) are proving to be one of the most promising frameworks for enhancing privacy and scalability in the blockchain space.
The tokens where placed on a blockchain market place (OpenSea) for others to purchase.  

## Smart contract and token infos:
The smart contract is deployed on Rinkeby Ethereum test network:

   [SolnSquareVerifier](https://rinkeby.etherscan.io/address/0xa8c6e5c1054f04c7c44094fca08deb4ca7f53701)
   
   [Verifier](https://rinkeby.etherscan.io/address/0x2f2B19ec401E071E3373788FE0827f55264Cc4db)
    
Transactions of minting new tokens using ZoKrates for proof:

```
$ node mint.js
Transaction: 0xf7f483b1da9b573b1462b29bfd51f4435110a86670e4629d4a041e542b3dc2e4
Transaction: 0x3462f151ccd2fbe3f167d63e72f715cf86e1c2e94b9751b6f6b058cf53c2fefb
Transaction: 0x7851a0f75b443d9e1fdd83670feb50dba678e1c101470ff870e292146474df08
Transaction: 0x92bc80fb42204619dbc08e4e6d7db99d7654690520ae5dc76e992644709bccbf
Transaction: 0x6bf0d6029714a1cd358a90f21a122ac24a70eb086ec7d3ae81b80ad8fc16f52e
Transaction: 0x95cb86560bafc323d1b5b7cce2743cb2cceeefdf2d40093c41b2ef3528310593
Transaction: 0x9160296fb20195eb4cff77d6ef1877124d4a54e7ca5534d1f24c653db82eae91
Transaction: 0xa52617732d159209f95f270b0e9e9c8b6e69de38acf7d1c9bece2c9b7ba1fee2
Transaction: 0x9035b8c42e35a1823ab21d6a1aaad75309448642cd8404a1aafc66550303de4a
Transaction: 0x274af736e0e382fafa234883ea2dfa63eb50fe084dcfcc8da6b044ed0e914734
```

Here you can find [all assets on OpenSea](https://rinkeby.opensea.io/assets/unidentified-contract-v296).

I putted 5 properties on sale( 4 with bid and one with fix price):

![OpenSea](img/OpenSea.PNG?raw=true)

The [transaction](https://rinkeby.etherscan.io/tx/0xbc2314633573acf16f6b67106c1ba8e19642b37ea7a5c6075aee9621d65564f0) where i bought one property with another account.

Bellow is the new property to the other account:

![PropetyWithOtherAccount](img/PropetyWithOtherAccount.PNG?raw=true)


## How to deploy the smart contract:

```
npm install
truffle compile
truffle migrate --network development --reset
```
To mint new tokens first you have to create new proof with ZoKrates:

`docker run -v /path/to/zokrates/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash`

Note: for windows the project has to be under the user path "c://Users/.." because docker can't mount folders outside of this path.

```
cd code/square
~/zokrates setup
~/zokrates compute-witness -a 3 9
```
Note: the proof to compute witness is simpler, is the square of a number.

`~/zokrates generate-proof`

You cant find the new proof at zokrates/code/square/proof.json .
Then change the proofs inside mint.js with the new one and all the parameters with yours.

## Run test cases:

To run the unit test run the following command:
`truffle test`

## Project Resources
* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
