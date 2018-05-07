// internal
import {BOARD_DIMENSION, EMPTY, PERCENT_BYZANTINE} from '../utils/constants';


export default (sequelize, DataTypes) => {
	const Experiment = sequelize.define('experiment', {
	    /*
	        Model representing a swarm.
	     */
        percentByzantine: {
	        type: DataTypes.INTEGER,
            defaultValue: PERCENT_BYZANTINE,
            allowNull: false,
        },
	    startTime: {
	        type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
	        type: DataTypes.DATE,
        },
        boardDimension: {
	        type: DataTypes.INTEGER,
            defaultValue: BOARD_DIMENSION,
        },
        board: { // TODO: Bruno: come up with a better board abstraction
	        // 0 if no robot is located there, otherwise
	        type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: new Array(BOARD_DIMENSION*BOARD_DIMENSION).fill(EMPTY),
        },

        // TODO: Bruno: Add other necessary fields here/fix the board model to actually work
	});

	Experiment.associate = (models) => {
	    Experiment.Swarm = Experiment.hasMany(models.Robot, {onDelete: 'cascade'});
    };

	return Experiment;
};
