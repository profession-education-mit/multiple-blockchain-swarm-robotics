export default (sequelize, DataTypes) => {
	const Swarm = sequelize.define('swarm', {
	    /*
	        Model representing a swarm.
	     */
	    chainId: {
	        type: DataTypes.STRING,
            allowNull: false,
        },
        chainDataLocation: {
	        type: DataTypes.STRING,
            allowNull: false,
        },
        // TODO: Bruno: Add other necessary fields here
	},{
		getterMethods: {
    		numberOfRobots() {
    			return this.getDataValue('robots').length;
    		},
  		},
	});

	Swarm.associate = (models) => {
	    Swarm.Robot = Swarm.hasMany(models.Robot, {onDelete: 'cascade'});
    };

	return Swarm;
};
