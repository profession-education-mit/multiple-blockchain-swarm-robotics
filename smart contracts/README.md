# Deploying the contracts
Make two blockchains using Ganache. The `smart contracts` directory contains the smart contracts for both the survey and harvest blockchains. 

In order to compile the smart contracts with node, run the following commands (in the node console). NB -- in order to do this you must have solc (the solidity compiler) and ganache-cli installed, and ganache needs to be running. 

MAKE SURE that you are using the latest version of nodejs and have yarn installed. If you don't have yarn installed first do: `npm install yarn`.
````
$ yarn install
...
$ yarn deployFirstChain

listening on host 8545...
````

To deploy the second blockchain: 
```
$ yarn deploySecondChain

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

