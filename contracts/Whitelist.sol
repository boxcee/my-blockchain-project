pragma solidity 0.4.24;


contract Whitelist {
  address public owner;
  mapping(address => bool) public whitelisted;

  constructor () public {
    owner = msg.sender;
    whitelisted[msg.sender] = true;
  }

  modifier onlyOwner () {
    require(owner == msg.sender);
    _;
  }

  function addToWhitelist (address _address) onlyOwner public returns (bool success) {
    whitelisted[_address] = true;
    return whitelisted[_address];
  }

  function isWhitelisted (address _address) public view returns (bool success) {
    return whitelisted[_address];
  }
}
