//draws the grid for the robots
function init(){
	//contract setup
	web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	abi = JSON.parse('[{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"validOpinion","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"voteForOpinion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"opinionList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"opinionNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
	surveyVotingContract = web3Chain1.eth.contract(abi);
	// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
	contractInstance = surveyVotingContract.at('0xd135312282031ec6b2153e5c212805e266973162');
	opinions = {"White": "white", "Red": "red"}

    //constants
	var gridHeight = 16;
	var gridWidth = 16;
	var theGrid = [];
	var blockSize = 50;
	var numSurveyBots = 20;
	var numSurveyByzantine = 2;
	var numHarvestByzantine = 1;
	var numHarvestBots = 10;
	var stepsToCount = 10;
	var robotRange = 6;
	var numLocalOpinions = 5;

	//arrays of robots
	var surveyBotArr = [];
	var harvestBotArr = [];

	//symbols
	var surveySymbol = 'x';
	var harvestSymbol = 'o';	

	//handles the canvas
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	initialiseGrid(); //create the starting state for the grid by filling it with random cells
	drawGrid();
	initialiseRobots(surveyBotArr, numSurveyBots, numSurveyByzantine);
	initialiseRobots(harvestBotArr, numHarvestBots, numHarvestByzantine);	
	main();
	
	//functions
	async function main() { //main loop
		while(true){
		    drawGrid();
		   	drawRobots(surveyBotArr, surveySymbol);
		   	drawRobots(harvestBotArr, harvestSymbol);

		   	//survey bots move more than harvest bots
		   	for(var i=0; i<stepsToCount; i++){
		    	await sleep(1000);
		    	//every timestep, clears the canvas
		    	ctx.clearRect(0, 0, 0.5 + gridHeight*blockSize, 0.5 + gridWidth*blockSize);

		    	//movement, drawing cycle
		    	moveRobots(surveyBotArr, numSurveyBots);
		    	countCurrentSquare(surveyBotArr, numSurveyBots);
		    	drawGrid();
		   		drawRobots(surveyBotArr, surveySymbol);
		   		drawRobots(harvestBotArr, harvestSymbol);
		    }

		    //move the harvest bots
		    moveRobots(harvestBotArr, numHarvestBots);

		    surveyBotVoting(surveyBotArr, numSurveyBots);
		    resetRobots(surveyBotArr);

		    //generic wait (3 secs)
		    await sleep(1000);
		    //every timestep, clears the canvas
		    ctx.clearRect(0, 0, 0.5 + gridHeight*blockSize, 0.5 + gridWidth*blockSize);
		}
	}

	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function resetRobots(robotArr, numRobots) {
		for (var i = 0; i < robotArr.length; i++){
			robotArr[i].localGroup = [];
        }
	}

	function initialiseGrid() { //fill the grid randomly
	    for (var j = 0; j < gridHeight; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth; k++) { //iterate through columns
	            theGrid.push({
	            	red: Math.round(Math.random()),
	            	hasRobot: false,
	            });
	        }
	    }
	}

	function initialiseRobots(robotArr, numRobots, numByzantine){
		var i = 0;
		while (i < numRobots) { //iterate through rows
			var j = Math.round(Math.random()*(gridHeight -1));
			var k = Math.round(Math.random()*(gridHeight -1));
			var byz = (i < numByzantine);
			if(theGrid[k + j*gridWidth].hasRobot == false){
				robotArr.push({
					j: j,
					k: k,
					id: i,
					byzantine: byz,
					opinion: 0,
					redSquares:0,
					totalSquares:0,
					localGroup: [],
					localGroupOpinions: []
				});
				theGrid[k + j*gridWidth].hasRobot = true;
				i++;
			}
		}
	}


	function drawGrid() { //draw the contents of the grid onto a canvas
    ctx.fillStyle = "red";
	    ctx.clearRect(0, 0, gridHeight*blockSize, gridWidth*blockSize); //this should clear the canvas ahead of each redraw
	    for (var j = 0; j < gridHeight; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth; k++) { //iterate through columns
	            if (theGrid[k + j*gridWidth].red == 1) {
	                ctx.fillRect(0.5 + j*blockSize, 0.5 + k*blockSize, blockSize, blockSize);
	                ctx.fill();  
	            }
	        }
	    }
	}

	function drawRobots(robotArr, symbol){
		// for i = 0:numrobots
		// place a robot on a random square
		for (var i = 0; i < robotArr.length; i++){
	        ctx.font = "bold 40px Arial";
	        if(robotArr[i].byzantine == true) ctx.fillStyle = "blue";
			else ctx.fillStyle = "black";
            ctx.fillText(symbol, (robotArr[i].j)*blockSize + 15, (robotArr[i].k)*blockSize + 38);
        	}
	    }


	function countCurrentSquare(robotArr, numRobots){
		for(var i=0; i<numRobots; i++){
			var j = robotArr[i].j;
			var k = robotArr[i].k;
			//add to red square vote if been on red square
			if(theGrid[k + j*gridWidth].red == true){
				robotArr[i].redSquares++;
			}
			//increment total square count
			robotArr[i].totalSquares++;
		}	
	}

	function moveRobots(robotArr, numRobots){
		var i = 0;
		while (i < numRobots) { //iterate through rows
			var j = robotArr[i].j;
			var k = robotArr[i].k;
			var nextj, nextk;
			//use the von neumann neighbourhood
			randOption = Math.floor(Math.random()*4)
			switch (randOption){
				case(0): //north
					nextj = j;
					nextk = k+1;
					break;
				case(1): //east
					nextj = j+1;
					nextk = k;
					break;			
				case(2): //south
					nextj = j;
					nextk = k-1;
					break;
				case(3): //west
					nextj = j-1;
					nextk = k;
					break;
			}
			if(nextj < 0) nextj = gridHeight-1;

			else if(nextk < 0) nextk = gridWidth-1;

			else if(nextj >= gridHeight) nextj = 0;

			else if(nextk >= gridHeight) nextk = 0;
				
			if(theGrid[nextk + nextj*gridWidth].hasRobot == false){
				robotArr[i].j = nextj;
				robotArr[i].k = nextk;
				theGrid[k + j*gridWidth].hasRobot = false;
				theGrid[nextk + nextj*gridWidth].hasRobot = true;
				i++;
			}
		}
	}


	function surveyBotVoting(robotArr, numRobots) {
		for (var i = 0; i < numRobots; i++) { 
			formSurveyOpinion(robotArr[i]);
			findLocalGroup(robotArr[i], numRobots, robotArr);
			}

		//separate loops as need to all form groups and opinions first
		for (var i = 0; i < numRobots; i++) { 
			getLocalOpinion(robotArr[i], numRobots, robotArr);
			vote(robotArr[i]);
		}	
	}

	function formSurveyOpinion(bot) {
		if(bot.byzantine == false){
			if (bot.totalSquares/2 > bot.redSquares) bot.opinion = 'White'
			else  bot.opinion = 'Red';
		}
		else bot.opinion = 'Red';
	}

	function formHarvestOpinion() {

	}

	function findLocalGroup(bot, numRobots, robotArr) {
		//find euclidean distance to other robots
		for (var i=0; i<numRobots; i++){
			botj = bot.j;
			botk = bot.k;
			j = robotArr[i].j;
			k = robotArr[i].k;

			var euclideanDistance = findEuclideanDistance(botj, botk, j, k);

			if(euclideanDistance == 0){
				//same robot, do nothing
			}
			else if(euclideanDistance <= robotRange){
				//in local group
				bot.localGroup.push(i);
			}
			//otherwise, not in local group
		}

		console.log("local group is ", bot.localGroup);
	}

	function findEuclideanDistance(x1, y1, x2, y2) {
		return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
	}

	function getLocalOpinion(bot, numRobots, robotArr) {


		groupSize = bot.localGroup.length;

		if (groupSize == 0 || bot.byzantine == true){
			for (var i=0; i<numLocalOpinions; i++){
				bot.localGroupOpinions[i] = bot.opinion;
			}
		}

		else {
			for (var i=0; i<numLocalOpinions; i++){
				randOpinion = Math.floor(Math.random()*bot.localGroup.length);
				chosenRobot = bot.localGroup[randOpinion];
				bot.localGroupOpinions[i] = robotArr[chosenRobot].opinion;
				console.log("opinion is ", randOpinion, "  ", bot.localGroupOpinions[i]);
			}
		}
	}

	function broadCast(bot) {
		console.log("my opinion is ", bot.opinion)
	}

	function vote(bot) {
		//submit vector of local opinions as votes
		contractInstance.voteForOpinion(bot.opinion, {from: web3Chain1.eth.accounts[0]});
  		var val = web3Chain1.eth.blockNumber;
  		console.log(val);
	}

	function pollLocalSurveyBots() {
		// each harvest bot polls all the survey bots in the local group for the state of the chain
	}

}
window.onload = init;