# Blockchain swarm robotics frontend

The frontend code is run as a webApp in the browser. The script talks to both a backend server that stores data for processing, and communicates with blockchain processes through the web3 API. Each robot acts as a peer in a blockchain network.

## Initialisation

### web3
Need to initialise web3 to talk to the contracts. Use the instructions in the smart contracts folder to set up the `contractInstance` and the addresses.

### grid setup
`gridHeight` and `gridWidth` setup the dimensions of the simulation. `theGrid` is an array of these dimensions that contains the state of the grid (the colour of the squares, whether a robot is at a location). 

`initialiseGrid()` sets up `theGrid`, assigning colours to each square.


### robot setup
This script sets up 2 separate robot swarms, both using the function `initialiseRobots()`. Each swarm is stored in a separate array (`surveyBotArr`, and `harvestBotArr`).


## Rendering (html canvas)
The two rendering functions are `drawGrid()` and `drawRobots()` 


## Movement
The surveyBots move once every steps, and the harvestBots move once every 10 steps. With each of these movements, the robot manouvers randomly through the Von Neumann neighbourhood (NEWS), moving one step per movement event. 

Each swarm is moved using the function `moveRobots`, which randomly selects the robot path 
The robot can only move to an empty square: 


## Voting

### survey bots
Voting is run once every 10 movement cycles by the functions `surveyBotVoting` and `harvestBotVoting`. `surveyBotVoting` is the voting method for the survey bots, and vice versa.

In order to vote, the robots need to 


### web3