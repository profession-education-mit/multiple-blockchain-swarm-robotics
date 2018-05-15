pragma solidity ^0.4.21;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bool => uint64) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bool[] public opinionList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bool[] opinionNames) public {
    opinionList = opinionNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bool opinion) view public returns (uint64) {
    return votesReceived[opinion];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForOpinion(bool opinion) public {
    votesReceived[opinion] += 1;
  }
}