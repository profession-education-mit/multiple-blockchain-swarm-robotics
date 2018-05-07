// internal
import {ROBOT_CATEGORY_ENUM} from '../utils/enums';


export default (sequelize, DataTypes) => {
	const Robot = sequelize.define('robot', {
	    /*
	        Model representing a robot in a swarm.
	     */
	    category: {
			type: DataTypes.ENUM,
			values: ROBOT_CATEGORY_ENUM,
            allowNull: false,
		},
        byzantine: {
	        type: DataTypes.BOOLEAN,
        },
	    nodeId: {
	        type: DataTypes.STRING,
            allowNull: false,
        },
        // TODO: Bruno: Add other necessary fields here
	});

	return Robot;
};
