import { ethers } from 'hardhat';

export default async function vanityAddr(regex:any= '/^0x.*007$/') {
  let wallet:any;
  let isValid = false;
  let i = 0;
  while (!isValid) {
    wallet = ethers.Wallet.createRandom(); // Random Wallet
    const regexp = new RegExp(regex);
    isValid = regexp.test(wallet.address); // regex test
    if (i % 10 == 0) {
      console.log('cur addr...', wallet.address);
    }
    i++;
  }
  // vanityAddress and privatekey
  console.log(`vanityAddress...${wallet.address}`);
  console.log(`privatekey....${wallet.privateKey}`);

  return wallet.address;
}
