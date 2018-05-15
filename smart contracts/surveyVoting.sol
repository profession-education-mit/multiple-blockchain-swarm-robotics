pragma solidity ^0.4.6;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */

  event onVote(bytes32 opinion, address sender);
  event onVotingEnded(bool consensus, bytes32 opinion);


  mapping (bytes32 => uint64) public votesReceived;
  // mapping (bytes32 => bool) public consensus;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public opinionList;
  uint64 totalVotes;
  uint64 maxVotes;
  bytes32 maxOpinion;
  uint64 public n_rounds;
  address[] public voterIDs;

  /* Maps how many times a certain address has been in the minority*/
  mapping (address => uint64) public byzantineCount;

  /* Maps an address to a vote for each round (updated, not cleared, after each round)*/
  mapping (address => bytes32) public individualVotes;


  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] opinionNames) public {
    opinionList = opinionNames;
  }

  function votingRoundEnded() public {
    consensusReached();
    for(uint i = 0; i < opinionList.length; i++) {
        votesReceived[opinionList[i]] = 0;
        totalVotes = 0;
    }
    n_rounds = n_rounds + 1;

    for(uint i = 0; i < voterIDs.length; i++) {
        if (individualVotes[voterIDs[i]] != maxOpinion) {
            byzantineCount[voterIDs[i]] += 1;
        }

     voterIDs = new address[](0);  /* this might not be a good way to do this*/
    }
  }

  function countVotes() view public returns (bytes32, uint64) {
    maxVotes = 0;
    for(uint i = 0; i < opinionList.length; i++) {
      if (votesReceived[opinionList[i]] > maxVotes) {
          maxVotes = votesReceived[opinionList[i]];
          maxOpinion = opinionList[i];
      }
    }
    return(maxOpinion, maxVotes);
  }

  function consensusReached() view public returns (bool, bytes32) {
      if (maxVotes == totalVotes) {
        onVotingEnded(true, maxOpinion);
      }
      else {
        onVotingEnded(false, maxOpinion);
      }
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 opinion) view public returns (uint64) {
    require(validOpinion(opinion));
    return votesReceived[opinion];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForOpinion(bytes32 opinion, address sender) public {
      require(validOpinion(opinion));
      onVote(opinion, sender);
      if (byzantineCount[sender] < 0.7*n_rounds) {
          votesReceived[opinion] += 1;
          individualVotes[sender] = opinion;
          voterIDs += sender;
          totalVotes += 1;
      }
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
