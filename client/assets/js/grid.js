//draws the grid for the robots
function init(){
	//survey bot contract setup
	web3Chain1 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	surveyAbi = JSON.parse('[{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"byzantineCount","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"initialise","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"votingRoundEnded","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bannedRobots","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"consensusReached","outputs":[{"name":"","type":"bool"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"individualVotes","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countVotes","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint64"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"seeBanned","outputs":[{"name":"","type":"uint32[20]"},{"name":"","type":"bool[20]"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"opinion","type":"bytes32"}],"name":"validOpinion","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"opinionList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"opinion","type":"bytes32"},{"name":"sender","type":"uint8"}],"name":"voteForOpinion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"opinionNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"opinion","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"}],"name":"onVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"consensus","type":"bool"},{"indexed":false,"name":"opinion","type":"bytes32"}],"name":"onVotingEnded","type":"event"}]');
	surveyVotingContract = web3Chain1.eth.contract(surveyAbi);
	surveyContractInstance = surveyVotingContract.at('0x01eba7b81207016cf260311245f61e990afb0309');
	surveyOpinions = {"White": "white", "Red": "red"};


	//harvest bot contract setup
	web3Chain2 = new Web3(new Web3.providers.HttpProvider("http://localhost:8555"));
	harvestAbi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bool"}],"name":"votesReceived","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"byzantineCount","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"opinion","type":"bool"},{"name":"sender","type":"uint8"}],"name":"voteForOpinion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initialise","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"votingRoundEnded","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bannedRobots","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"consensusReached","outputs":[{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"opinion","type":"bool"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"individualVotes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countVotes","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint64"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"seeBanned","outputs":[{"name":"","type":"uint32[10]"},{"name":"","type":"bool[10]"},{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"opinionList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"opinionNames","type":"bool[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"opinion","type":"bool"},{"indexed":false,"name":"sender","type":"address"}],"name":"onVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"consensus","type":"bool"},{"indexed":false,"name":"opinion","type":"bool"}],"name":"onVotingEnded","type":"event"}]');	
	harvestVotingContract = web3Chain2.eth.contract(harvestAbi);
	harvestContractInstance = harvestVotingContract.at('0x62e86a13a6eeb724ace9aa1d706708138a5ecdf3');
	harvestOpinions = {true: true, false: false};


	addresses = [
	"0x3dafa6f3839ecc1d24edd3b3364a2c54ec540702",
	"0xd38ffed675e2de46f5cdd8b2c4a4cbbe95101539",
	"0xd69cd4df9ee49eb680e00f7719191c7ee37957bd",
	"0x5c2dbf3c9c7d36c3837f78dd101ede469af5856f",
	"0x33740aadd54616336177f2f14f78f03f05e726b0",
	"0xb7690146dd20690009cefe3c4f093a9944d5693b",
	"0xf6f1d08ee9861d9e44c99a516f37efa417afb31e",
	"0x794a5f13a6723db931bc09cb3477bb0c96a7b6c3",
	"0x5c714163c00a57c5880e63e0d062a48ea71dd4c3",
	"0x06aae0e8e5b6990fc1aa17796f3563420297f656",
	"0xd57c015417a3064b999b9243461f194f33c6fdc7",
	"0x7d62b9c6649165dc261dfd3d0b6306263cadd51b",
	"0xe349b9709318ee81b7f67cc536a37808eaa81612",
	"0xfa8b7a68828ffaa8b229a0e02678696ec4525827",
	"0xac79796776b1b01894a6e4ee1f21b9c75c34bacd",
	"0x96bb4437cbf1832a63fe59251376592af8bc7de5",
	"0xae93c0221af29cb9c38565a083d8e11ad8c333c9",
	"0x034998e80120a23d28434b3972bfb6c59aec85d0",
	"0xbe6181a1ad15b82862d7ec86dbf60939fd821a09",
	"0xdfe531d0cc4632559f81d407a49cfa931c154cb8",
	"0x1fab8f76b8ba762419e0a31d509657959e3e3f1d",
	"0xfbf919220749ae725cbc4b9b3906792d36e3d33a",
	"0x8acac3a22a24be3799a34734d19374e2396aec05",
	"0x711e059c0967b44e1917f51d333956a095559135"
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
	surveyContractInstance.initialise({from: web3Chain1.eth.accounts[0], gas: 300000});
	harvestContractInstance.initialise({from: web3Chain2.eth.accounts[0], gas: 300000});		
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
		    surveyContractInstance.votingRoundEnded({from: web3Chain1.eth.accounts[1],  gas: 500000});
		    byz = surveyContractInstance.seeBanned();
		    console.log(byz);
		    //harvestContractInstance.votingRoundEnded({from: web3Chain2.eth.accounts[0]});   
		    resetRobots(surveyBotArr);
		    resetRobots(harvestBotArr);


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
	            	red: (Math.random()*3 >= 1.8),
	            	hasRobot: false,
	            });
	        }
	    }
	}

	function initialiseRobots(robotArr, numRobots, numByzantine){
		var i = 0;
		robotAddresses = [];
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
			robotAddresses.push(addresses[i]);
			//surveyContractInstance.registerRobots(robotAddresses, {from: web3Chain1.eth.accounts[0]});			
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

		//events
		//getVoteEvents();
		//getEndOfVotingEvents()
	}


	function harvestBotVoting (robotArr, numRobots) {
		for (var i=0; i < numRobots; i++){
			pollLocalSurveyBots(robotArr[i], numRobots);
		}

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
		surveyContractInstance.voteForOpinion(bot.localGroupOpinion, bot.id, {from: web3Chain1.eth.accounts[0]});
  		var val = web3Chain1.eth.blockNumber;
  		console.log(val);
	}

	function harvestVote(bot) {
		//submit vector of local opinions as votes
		harvestContractInstance.voteForOpinion(bot.localGroupOpinion, bot.id, {from: web3Chain2.eth.accounts[0]});
  		var val = web3Chain2.eth.blockNumber;
  		console.log(val);
	}

	function hexToAscii(hexNum) {
	    var hex = hexNum.toString();//force conversion
	    var str = '';
	    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
	        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	    return str;
	}


	function pollLocalSurveyBots(bot, numRobots) {
		findLocalGroup(bot, numRobots, surveyBotArr);
		var result = surveyContractInstance.consensusReached();
		console.log("winning opinion is ", hexToAscii(result[1]));
		console.log("consensusReached is ", result[0]);
		//reset the local group so the bots can go on to vote

		groupSize = bot.localGroup.length;

		//worst case
		if (groupSize == 0 || bot.byzantine == true){
			for (var i=0; i<numLocalOpinions; i++){
				bot.localGroupOpinion = (false, "Red");
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

		bot.localGroup = [];

	}

}
window.onload = init;
