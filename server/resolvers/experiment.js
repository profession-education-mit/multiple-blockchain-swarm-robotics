// internal
import {
    genericResolverList,
    genericResolverNestedList,
    genericResolverSingle,
} from '../utils/resolvers';
import {
    genericCreate,
    genericDelete,
    genericUpdate
} from "../utils/mutations";
import models from '../models';
//external
const embed = require('sequelize-embed')(models.sequelize);
const mkInclude = embed.util.helpers.mkInclude;


export default {
    Experiment: {
        swarms: (parent, args, { models } ) => {
            return genericResolverNestedList(parent, args, models.Swarm, 'experimentId');
        },
    },
    Query: {
        experiment: (parent, args, { models }) => {
            return genericResolverSingle(parent, args, models.Experiment);
        },
        experiments: (parent, args, { models }) => {
            return genericResolverList(parent, args, models.Experiment);
        },
    },
    Mutation: {
        createExperiment: (parent, args, { models }) => {
            const includedFields = [{ all: true, nested: true }];
            return genericCreate(parent, args, models.Experiment, includedFields);
        },
        updateExperiment: (parent, args, { models }) => {
            const includedFields = [];
            if (args.swarms !== undefined) {
                includedFields.push(mkInclude(models.Experiment.Swarm,
                    mkInclude(models.Swarm.Robot)));
            }
            return genericUpdate(parent, args, models.Experiment, includedFields);
        },
        deleteExperiment: (parent, args, { models }) => {
            return genericDelete(parent, args, models.Experiment);
        },
    },
};
