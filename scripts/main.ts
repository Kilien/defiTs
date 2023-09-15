import { ethers } from "hardhat";
import deploy from "../utils/deploy";
import verify from "../utils/verify";
import upgrade from "../utils/upgrade";
import vanityAddr from "../utils/vanityAddr";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const amount = ethers.parseEther("400000000");

  // const addr = await deploy('baseToken', [amount]);
  // await verify("contracts/baseToken.sol:baseToken", '0xa288e965e86ac4e5c03352f199cc7a66022e15a8', [amount]);
  // await verify('0xA2dc8D106d09Eb63aE4eDDDE7B8de083ce49bba5', []);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});