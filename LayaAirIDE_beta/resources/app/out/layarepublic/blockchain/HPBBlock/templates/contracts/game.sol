pragma solidity ^0.4.24;

import "./Pausable.sol";
import "./SafeMath.sol";

contract GAME_SYMBOL is Pausable {
  using SafeMath for uint256;
  bytes public name;
  mapping (address => uint256) private scores;

  constructor() public {
    name = "GAME_SYMBOL";
  }

  /** 
   * 添加积分
   */
  function addScore(address addr, uint256 v) public onlyOwner returns(uint256) {
    scores[addr] = scores[addr].add(v);
    return scores[addr];
  }

  /**
   * 获取积分
   */
  function getScore() public view returns(uint256) {
    return scores[msg.sender];
  }
}