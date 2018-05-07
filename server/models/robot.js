// internal

export default (sequelize, DataTypes) => {
	const Robot = sequelize.define('robot', {
	    /*
	        Model representing a robot in a swarm.
	     */
	    jValue: {
	    	type: DataTypes.INT,
	    	allowNull: false,
	    },
	    kValue: {
	    	type: DataTypes.INT,
	    	allowNull: false,
	    },	    
        byzantine: {
	        type: DataTypes.BOOLEAN,
        },
	    nodeId: {
	        type: DataTypes.STRING,
            allowNull: false,
        },
        opinion: {
        	type: DataTypes.INT,
        },
        //universal: e.g. for the survey bots will be counting 
        //reds, the harvestbots count consensus
        countX: {
        	type: DataTypes.INT,
        },
        countAll: {
        	type: DataTypes.INT,
        },
        localGroup: {
        	type: DataTypes.ARRAY(DataTypes.STRING),
        },
        localGroupOpinions: {
        	type: DataTypes.ARRAY(DataTypes.INT),
        },
        // TODO: Bruno: Add other necessary fields here
	});

	return Robot;
};
