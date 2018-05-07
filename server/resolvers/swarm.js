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
    Swarm: {
        robots: (parent, args, { models } ) => {
            return genericResolverNestedList(parent, args, models.Robot, 'swarmId');
        },
    },
    Query: {
        swarm: (parent, args, { models }) => {
            return genericResolverSingle(parent, args, models.Swarm);
        },
        swarms: (parent, args, { models }) => {
            return genericResolverList(parent, args, models.Swarm);
        },
    },
    Mutation: {
        createSwarm: (parent, args, { models }) => {
            const includedFields = [{ all: true, nested: true }];
            return genericCreate(parent, args, models.Swarm, includedFields);
        },
        updateSwarm: (parent, args, { models }) => {
            const includedFields = [];
            if (args.robots !== undefined) {
                includedFields.push(mkInclude(models.Swarm.Robot));
            }
            return genericUpdate(parent, args, models.Swarm, includedFields);
        },
        deleteSwarm: (parent, args, { models }) => {
            return genericDelete(parent, args, models.Swarm);
        },
    },
};
