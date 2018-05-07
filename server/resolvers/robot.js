// internal
import {
    genericResolverList,
    genericResolverSingle,
} from '../utils/resolvers';
import {
    genericCreate,
    genericDelete,
    genericUpdate
} from "../utils/mutations";


export default {
    Query: {
        robot: (parent, args, { models }) => {
            return genericResolverSingle(parent, args, models.Robot);
        },
        robots: (parent, args, { models }) => {
            return genericResolverList(parent, args, models.Robot);
        },
    },
    Mutation: {
        createRobot: (parent, args, { models }) => {
            return genericCreate(parent, args, models.Robot, []);
        },
        updateRobot: (parent, args, { models }) => {
            return genericUpdate(parent, args, models.Robot, []);
        },
        deleteRobot: (parent, args, { models }) => {
            return genericDelete(parent, args, models.Robot);
        },
    },
};
