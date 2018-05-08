// internal

export default (sequelize, DataTypes) => {
	const Robot = sequelize.define('robot', {
	    /*
	        Model representing a robot in a swarm.
	     */
	    jValue: {
	    	type: DataTypes.INTEGER,
	    	allowNull: false,
	    },
	    kValue: {
	    	type: DataTypes.INTEGER,
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
        	type: DataTypes.INTEGER,
        },
        //universal: e.g. for the survey bots will be counting 
        //reds, the harvestbots count consensus
        countX: {
        	type: DataTypes.INTEGER,
        },
        countAll: {
        	type: DataTypes.INTEGER,
        },
        localGroup: {
        	type: DataTypes.ARRAY(DataTypes.STRING),
        },
        localGroupOpinions: {
        	type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        // TODO: Bruno: Add other necessary fields here
	});

	return Robot;
};
