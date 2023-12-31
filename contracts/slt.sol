// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SLT is Ownable {
    IERC20 public usdt;
    IERC20 public slt;
    struct UserInfo {
        uint id;
        uint lv;
        uint claimed;
        uint toClaim;
        uint stakeAmount;
        address[] referrals;
        address invitor;
        uint lastLevel;
        uint lowNum;
    }

    struct sectionTree {
      uint id;
      address userAddress;
    }

    mapping(address => uint) public addressToIndex;
    mapping(uint => address) public indexToAddress;

    mapping(uint => address) public referrer;
    mapping(address => uint) public userIndex;
    mapping(address => UserInfo) public userInfo;
    uint public totalStakeAmount;

    event Stake(address indexed player, uint indexed amount);
    event Unstake(address indexed player, uint indexed amount);

    constructor(address tokenA_, address tokenB_) {
        usdt = IERC20(tokenA_);
        slt = IERC20(tokenB_);
        addressToIndex[msg.sender] = 0;
        indexToAddress[0] = msg.sender;
        userInfo[msg.sender].invitor = address(this);
        userInfo[msg.sender].lastLevel = 1;
        userInfo[msg.sender].lowNum = 1;
    }

    function setToken(address tokenA_, address tokenB_) external onlyOwner {
        usdt = IERC20(tokenA_);
        slt = IERC20(tokenB_);
    }

    function setInviter(address userAddr_) external returns (bool) {
        require(
            userInfo[msg.sender].invitor == address(0),
            "Already have referrals"
        );
        userInfo[msg.sender].invitor = userAddr_;
        userInfo[msg.sender].id = findIndex(userAddr_);

        if (userInfo[userAddr_].referrals.length < 3) {
            userInfo[userAddr_].referrals.push(msg.sender);
        }

        return true;
    }

    function calculateSquareRoot(uint256 index) public pure returns (uint256) {
        require(index >= 1, "Index must be greater than or equal to 1");

        uint256 guess = index / 2;
        uint256 lastGuess;

        while (guess != lastGuess) {
            lastGuess = guess;
            guess = (guess + index / guess) / 2;
        }

        return guess;
    }

    function levelToArray(
        uint index,
        uint level
    ) public pure returns (uint start, uint end) {
        uint temp = index * 3 ** level;
        for (uint i = 0; i < level - 1; i++) {
            temp += 3 ** (level - i - 1);
        }
        temp += 1;
        uint length = 3 ** level;
        start = temp;
        end = start + length - 1;
    }

    function findLowNum(address addr) public view returns (uint) {
        uint out;
        while (true) {
            if (addr == address(this)) {
                out = 0;
                break;
            }
            if (userInfo[addr].lowNum == 0) {
                addr = userInfo[addr].invitor;
            } else {
                out = userInfo[addr].lowNum;
                break;
            }
        }
        return out;
    }

    function findIndex(address addr) public returns (uint) {
        uint index = addressToIndex[addr];
        uint out = 0;
        uint level = userInfo[addr].lastLevel;
        if (level == 0) {
            level = 1;
        }
        uint lowNum = findLowNum(addr);
        uint start;
        uint end;
        while (true) {
            if (out != 0) {
                break;
            }
            (start, end) = levelToArray(index, level);
            if (lowNum <= end) {
                if (lowNum < start) {
                    lowNum = start;
                }
                for (uint i = lowNum; i <= end; i++) {
                    if (indexToAddress[i] == address(0)) {
                        out = i;
                        userInfo[addr].lowNum = i;
                        userInfo[addr].lastLevel = level;
                        break;
                    }
                    continue;
                }
            }
            level += 1;
        }
        return out;
    }

    function _bind(address sender, address invitor) public {
        require(addressToIndex[sender] == 0, "already bond");
        uint index = findIndex(invitor);
        addressToIndex[sender] = index;
        indexToAddress[index] = sender;
        index -= 1;
        userInfo[sender].invitor = indexToAddress[index / 3];
    }

    function stake() external {
        require(userInfo[msg.sender].invitor == address(0), "already bond");
    }
}
