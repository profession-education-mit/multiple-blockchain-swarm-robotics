import {generateSequelizeListQuery} from "./queries";


/**
 * Simple resolver for single obj fields.
 * @param parent
 * @param args
 * @param modelObj
 * @returns {Promise<Model>}
 */
export const genericResolverSingle = (parent, args, modelObj) => {
    return modelObj.findOne({
        where: {...args}
    }).then((obj) => {
        if (obj) return obj;
    }).catch((err) => {
        // internal server error
        throw(err);
    });
};

/**
 * Simple resolver for listed obj fields.
 * @param parent
 * @param args
 * @param modelObj
 * @returns {Promise<Array<Model>>}
 */
export const genericResolverList = (parent, args, modelObj) => {
    return modelObj.findAll(generateSequelizeListQuery(args))
};


/**
 * Simple resolver for nested single obj fields.
 * Adds the parent's id to the where argument of a single query.
 * @param parent
 * @param args
 * @param modelObj
 * @param modelIdField
 * @param parentIdField
 * @returns {Promise<Model>}
 */
export const genericResolverNestedSingle = (parent, args, modelObj, modelIdField, parentIdField) => {
    return modelObj.findOne({
        where : {
            [modelIdField]: parent.dataValues[parentIdField]
        }
    });
};


/**
 * Adds the parent's id to the where argument of a list query.
 * @param parent
 * @param args
 * @param modelObj
 * @param idField
 * @returns {Promise<Array<Model>>}
 */
export const genericResolverNestedList = (parent, args, modelObj, idField) => {
    if (args.where !== undefined) {
        args.where[idField] = parent.dataValues.id;
    } else {
        args.where = {[idField]: parent.dataValues.id};
    }
    return modelObj.findAll(generateSequelizeListQuery(args));
};
