import Sequelize from 'sequelize';
import path from 'path';
const env = "experiment";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
});

const models = {
    Experiment: sequelize.import('./experiment'),
    Robot: sequelize.import('./robot'),
};

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]){
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
