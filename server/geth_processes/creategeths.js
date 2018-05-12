const { exec } = require('child_process');


function start_geths(robot){
	exec(`geth --exec --verbosity 5 --networkid 2 --ipcpath  ./blockchains/surveyChain/peer${robot}DataDir/geth.ipc  --datadir="./blockchains/surveyChain/peer${robot}DataDir"  --port ${30303+robot} --rpcport ${8100+robot} --maxpeers 130`, (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
	    console.log(err);
	    return;
	  }

	  // the *entire* stdout and stderr (buffered)
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	});
}

for(var i=1; i< 4; i++){
	start_geths(i);
	console.log("started");
}