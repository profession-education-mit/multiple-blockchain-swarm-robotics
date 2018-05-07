//controls the movement of the robots

function moveRobots(robotArr, numRobots, theGrid){
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