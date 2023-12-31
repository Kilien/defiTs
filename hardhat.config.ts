import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

const PrivateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      },
      {
        version: '0.5.0',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      },
      {
        version: '0.6.2',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      },
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true, // 合约优化
            runs: 200,
          }
        }
      }
    ]
  },

  networks: {
    bscTestnet: {
      url: 'https://data-seed-prebsc-2-s1.bnbchain.org:8545',
      chainId: 97,
      accounts: [`${PrivateKey}`],
      gasPrice: 50000000000,
      timeout: 600000000
    },
    testMatic: {
      url: 'https://rpc-mumbai.maticvigil.com',
      chainId: 80001,
      accounts: [`${PrivateKey}`]
    },
    testArb: {
      url: "https://arbitrum-goerli.publicnode.com",
      chainId: 421613,
      accounts: [`${PrivateKey}`],
      timeout: 600000000,
    },
    bsc: {
      url: 'https://bsc.publicnode.com',
      chainId: 56,
      accounts: [`${PrivateKey}`]
    },
    polygon: {
      url: 'https://polygon.drpc.org',
      chainId: 137,
      accounts: [`${PrivateKey}`]
    },
    Arb: {
      url: "https://1rpc.io/arb",
      chainId: 0xa4b1,
      accounts: [`${PrivateKey}`],
      timeout: 600000000,
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BscKey as string,
      testMatic: process.env.MaticKey as string,
      testArb: process.env.ARBKey as string,
      Arb: process.env.ARBKey as string,
      bsc: process.env.BscKey as string,
      polygon: process.env.MaticKey as string,
    }
  }
};

export default config;
