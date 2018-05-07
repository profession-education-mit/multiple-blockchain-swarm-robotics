//draws the grid for the robots

function init(){
    //constants
	var gridHeight = 16;
	var gridWidth = 16;
	var theGrid = [];
	var blockSize = 50;
	var numSurveyBots = 20;
	var numHarvestBots = 10;

	var surveyBotArr = [];
	var harvestBotArr = [];
	var surveySymbol = 'x';
	var harvestSymbol = 'o';	

	//handles the canvas
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	fillRandom(); //create the starting state for the grid by filling it with random cells
	drawGrid();
	initialiseRobots(surveyBotArr, numSurveyBots);
	initialiseRobots(harvestBotArr, numHarvestBots);	
	tick(); //call main loop

	//functions
	function tick() { //main loop
	    var tickTime = 3000; // pause between iterations
	    drawGrid();
	   	drawRobots(surveyBotArr, surveySymbol);
	   	drawRobots(harvestBotArr, harvestSymbol);
	    moveRobots(surveyBotArr, numSurveyBots);
	    moveRobots(harvestBotArr, numHarvestBots);

	    //every timestep, clears the canvas
	    setTimeout(function() {clearGrid(tick)}, tickTime);
	}

	function clearGrid() {
		ctx.clearRect(0, 0, 0.5 + gridHeight*blockSize, 0.5 + gridWidth*blockSize);
		tick();
	}

	function fillRandom() { //fill the grid randomly
	    for (var j = 0; j < gridHeight; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth; k++) { //iterate through columns
	            theGrid.push({
	            	red: Math.round(Math.random()),
	            	hasRobot: false,
	            });
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

	function initialiseRobots(robotArr, numRobots){
		for (var i = 0; i < numRobots; i++) { //iterate through rows
			var j = Math.round(Math.random()*(gridHeight -1));
			var k = Math.round(Math.random()*(gridHeight -1));
			if(theGrid[k + j*gridWidth].hasRobot == false){
				robotArr.push({
					j: j,
					k: k,
					byzantine: false
				});
				theGrid[k + j*gridWidth].hasRobot = true;
			}
			else i--;	
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


	function drawRobots(robotArr, symbol){
		// for i = 0:numrobots
		// place a robot on a random square
		for (var i = 0; i < robotArr.length; i++){
	        ctx.font = "bold 40px Arial";
	        ctx.fillStyle = "black";
            ctx.fillText(symbol, (robotArr[i].j)*blockSize + 15, (robotArr[i].k)*blockSize + 38);
        	}
	    }

}
window.onload = init;