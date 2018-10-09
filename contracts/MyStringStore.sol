pragma solidity 0.4.23;


contract MyStringStore {
  string public myString = "Hello World";

  function set(string x) public {
    myString = x;
  }
}
