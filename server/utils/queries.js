import {replaceWhereOperators} from "./where";

/**
 * Intake a generic graphql params query and return a Sequelize compatible query.
 * @param args
 * @returns {{take: Int, skip: Int, where: Object, order: Object}}
 */
export const generateSequelizeListQuery = (args) => {
    return (args !== undefined) ? {
        limit: args.take,
        offset: args.skip,
        where: (args.where !== undefined) ? replaceWhereOperators(args.where) : {},
        order: args.order,
    } : {};
};

