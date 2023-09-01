import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const ALCHEMY_MAINNET_WSSURL =
    'wss://polygon-mainnet.g.alchemy.com/v2/2gO488VNaTfSlrraNE9BYJaKg6YoDQdv';
  const provider = new ethers.WebSocketProvider(ALCHEMY_MAINNET_WSSURL);

  const iface: any = new ethers.Interface([
    'function transfer(address, uint) public returns (bool)'
  ]);

  let i = 0;
  provider.on(
    'pending',
    throttle(async (txHash: any) => {
      if (txHash && i < 2) {
        // 获取tx详情
        let tx = await provider.getTransaction(txHash);
        if (tx) {
          // filter pendingTx.data
          if (tx.data.indexOf(iface.getFunction('transfer').selector) !== -1) {
            // 打印txHash
            console.log(`\n[${new Date().toLocaleTimeString()}] 监听Pending交易: ${txHash} \r`);

            // 打印解码的交易详情
            let parsedTx = iface.parseTransaction(tx);
            console.log('pending交易详情解码：');
            console.log(parsedTx);
            // Input data解码
            console.log('Input Data解码：');
            console.log(parsedTx.args);
          }
          i++;
        }
      }
    }, 1000)
  );
}

function throttle(callback: (e: any) => void, duration: number = 70) {
  let throttleTimer: any;
  return (e: any) => {
    if (throttleTimer) return;

    throttleTimer = setTimeout(() => {
      callback(e);
      throttleTimer = null;
    }, duration);
  };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
