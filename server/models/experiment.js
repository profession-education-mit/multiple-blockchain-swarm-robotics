// internal
import {BOARD_DIMENSION, EMPTY} from '../utils/constants';


export default (sequelize, DataTypes) => {
	const Experiment = sequelize.define('experiment', {
	    /*
	        Model representing a swarm.
	     */
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
            //add in colour property here? not sure how. maybe set in the interface?
            defaultValue: new Array(BOARD_DIMENSION*BOARD_DIMENSION).fill(EMPTY),
        },

        // TODO: Bruno: Add other necessary fields here/fix the board model to actually work
	});

	Experiment.associate = (models) => {
	    Experiment.Swarm = Experiment.hasMany(models.Robot, {onDelete: 'cascade'});
    };

	return Experiment;
};
