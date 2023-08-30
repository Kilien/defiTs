import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumberish, Contract } from 'ethers';

describe('SignatureNFT.sol', () => {
  let contractFactory: any;
  let contract: Contract;
  let verify: Contract;
  let owner: any;
  let alice: any;
  let bob: any;
  let initialSupply: BigNumberish;
  let ownerAddress: string;
  let aliceAddress: string;
  let bobAddress: string;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    initialSupply = ethers.parseEther('100000');
    ownerAddress = await owner.getAddress();
    contractFactory = await ethers.getContractFactory('SignatureNFT');
    contract = await contractFactory.deploy('SignatureNFT', 'SN', ownerAddress);
    const verifyFactory: any = await ethers.getContractFactory('VerifySignature');
    verify = await verifyFactory.deploy();
    aliceAddress = await alice.getAddress();
    bobAddress = await bob.getAddress();
  });

  describe('Correct setup', () => {
    it("should be named 'SignatureNFT", async () => {
      const name = await contract.name();
      expect(name).to.equal('SignatureNFT');
    });

    it('hash verify...', async () => {
      console.log('signer address...', ownerAddress);

      const baseHash = await contract.getMessageHash(aliceAddress, '1');

      const pack = ethers.solidityPacked(['address', 'uint256'], [aliceAddress, '1']);
      const msg = ethers.solidityPackedKeccak256(['bytes'], [pack]);
      const signature = await owner.signMessage(ethers.getBytes(msg));
      const sigVRS = ethers.Signature.from(signature);

      const recover = await contract.recoverSigner(msg, signature);
      console.log('recover addr...', recover);

      console.log('is base hash...', baseHash == msg);

      // const res = await contract.freeMintForRSV(aliceAddress, '1', sigVRS.r, sigVRS.s, sigVRS.v);
      const res = await contract.freeMintForSignature(aliceAddress, '1', signature)
      const balance = await contract.balanceOf(aliceAddress);
      console.log('balance...', balance);
    });
  });
});
