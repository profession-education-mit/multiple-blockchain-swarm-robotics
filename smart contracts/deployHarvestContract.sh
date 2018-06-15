node
Web3 = require('web3')
const fs = require('fs');
web3Chain2 = new Web3(new Web3.providers.HttpProvider("http://localhost:8555"))
code = fs.readFileSync('harvestVoting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
harvestVotingContract = web3Chain2.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
deployedContract = harvestVotingContract.new(['true', 'false'],{data: byteCode, from: web3Chain2.eth.accounts[0], gas: 4700000})
deployedContract.address
contractInstance = harvestVotingContract.at(deployedContract.address)
compiledCode.contracts[':Voting'].interface
address=deployedContract.address
