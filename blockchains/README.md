#Deploying multiple testnet blockchains to a local network:

need to set up two different geth testnets on two different ports. Each blockchain needs a separate folder.

Instructions adapted from: https://medium.com/mercuryprotocol/how-to-create-your-own-private-ethereum-blockchain-dad6af82fc9f)

##If creating the directories from scratch

First, make a directory to hold the chain
```
$ mkdir customChain
$ cd customChain
$ touch Genesis.json
$ nano Genesis.json
```

To add the genesis block, change the chain ID, and paste this into `Genesis.json`:

```
{
   "config": {
      "chainId": 1994,
      "homesteadBlock": 0,
      "eip155Block": 0,
      "eip158Block": 0,
      "byzantiumBlock": 0
   },
   "difficulty": "400",
   "gasLimit": "2000000",
   "alloc": {
      "7b684d27167d208c66584ece7f09d8bc8f86ffff": { 
          "balance": "100000000000000000000000" 
      },
      "ae13d41d66af28380c7af6d825ab557eb271ffff": { 
          "balance": "120000000000000000000000" 
      }
   }
}
```


Add the first peer to the network (assuming the mac path to `geth.ipc`):
Launch the geth console for each network instance: change the port for each new chain.

```
$ geth --datadir ./peer1DataDir init ./Genesis.json
$ geth --datadir ./peer1DataDir --networkid 1244 --ipcpath  "~/Library/Ethereum/geth.ipc" --port 30303  console 2>> peer1Eth.log
```

## If launching the directories in this repo (assuming the mac path to `geth.ipc`):
Launch the geth console for each network instance: change the port for each new chain
```
$ geth --datadir ./peer1DataDir --networkid 1244 --ipcpath  "~/Library/Ethereum/geth.ipc" --port 30303  console 2>> peer1Eth.log
```