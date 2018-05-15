# multiple_blockchain_swarm_robotics


## intro
This codebase is intended as a local test of multi-blockchain interactions. In particular, the relevant directories are the `client` and `smart contracts`. In order to run this simulation, the `smart contracts` must be deployed, and ganache-cli running a local blockchain instance. Instructions for compilation and running this code may be found below. 

The simulation itself can be viewed in the browser.


# Deploying the contracts
Make two blockchains using Ganache. The `smart contracts` directory contains the smart contracts for both the survey and harvest blockchains. 

In order to compile the smart contracts with node, run the following commands (in the node console). NB -- in order to do this you must have solc (the solidity compiler) and ganache-cli installed, and ganache needs to be running. 

````
$ npm install solc
...
$ npm install ganache-cli
...
$  ganache-cli --gasLimit=1000000000000 --gasPrice 200 --deterministic --account "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d, 100000000000000000000000000000000"

listening on host 8545...
````

To deploy the second blockchain: 
```
$  ganache-cli --gasLimit=1000000000000 --port 8555 --gasPrice 200 --deterministic --account "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d, 100000000000000000000000000000000"

listening on host 8555...
```


In order to compile the smart contracts, enter the node console in this folder (example for the survey chain first). This code is now in `deploySurveyContract.sh`. Because of a bug with printing the adress from the command line, to deploy the contract, copy and paste the code from this into the terminal.

````
$ node
> Web3 = require('web3')
> web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
> code = fs.readFileSync('surveyVoting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> surveyVotingContract = web3Chain1.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = surveyVotingContract.new(['White', 'Red'],{data: byteCode, from: web3Chain1.eth.accounts[0], gas: 4700000})
> deployedContract.address // copy this into grid.js, contractInstance --  it changes every time
> contractInstance = surveyVotingContract.at(deployedContract.address)
````

The same applies to the harvest chain, with the chain name, port and contract changed. 

If making a change to the smart contract, you also need to copy the `abi` representation:

````
> //to print the abi:
> compiledCode.contracts[':Voting'].interface
````

copy into `grid.js`:

````
abi = JSON.parse(<new-abi>)
````

Copy and paste the values for the `surveyChain` contract into `surveyAbi` (abi) and `surveyContractInstance` (address). Do the same for the harvest contract.

# Guide to client code

The frontend code is run as a webApp in the browser. The script talks to both a backend server that stores data for processing, and communicates with blockchain processes through the web3 API. Each robot acts as a peer in a blockchain network. Open `index.html` to run the simulation.

## Initialisation

### web3
Need to initialise web3 to talk to the contracts. Use the instructions in the smart contracts folder to set up the `contractInstance` and the addresses.

### grid setup
`gridHeight` and `gridWidth` setup the dimensions of the simulation. `theGrid` is an array of these dimensions that contains the state of the grid (the colour of the squares, whether a robot is at a location). 

`initialiseGrid()` sets up `theGrid`, assigning colours to each square.


### robot setup
This script sets up 2 separate robot swarms, both using the function `initialiseRobots()`. Each swarm is stored in a separate array (`surveyBotArr`, and `harvestBotArr`).


## Rendering (html canvas)
The two rendering functions are `drawGrid()` and `drawRobots()` 


## Movement
The surveyBots move once every steps, and the harvestBots move once every 10 steps. With each of these movements, the robot manouvers randomly through the Von Neumann neighbourhood (NEWS), moving one step per movement event. 

Each swarm is moved using the function `moveRobots`, which randomly selects the robot path 
The robot can only move to an empty square: 


## Voting

### survey bots
Voting is run once every 10 movement cycles by the functions `surveyBotVoting` and `harvestBotVoting`. `surveyBotVoting` is the voting method for the survey bots, and vice versa.

In order to vote, the robots need to 


### web3