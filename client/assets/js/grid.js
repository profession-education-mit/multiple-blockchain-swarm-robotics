//draws the grid for the robots
function init(){
	//survey bot contract setup
	web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	surveyAbi = JSON.parse('[{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"votingRoundEnded","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"opinion","type":"bytes32"},{"name":"sender","type":"address"}],"name":"voteForOpinion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"consensusReached","outputs":[{"name":"","type":"bool"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countVotes","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"validOpinion","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"opinionList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"opinionNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"opinion","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"}],"name":"onVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"consensus","type":"bool"},{"indexed":false,"name":"opinion","type":"bytes32"}],"name":"onVotingEnded","type":"event"}]');
	surveyVotingContract = web3Chain1.eth.contract(surveyAbi);
	surveyContractInstance = surveyVotingContract.at('0x71ed0d5211498432d68b62881ac927dd83a476ac');
	surveyOpinions = {"White": "white", "Red": "red"};


	//harvest bot contract setup
	web3Chain2 = new Web3(new Web3.providers.HttpProvider("http://localhost:8555"));
	harvestAbi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bool"}],"name":"votesReceived","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"opinion","type":"bool"}],"name":"voteForOpinion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"opinion","type":"bool"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"opinionList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"opinionNames","type":"bool[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"opinion","type":"bool"},{"indexed":false,"name":"sender","type":"address"}],"name":"onVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"consensus","type":"bool"},{"indexed":false,"name":"opinion","type":"bool"}],"name":"onVotingEnded","type":"event"}]');
	harvestVotingContract = web3Chain2.eth.contract(harvestAbi);
	harvestContractInstance = harvestVotingContract.at('0xe7c312f8746535a87e0530ff34de8898330f5ae3');
	harvestOpinions = {true: true, false: false};


	addresses = [
	"0x5521a68d4f8253fc44bfb1490249369b3e299a4a",
	"0xc257274276a4e539741ca11b590b9447b26a8051",
	"0xf4b9ed39dd183504252ee5995c58dac8197fa12d",
	"0x7205b1bb42edce6e0ced37d1fd0a9d684f5a860f",
	"0x98a2559a814c300b274325c92df1682ae0d344e3",
	"0x2d7a7d0adf9c5f9073fefbdc18188bd23c68b633",
	"0xd4bb3284201db8b03c06d8a3057dd32538e3dfda",
	"0xa6396904b08aa31300ca54278b8e066ecc38e4a0",
	"0xb60e8dd61c5d32be8058bb8eb970870f07233155",
	"0xd46e8dd67c5d32be8058bb8eb970870f07244567",
	"0x98a2559a814c300b274325c92df1682ae0d344e3",
	"0x2d7a7d0adf9c5f9073fefbdc18188bd23c68b633",
	"0xd4bb3284201db8b03c06d8a3057dd32538e3dfda",
	"0x5521a68d4f8253fc44bfb1490249369b3e299a4a",
	"0xc257274276a4e539741ca11b590b9447b26a8051",
	"0xf4b9ed39dd183504252ee5995c58dac8197fa12d",
	"0x7205b1bb42edce6e0ced37d1fd0a9d684f5a860f",
	"0x98a2559a814c300b274325c92df1682ae0d344e3",
	"0x2d7a7d0adf9c5f9073fefbdc18188bd23c68b633",
	"0xd4bb3284201db8b03c06d8a3057dd32538e3dfda",
	"0xa6396904b08aa31300ca54278b8e066ecc38e4a0",
	"0xb60e8dd61c5d32be8058bb8eb970870f07233155",
	"0xd46e8dd67c5d32be8058bb8eb970870f07244567",
	"0x98a2559a814c300b274325c92df1682ae0d344e3",
	"0x2d7a7d0adf9c5f9073fefbdc18188bd23c68b633",
	"0xd4bb3284201db8b03c06d8a3057dd32538e3dfda"	
	];

    //constants
	var gridHeight = 16;
	var gridWidth = 16;
	var theGrid = [];
	var blockSize = 50;
	var numSurveyBots = 20;
	var numSurveyByzantine = 5;
	var numHarvestByzantine = 1;
	var numHarvestBots = 10;
	var stepsToCount = 10;
	var robotRange = 6;
	var numLocalOpinions = 5;

	var dirtImage = new Image();
    dirtImage.src = 'assets/images/dirt.png';

    var greenImage = new Image();
    greenImage.src = 'assets/images/green.png';

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
		    harvestBotVoting(harvestBotArr, numHarvestBots);		    
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
	            	red: (Math.random()*3 >= 2),
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
					address: addresses[i],
					opinion: 0,
					redSquares:0,
					totalSquares:0,
					localGroup: [],
					localGroupOpinion: []
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
	                ctx.drawImage(greenImage, 0.5 + j*blockSize, 0.5 + k*blockSize, blockSize, blockSize);
	            }

                else {
                    ctx.drawImage(dirtImage, 0.5 + j*blockSize, 0.5 + k*blockSize, blockSize, blockSize);
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

	function getVoteEvents(){
		var event = surveyContractInstance.onVote(function(error, result) {
    		if (!error) console.log("event is ", result);
    		else console.log(error);
		});
	}


	function getEndOfVotingEvents(){
		var event = surveyContractInstance.onVotingEnded(function(error, result) {
    		if (!error) console.log("event is ", result);
    		else console.log(error);
		});
	}	

	function getLatestSurveyBlock(){
		surveyBlock = web3Chain1.eth.getBlock(web3Chain1.eth.blockNumber);
		console.log(surveyBlock);
		votesForRed = surveyContractInstance.totalVotesFor("Red", {from: web3Chain1.eth.accounts[0]});
		votesForWhite = surveyContractInstance.totalVotesFor("White", {from: web3Chain1.eth.accounts[0]});
		console.log(votesForRed, votesForWhite);
	}

	function surveyBotVoting(robotArr, numRobots) {
		for (var i = 0; i < numRobots; i++) {
			formSurveyOpinion(robotArr[i]);
			findLocalGroup(robotArr[i], numRobots, robotArr);
			}

		//separate loops as need to all form groups and opinions first
		for (var i = 0; i < numRobots; i++) {
			getLocalOpinion(robotArr[i], numRobots, robotArr);
			surveyVote(robotArr[i]);
		}
		getLatestSurveyBlock();
		surveyContractInstance.votingRoundEnded({from: web3Chain1.eth.accounts[0]});
		getVoteEvents();
		getEndOfVotingEvents()
		// //test to see if it can find old votes:
		// votesForWhite = pastsurveyContractInstance.totalVotesFor("White", {from: web3Chain1.eth.accounts[0]});
		// console.log("old votes for white are:", votesForWhite);
	}


	function harvestBotVoting (robotArr, numRobots) {
		for (var i=0; i < numRobots; i++){
			formHarvestOpinion(robotArr[i]);
			harvestVote(robotArr[i]);
		}
	}


	function formSurveyOpinion(bot) {
		if(bot.byzantine == false){
			if (bot.totalSquares/2 > bot.redSquares) bot.opinion = 'White';
			else  bot.opinion = 'Red';
		}
		else bot.opinion = 'Red';
	}

	function formHarvestOpinion(bot) {
		if(Math.random() > 0.5) bot.localGroupOpinion = "No consensus";
		else bot.localGroupOpinion = "No consensus";
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
				bot.localGroupOpinion = bot.opinion;
			}
		}

		else {
			var numRed=0;
			for (var i=0; i<groupSize; i++){
				if (bot.localGroup[i].opinion == 'Red') numRed++;
			}
			if((numRed)/i > 0.5) bot.localGroupOpinion = 'Red';
			else  bot.localGroupOpinion = 'White';
		}
	}

	function broadCast(bot) {
		console.log("my opinion is ", bot.opinion)
	}

	function surveyVote(bot) {
		//submit vector of local opinions as votes
		surveyContractInstance.voteForOpinion(bot.localGroupOpinion, bot.address, {from: web3Chain1.eth.accounts[0]});
  		var val = web3Chain1.eth.blockNumber;
  		console.log(val);
	}

	function harvestVote(bot) {
		//submit vector of local opinions as votes
		harvestContractInstance.voteForOpinion(bot.localGroupOpinion, {from: web3Chain2.eth.accounts[0]});
  		var val = web3Chain2.eth.blockNumber;
  		console.log(val);
	}


	function pollLocalSurveyBots() {
		// each harvest bot polls all the survey bots in the local group for the state of the chain
	}

}
window.onload = init;
