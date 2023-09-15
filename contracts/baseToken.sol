// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract baseToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Black Whale", "xXx") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    // withdrowFee
    function withdrowFee(address wallet_,uint amount_) external onlyOwner {
        _transfer(address(this), wallet_, amount_);
    }
}