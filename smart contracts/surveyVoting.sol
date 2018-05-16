pragma solidity ^0.4.6;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */

  event onVote(bytes32 opinion, address sender);
  event onVotingEnded(bool consensus, bytes32 opinion);
  event onByzantine(address byzantineRobot);

  mapping (bytes32 => uint64) public votesReceived;

  /* Maps an address to a vote for each round (updated, not cleared, after each round)*/
  mapping (uint8 => bytes32) public individualVotes;

  /* Maps addresses to a boolean indicating if it is banned or not */
  mapping (uint8 => bool) public bannedRobots;

  bytes32[] public opinionList;
  uint64 totalVotes;
  uint64 maxVotes;
  bytes32 maxOpinion;
  bool consensus;
  uint64 public numRounds = 0;
  uint32[20] public byzantineCount;
//  address[] public voterIDs;


  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] opinionNames) public {
    opinionList = opinionNames;
  }

  function votingRoundEnded() public {
    consensusReached();
    for(uint8 i = 0; i < opinionList.length; i++) {
        votesReceived[opinionList[i]] = 0;
        totalVotes = 0;
    }
    numRounds = numRounds + 1;

    for(uint8 j = 0; j < 20; j++) {
        if (individualVotes[j] != maxOpinion) {
            byzantineCount[j] += 1;
        }

        if (numRounds > 6){
            if (byzantineCount[j] > numRounds/2) {
                bannedRobots[j] = true;
                onByzantine(j);
            }
        }
    }
  }

  function countVotes() view public returns (bytes32, uint64, uint64) {
    maxVotes = 0;
    for(uint i = 0; i < opinionList.length; i++) {
      if (votesReceived[opinionList[i]] > maxVotes) {
          maxVotes = votesReceived[opinionList[i]];
          maxOpinion = opinionList[i];
      }
    }
    return(maxOpinion, maxVotes, totalVotes); 
  }

  function consensusReached() view public returns (bool, bytes32) {
      countVotes();
      if (maxVotes == totalVotes) {
        consensus = true;
        onVotingEnded(true, maxOpinion);
      }
      else {
        consensus = false;
        onVotingEnded(false, maxOpinion);
      }
    return(consensus, maxOpinion);
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 opinion) view public returns (uint64) {
    require(validOpinion(opinion));
    return votesReceived[opinion];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForOpinion(bytes32 opinion, uint8 sender) public {
      require(validOpinion(opinion));
      onVote(opinion, sender);
      if (!bannedRobots[sender]) {
          votesReceived[opinion] += 1;
          individualVotes[sender] = opinion;
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
