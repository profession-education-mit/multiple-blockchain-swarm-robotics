This directory contains the smart contracts for both the survey and harvest blockchains. 


In order to compile the smart contracts with node, run the following commands (in the node console). NB -- in order to do this you must have solc (the solidity compiler) and ganache-cli installed, and ganache needs to be running. 

````
$ npm install solc
...
$ npm install ganache-cli
...
$ ganache-cli
listening on host 8545...
````

In order to compile the smart contracts, enter the node console in this folder (example for the survey chain first):

````
$ node
> Web3 = require('web3')
> web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
> code = fs.readFileSync('surveyVoting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> surveyVotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = surveyVotingContract.new(['White', 'Red'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address // copy this into grid.js, contractInstance --  it changes every time
> contractInstance = surveyVotingContract.at(deployedContract.address)
````

If making a change to the smart contract, you also need to copy the `abi` representation:

````
> //to print the abi:
> compiledCode.contracts[':Voting'].interface
````

copy into `grid.js`:

````
abi = JSON.parse(<new-abi>)
````