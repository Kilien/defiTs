import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import { BigNumberish, Contract } from 'ethers';

describe('newSlt.sol', () => {
  let contractFactory: any;
  let contract: Contract;
  let owner: any;
  let alice: any;
  let bob: any;
  let initialSupply: BigNumberish;
  let ownerAddress: string;
  let aliceAddress: string;
  let bobAddress: string;
  const addressList: any = [];
  const walletList: any = [];
  let normalNum = 0;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    initialSupply = ethers.parseUnits('10000000000');
    contractFactory = await ethers.getContractFactory('SltGame');
    contract = await upgrades.deployProxy(contractFactory, [], {
      initializer: 'initialize'
    });
    await contract.waitForDeployment();
    // contract = await contractFactory.deploy();
    ownerAddress = await owner.getAddress();
    aliceAddress = await alice.getAddress();
    bobAddress = await bob.getAddress();

    for (let i = 0; i < 1000; i++) {
      const wallet = ethers.Wallet.createRandom();
      walletList.push(wallet);
      addressList.push(wallet.address);
    }

    await contract.setAdmin(ownerAddress, true);

    const ethersAddrList = await ethers.getSigners();
    for (let index = 0; index < 20; index++) {
      let supAddr = '';
      if (index == 19) {
        supAddr = '0x3bC893BDdBBF5817a61B396A1508988f0112f126';
      } else {
        supAddr = ethersAddrList[index + 1].address;
      }
      await contract.setSuperNode(supAddr);
      for (let i = 0, len = 10; i < len; i++) {
        const addr = addressList[normalNum];
        await contract.setNormalNode(addr, supAddr);
        normalNum++;
      }
    }
    console.log('num,,', normalNum);
  });

  describe('Core', () => {
    it('temp is 0', async () => {
      const list = await ethers.getSigners();
      const provider = new ethers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
      );
      let walletSigner = walletList[0].connect(provider);
      console.log('signer...', walletSigner);
      // 前200普通节点
      // for (let index = 0; index < 200; index++) {
      //   const item = walletList[index + 200];
      //   const signer = item.connect(provider);
      //   const coinObj = new ethers.Contract(contract?.target, contract.interface, signer);
      //   await coinObj.bind(walletList[index].address, {gasPrice:initialSupply});
      // }
      const item = walletList[200];
      const signer = await ethers.getImpersonatedSigner(item.address);
      await contract.connect(signer)?.bind(walletList[0].address);

      const tem1 = await contract.userInfo(ownerAddress);
      console.log('tem..',  signer);
    });
  });
});
