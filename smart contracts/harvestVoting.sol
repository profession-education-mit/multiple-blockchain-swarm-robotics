pragma solidity ^0.4.21;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public opinionList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames) public {
    opinionList = opinionNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 opinion) view public returns (uint8) {
    require(validOpinion(opinion));
    return votesReceived[opinion];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForOpinion(bytes32 opinion) public {
    require(validCandidate(opinion));
    votesReceived[opinion] += 1;
  }

  function validOpinion(bytes32 opinion) view public returns (bool) {
    for(uint i = 0; i < opinionList.length; i++) {
      if (opinionList[i] == opinion) {
        return true;
      }
    }
    return false;
  }
}