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

    bytes32[] public opinionList;
    bytes32[20] public individualVotes;
    bool[20] public bannedRobots;
    uint64 totalVotes;
    uint64 maxVotes;
    bytes32 maxOpinion;
    bytes32 otherOpinion;    
    bool consensus;
    uint64 numRounds;
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
        numRounds += 1;

        for(uint8 j = 0; j < 20; j++) {
            if (individualVotes[j] != maxOpinion) {
                byzantineCount[j] += 1;
            }

            if (numRounds > 4){
                if (byzantineCount[j] > numRounds/2) {
                    bannedRobots[j] = true;
                }
            }
        }

        for(uint8 i = 0; i < opinionList.length; i++) {
            votesReceived[opinionList[i]] = 0;
            totalVotes = 0;
        }        
    }

    function seeBanned() view public returns (uint32[20], bool[20], uint64) {
        return(byzantineCount, bannedRobots, numRounds);
    }

    function countVotes() view public returns (bytes32, bytes32, uint64) {
        maxVotes = 0;
        if(votesReceived[opinionList[0]] > votesReceived[opinionList[1]]){
            maxOpinion = opinionList[0];
            otherOpinion = opinionList[1];
            maxVotes = votesReceived[opinionList[0]];
        }
        else{
            maxOpinion = opinionList[1];
            otherOpinion = opinionList[0];
            maxVotes = votesReceived[opinionList[1]];
        }
        return(maxOpinion, otherOpinion, maxVotes);
    }

    function consensusReached() view public returns (bool, bytes32) {
        countVotes();
        if (maxVotes == totalVotes) {
            consensus = true;
            onVotingEnded(true, maxOpinion);
        } else {
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

    //resets all the variables that get carries between voting rounds
    function initialise() {
        numRounds = 0;
        consensus  =false;
        for(uint8 i = 0; i < 20; i++) {
            bannedRobots[i] = false;
            byzantineCount[i] = 0;
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
