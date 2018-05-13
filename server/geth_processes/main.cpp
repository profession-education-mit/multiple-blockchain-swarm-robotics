#include "geths.h"

#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <stdint.h>
#include <stdexcept>
#include <string>
#include <sstream>
#include <fstream>
#include <limits>
#include <algorithm>
#include <sys/types.h>
#include <map>

#include <vector>

using namespace std;

struct simulationState{
	string baseDir; /* Basedir of the controller folder */
	string mappingPath;
	string regenerateFile;
	string blockchainPath;
	string datadirBase;
	string baseDirRaw;
	int basePort;
	bool useClassicalApproach;
} simulationParams;


map<int, string> enodes;
map<int, string> coinbaseAddresses;
string interface; // Smart contract interface

int main(){
    int nodeInt = 0;

	for (int robotId = 0; robotId < 4; robotId++){

		//set up the simulation parameters
    	//simulationParams = new simulationState();
    	simulationParams.basePort = 33200;
    	simulationParams.baseDirRaw = "";
    	ostringstream blockPathStream;
		blockPathStream << "eth_data/data" << robotId;

		cout << "blockchainPath is " << blockPathStream.str() << endl;

    	simulationParams.blockchainPath = blockPathStream.str();


	    /* Find out on which cluster node this robot's geth process should be executed */
	    ostringstream genesisPathStream;
	    genesisPathStream << simulationParams.baseDirRaw << "genesis/genesis" << simulationParams.basePort  << ".json";
	    string genesisPath = genesisPathStream.str();
	    
	    geth_init(robotId, nodeInt, simulationParams.basePort, simulationParams.blockchainPath, genesisPath);
	    start_geth(robotId, nodeInt, simulationParams.basePort, simulationParams.blockchainPath);
	    createAccount(robotId, nodeInt, simulationParams.basePort, simulationParams.blockchainPath);
	    
	    coinbaseAddresses[robotId] = getCoinbase(robotId, nodeInt, simulationParams.basePort, simulationParams.blockchainPath);	    
	    prepare_for_new_genesis(robotId, nodeInt, simulationParams.basePort, simulationParams.blockchainPath);   

	}
	for (int robotId = 0; robotId < 4; robotId++){
		cout << "address is   " << coinbaseAddresses[robotId] << endl;
	}
}