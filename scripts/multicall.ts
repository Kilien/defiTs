import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import resData from './resData';

const config = {
  multicall3Abi: [
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'aggregate',
      outputs: [
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bool', name: 'allowFailure', type: 'bool' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call3[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'aggregate3',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bool', name: 'allowFailure', type: 'bool' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call3Value[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'aggregate3Value',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'blockAndAggregate',
      outputs: [
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getBasefee',
      outputs: [{ internalType: 'uint256', name: 'basefee', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
      name: 'getBlockHash',
      outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getBlockNumber',
      outputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getChainId',
      outputs: [{ internalType: 'uint256', name: 'chainid', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentBlockCoinbase',
      outputs: [{ internalType: 'address', name: 'coinbase', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentBlockDifficulty',
      outputs: [{ internalType: 'uint256', name: 'difficulty', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentBlockGasLimit',
      outputs: [{ internalType: 'uint256', name: 'gaslimit', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentBlockTimestamp',
      outputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
      name: 'getEthBalance',
      outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getLastBlockHash',
      outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'tryAggregate',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Call[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'tryBlockAndAggregate',
      outputs: [
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall3.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    }
  ],
  testAbi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'invitor',
          type: 'address'
        }
      ],
      name: 'Bond',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimGroupReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimLPReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimNewReferReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimNodeReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimReferReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ClaimReward',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8'
        }
      ],
      name: 'Initialized',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'slotId',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        }
      ],
      name: 'Renew',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'power',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'slotId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        }
      ],
      name: 'Stake',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'StakeLP',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'slotID',
          type: 'uint256'
        }
      ],
      name: 'UnStake',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'UnStakeLp',
      type: 'event'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'LpUnLockTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'admin',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'banker',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'invitor',
          type: 'address'
        }
      ],
      name: 'bond',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'cardNeed',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'cardPower',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'checkBackGroundInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'MSW_BurnAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'LP_stake',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'checkBackGroundUserInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'MSW_Balance',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'MAW_Balance',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'LP_stake',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'ciClaimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'checkGroupUserAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'checkUserClaimInfo',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'types',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256'
            }
          ],
          internalType: 'struct MAWStake.ClaimInfo[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'checkUserGroup',
      outputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'level',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'addrs',
          type: 'address[]'
        }
      ],
      name: 'checkUserInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'lp_claimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'nft_claimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'node_claimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'ci_claimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'newReferClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'referClaimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'checkUserIsGroupOwner',
      outputs: [
        {
          internalType: 'bool',
          name: 'b',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'claimGroupReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'claimInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'types',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        }
      ],
      name: 'claimLpReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'totalReward',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        }
      ],
      name: 'claimNewReferReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'totalReward',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        }
      ],
      name: 'claimNodeReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'claimRate',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'claimReferReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'staticReward',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'CIReward',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          internalType: 'bytes32',
          name: 'r',
          type: 'bytes32'
        },
        {
          internalType: 'bytes32',
          name: 's',
          type: 'bytes32'
        },
        {
          internalType: 'uint8',
          name: 'v',
          type: 'uint8'
        }
      ],
      name: 'claimReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'slotId_',
          type: 'uint256'
        }
      ],
      name: 'countingRenewNeed',
      outputs: [
        {
          internalType: 'uint256',
          name: 'need',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'currentClaimedInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'nftClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'lpClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'groupClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'nodeClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'referClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'newReferClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'ciClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalClaimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'dailyOut',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'frontEndKun',
      outputs: [
        {
          internalType: 'uint256[]',
          name: 'tokenIDs',
          type: 'uint256[]'
        },
        {
          internalType: 'uint256[]',
          name: 'cardIds',
          type: 'uint256[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'group',
      outputs: [
        {
          internalType: 'contract IGroup',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'groupReward',
      outputs: [
        {
          internalType: 'uint256',
          name: 'toClaim',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'claimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'groupTotalOut',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'kun',
      outputs: [
        {
          internalType: 'contract IKun',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lastClaimedInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'nftClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'lpClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'groupClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'nodeClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'referClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'newReferClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'ciClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalClaimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lp',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lpTotalAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'maw',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'msw',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'nextCheckTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'rate',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'renewPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'slotId_',
          type: 'uint256'
        }
      ],
      name: 'renewSlot',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'router',
      outputs: [
        {
          internalType: 'contract IPancakeRouter02',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'safePull',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'admin_',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'isAdmin_',
          type: 'bool'
        }
      ],
      name: 'setAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        }
      ],
      name: 'setBanker',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'group_',
          type: 'address'
        }
      ],
      name: 'setGroup',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'cardType',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        }
      ],
      name: 'setRenewPrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'time',
          type: 'uint256'
        }
      ],
      name: 'setStartTime',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'usdt_',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'maw_',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'msw_',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'kun_',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'lp_',
          type: 'address'
        }
      ],
      name: 'setToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'slotInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'power',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: 'tokenId',
          type: 'uint256[]'
        }
      ],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'stakeLp',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'startTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalOutAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalPower',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'slotId_',
          type: 'uint256'
        }
      ],
      name: 'unStake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'unStakeLp',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'usdt',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'userInfo',
      outputs: [
        {
          internalType: 'address',
          name: 'invitor',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'refer_n',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'referReward',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'referClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'staticClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'CIClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'newReferClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'nodeClaimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'userLPInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'stakeAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'claimed',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'userSlotAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ],

  multicall3Address: '0xcA11bde05977b3631167028862bE2a173976CA11'
};

async function getMulticall3Results(
  multicall3: Contract,
  requireSuccess: boolean,
  funcs: any[]
): Promise<any[]> {
  const calls: any = [];
  for (const func of funcs) {
    let data = func.interface.encodeFunctionData(func.func, func.args);
    calls.push({ target: func.target, callData: data });
  }
  const results = await multicall3.tryAggregate.staticCall(requireSuccess, calls);

  const datas: any = [];
  for (let i = 0; i < results.length; i++) {
    datas.push(funcs[i].interface.decodeFunctionResult(funcs[i].func, results[i][1]));
  }
  return datas;
}

async function main() {
  const [signer] = await ethers.getSigners();
  console.log(`signer: ${await signer.getAddress()}`);

  const multicall3 = new ethers.Contract(config.multicall3Address, config.multicall3Abi, signer);

  const testInfoInterface = new ethers.Interface(config.testAbi);

  const list = [];
  for (let i = 0, len = resData.length; i < len; i++) {
    if (i > 2500) break;
    const addr = resData[i][0];
    list.push({
      target: '0xB97d6641Fd1FFc6D235d6ca8Ef162eacB15B8F67',
      func: 'userLPInfo',
      args: [addr],
      interface: testInfoInterface
    });
  }

  const Results = await getMulticall3Results(multicall3, true, list);

  console.log('vaultInfos:', Results);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
