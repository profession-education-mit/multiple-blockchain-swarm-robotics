import {PERCENT_BYZANTINE} from '../utils/constants';
import {ROBOT_CATEGORY_ENUM} from '../utils/enums';

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
        category: {
			type: DataTypes.ENUM,
			values: ROBOT_CATEGORY_ENUM,
            allowNull: false,
		},
        numByzantine: {
	        type: DataTypes.INTEGER,
            defaultValue: PERCENT_BYZANTINE,
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
