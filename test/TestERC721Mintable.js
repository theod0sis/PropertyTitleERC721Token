var PropertyTitleERC721Token = artifacts.require('PropertyTitleERC721Token');

contract('PropertyTitleERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[3];
    const account_four = accounts[4];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await PropertyTitleERC721Token.new({from: account_one});
            await this.contract.mint(account_one,1,{from: account_one})
            await this.contract.mint(account_two,2,{from: account_one})
            await this.contract.mint(account_three,3,{from: account_one})
            await this.contract.mint(account_four,4,{from: account_one})
            console.log("Token minted successful");
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply({from: account_three});
            assert.equal(totalSupply,4,"The total supply was wrong");
        })

        it('should get token balance', async function () {
            await this.contract.mint(account_one,11,{from: account_one})

            let balanceForAccount1 = await this.contract.balanceOf(account_one,{from: account_one});
            let balanceForAccount2 = await this.contract.balanceOf(account_two,{from: account_two});
            let balanceForAccount3 = await this.contract.balanceOf(account_three,{from: account_three});
            let balanceForAccount4 = await this.contract.balanceOf(account_four,{from: account_four});

            assert.equal(balanceForAccount1,2,"The balance of account_one was wrong");
            assert.equal(balanceForAccount2,1,"The balance of account_two was wrong");
            assert.equal(balanceForAccount3,1,"The balance of account_three was wrong");
            assert.equal(balanceForAccount4,1,"The balance of account_four was wrong");

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1,{from: account_one});
            assert.equal(tokenURI,'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
        })

        it('should transfer ownership from one owner to another', async function () {
            var eventEmitted = false
            await this.contract.OwnershipTransferred((err, res) => {
                eventEmitted = true
            });
            await this.contract.transferOwnership(account_two,{from: account_one});

            assert.equal(eventEmitted,true,'Event didnt emit');
        })

        it('should transfer token from one owner to another', async function () {

            await this.contract.transferFrom(account_one,account_two,1,{from: account_one});
            let balanceForAccount1 = await this.contract.balanceOf(account_one,{from: account_one});
            let balanceForAccount2 = await this.contract.balanceOf(account_two,{from: account_two});
            assert.equal(balanceForAccount1,0,"The balance of account_one was wrong");
            assert.equal(balanceForAccount2,2,"The balance of account_two was wrong");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await PropertyTitleERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let failed = false;
            try{
                await this.contract.mint(account_two,2,{from: account_two})
            }catch(e){
                failed=true;
            }
            assert.equal(failed,true,"It didnt failed mining from other address")
        })

        it('should return contract owner', async function () {
            const owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "Wrong owner returned");
        })

    });
})