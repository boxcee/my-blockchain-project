pragma solidity ^0.4.24;

contract Test {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }
}
