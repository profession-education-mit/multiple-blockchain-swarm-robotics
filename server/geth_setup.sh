#!/bin/bash

nodeCount=0
while read p; do
    nodeName=$p | cut -d "," -f 1
    if $nodeCount > 9
    then
        geth --datadir "blockchains/$nodeName" init "/Users/brunoprela/Documents/Projects/MultipleBlockchainSwarmRobotics/blockchains/harvestChain/Genesis.json"
    else
        geth --datadir "blockchains/$nodeName" init "/Users/brunoprela/Documents/Projects/MultipleBlockchainSwarmRobotics/blockchains/surveyChain/Genesis.json"
    fi
    $nodeCount += 1
done <geth_nodes.txt
