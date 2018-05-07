import models from '../models';
const embed = require('sequelize-embed')(models.sequelize);


/**
 * A simple create mutation.
 * @param parent
 * @param args
 * @param modelObj
 * @param includedFields
 */
export const genericCreate = (parent, args, modelObj, includedFields) => {
    return modelObj.create({...args},{
        include: includedFields
    }).then((obj) => {
        if (obj) return obj;
    }).catch((err) => {
        // internal server error
        throw(err);
    })
};


/**
 * A simple update mutation.
 * @param parent
 * @param args
 * @param modelObj
 * @param includedFields
 */
export const genericUpdate = (parent, args, modelObj, includedFields,) => {
    return embed.update(modelObj, {...args}, includedFields).then((obj) => {
        if (obj) return obj;
    }).catch((err) => {
        // internal server error
        throw(err);
    })
};


/**
 * A simple delete mutation.
 * @param parent
 * @param args
 * @param modelObj
 */
export const genericDelete = (parent, args, modelObj) => {
    modelObj.destroy({where: {...args}});
};


