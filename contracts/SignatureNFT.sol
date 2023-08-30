// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureNFT is ERC721 {
    address public immutable signer; // 签名地址
    mapping(address => bool) public mintedAddress; // 记录已经mint的地址

    // 构造函数，初始化NFT合集的名称、代号、签名地址
    constructor(
        string memory _name,
        string memory _symbol,
        address _signer
    ) ERC721(_name, _symbol) {
        signer = _signer;
    }

    /**
     *根据签名mint
     * @param _account 用户
     * @param _tokenId id
     * @param _signature 签名
     */
    function freeMintForSignature(
        address _account,
        uint256 _tokenId,
        bytes memory _signature
    ) external {
        bytes32 hashs = keccak256(abi.encodePacked(_account, _tokenId));
        require(verifyForSignature(hashs, _signature), "Invalid signature"); // ECDSA检验通过
        require(!mintedAddress[_account], "Already minted!"); // 地址没有mint过

        mintedAddress[_account] = true; // 记录mint过的地址
        _mint(_account, _tokenId); // mint
    }

    /**
     * 根据结构后的RSV铸造
     * @param _account 用户地址
     * @param _tokenId id
     * @param r r
     * @param s s
     * @param v v
     */
    function freeMintForRSV(
        address _account,
        uint256 _tokenId,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) external {
        bytes32 hashs = keccak256(abi.encodePacked(_account, _tokenId));
        bytes32 message = ECDSA.toEthSignedMessageHash(hashs);

        require(verifyForRSV(message, r, s, v), "Invalid signature"); // ECDSA检验通过
        require(!mintedAddress[_account], "Already minted!"); // 地址没有mint过

        mintedAddress[_account] = true; // 记录mint过的地址
        _mint(_account, _tokenId); // mint
    }

    /*
     * 将mint地址（address类型）和tokenId（uint256类型）拼成消息msgHash
     * _account: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
     * _tokenId: 0
     * 对应的消息msgHash: 0x1bf2c0ce4546651a1a2feb457b39d891a6b83931cc2454434f39961345ac378c
     */
    function getMessageHash(
        address _account,
        uint256 _tokenId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account, _tokenId));
    }

    // ECDSA验证，调用ECDSA库的verify()函数
    function verifyForSignature(
        bytes32 _msgHash,
        bytes memory _signature
    ) public view returns (bool) {
        return recoverSigner(_msgHash, _signature) == signer;
    }

    // 验证RSV是否是signer
    function verifyForRSV(
        bytes32 _msgHash,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) public view returns (bool) {
        return ecrecover(_msgHash, v, r, s) == signer;
    }

    function recoverSigner(
        bytes32 hash,
        bytes memory signature
    ) public pure returns (address) {
        bytes32 messageDigest = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
        return ECDSA.recover(messageDigest, signature);
    }
}
