pragma solidity 0.4.24;


import "./Whitelist.sol";


contract ChallengeToken {
  uint256 public totalSupply = 1000000;
  string public name = "ChallengeToken";
  uint8 public decimals = 8;
  string public symbol = "CHT";
  Whitelist private whitelist;

  mapping(address => uint256) public balances;
  mapping (address => mapping (address => uint256)) public allowed;

  uint256 constant private MAX_UINT256 = 2**256 - 1;
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  constructor (address _whitelist) public {
    balances[msg.sender] = totalSupply;
    whitelist = Whitelist(_whitelist);
  }

  function name() public view returns (string) {
    return name;
  }

  function symbol() public view returns (string) {
    return symbol;
  }

  function decimals() public view returns (uint8) {
    return decimals;
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(whitelist.isWhitelisted(_to) == true);
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(whitelist.isWhitelisted(_to) == true);
    uint256 allowance = allowed[_from][msg.sender];
    require(balances[_from] >= _value && allowance >= _value);
    balances[_to] += _value;
    balances[_from] -= _value;
    if (allowance < MAX_UINT256) {
      allowed[_from][msg.sender] -= _value;
    }
    emit Transfer(_from, _to, _value);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }
}
