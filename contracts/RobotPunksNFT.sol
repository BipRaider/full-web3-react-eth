// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// https://docs.openzeppelin.com/contracts/4.x/access-control
import "@openzeppelin/contracts/access/Ownable.sol";
contract RobotPunksNFT is ERC721, Ownable {
    /*** The `uint256` should be to set correctly. Because the transaction will cost you dearly.*/
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    /*** The token url. */
    string internal baseTokenUri;
    /*** The your wallet address. */
    address payable public withdrawWallet;
    /*** List all adresses insade the contrcat.*/
    mapping(address => uint256) public walletMints;
    constructor() payable ERC721('RobotPunk', 'RP') {
      mintPrice = 0.02 ether;
      totalSupply = 0;
      maxSupply = 1000;
      maxPerWallet = 3;
        // set withdraw wallet address
    }
    // Only the owner of this contract can call the function.
    /*** Set public mint enabled to the contract.*/
    function setIsPublicMintEnable(bool isPublicMintEnabled_ ) external onlyOwner {
      isPublicMintEnabled = isPublicMintEnabled_;
    }
    /*** Set the base token url to the contract.*/
    function setBaseTokenUri(string calldata baseTokenUri_ ) external onlyOwner {
      baseTokenUri = baseTokenUri_;
    }
    /*** Check the withdraw balance of this contract.*/
    function withdraw() external onluOwner {
      (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
      // Check withdraw balance
      require(success, "withdraw failed.");
    }
    // The function that can use are not only the owner of the contract.
    /*** Converting a token id and encoding it to string format then saves to a json file.*/
    function tokenUri(uint256 tokenId_) public view override returns (string memory) {
      // check token id
      require(_exists(tokenId_), 'token does not exist!' );
      return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }
    /*** The function for payment per of the contract.
     **  This main function incide of the contract.
     */
    function mint(uint256 quantity_) public payable {
      // Check the isPublicMintEnabled value it should be enabled and the value to be true.
      require(isPublicMintEnabled, 'minting not enabled.');
      // Checking that the quantity should be equal to msg.value. A user should enter the correct price.
      require(msg.value == quantity_ * mintPrice, 'wrong mint value');
      // Checking that the quantity should be less than maxSupply.
      require(totalSupply + quantity_ <= maxSupply, 'sold out');
      // Checking that the quantity_ should be less than the wallet has ether.
      require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

      for (uint256 i = 0; i < quantity_; i++) {
        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender, newTokenId);
      }
    }
}