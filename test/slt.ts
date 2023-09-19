import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumberish, Contract } from 'ethers';

describe('test.sol', () => {
  let contractFactory: any;
  let contract: Contract;
  let owner: any;
  let alice: any;
  let bob: any;
  let initialSupply: BigNumberish;
  let ownerAddress: string;
  let aliceAddress: string;
  let bobAddress: string;

  beforeEach(async () => {
    [owner, alice, bob, ] = await ethers.getSigners();
    initialSupply = ethers.parseEther('100000');
    contractFactory = await ethers.getContractFactory('SLT');
    contract = await contractFactory.deploy('0x3bC893BDdBBF5817a61B396A1508988f0112f126', '0x3bC893BDdBBF5817a61B396A1508988f0112f126');
    // contract = await contractFactory.deploy();
    ownerAddress = await owner.getAddress();
    aliceAddress = await alice.getAddress();
    bobAddress = await bob.getAddress();
  });

  describe('Core', () => {
    it('temp is 0', async () => {
      const list = await ethers.getSigners();
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const coinObj = new ethers.Contract(contract?.target, contract.interface, item);
        if (index % 3 == 0) {
          // const addr = await owner.getAddress();
          await coinObj.bind(ownerAddress);
          // const index = await contract.addressToIndex(addr);
          // console.log('addr...',addr, index);
        } else {
          const addr = await item.getAddress();
          await coinObj.bind(addr);
          // const index = await contract.addressToIndex(addr);
          // console.log('addr...',addr, index);
        }
      }
      
      
      const tem = await contract.addressToIndex(bobAddress);
      const tem1 = await contract.userInfo(bobAddress);
      console.log('tem..',list.length, tem, tem1);
      
      // expect(tem).to.equal(0);
    });

  });

});
