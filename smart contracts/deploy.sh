node
Web3 = require('web3')
web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
code = fs.readFileSync('surveyVoting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
surveyVotingContract = web3Chain1.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
deployedContract = surveyVotingContract.new(['White', 'Red'],{data: byteCode, from: web3Chain1.eth.accounts[0], gas: 4700000})
deployedContract.address
contractInstance = surveyVotingContract.at(deployedContract.address)