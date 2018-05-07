/**
 * Replace a key deeply in an object
 * @param obj
 * @param keyMap
 * @returns {Object}
 */
function replaceKeyDeep(obj, keyMap) {
    return Object.keys(obj).reduce((memo, key) => {

        // determine which key we are going to use
        let targetKey = keyMap[key] ? keyMap[key] : key;

        // assign the new value
        memo[targetKey] = obj[key];

        // recurse if an array
        if (Array.isArray(memo[targetKey])) {
            memo[targetKey].forEach((val, ind) => {
                if (Object.prototype.toString.call(val) === '[object Object]') {
                    memo[targetKey][ind] = replaceKeyDeep(val, keyMap);
                }
            });
        } else if (Object.prototype.toString.call(memo[targetKey]) === '[object Object]') {
            // recurse if Object
            memo[targetKey] = replaceKeyDeep(memo[targetKey], keyMap);
        }

        // return the modified object
        return memo;
    }, {});
}


/**
 * Replace the where arguments object and return the Sequelize compatible version
 * Source: http://docs.sequelizejs.com/en/latest/docs/querying/
 * @param where arguments object in GraphQL Safe format
 * @returns {Object}
 */
export function replaceWhereOperators(where) {
    return replaceKeyDeep(where, {
        and: '$and',
        or: '$or',
        gt: '$gt',
        gte: '$gte',
        lt: '$lt',
        lte: '$lte',
        ne: '$ne',
        eq: '$eq',
        not: '$not',
        between: '$between',
        notBetween: '$notBetween',
        in: '$in',
        notIn: '$notIn',
        like: '$like',
        notLike: '$notLike',
        iLike: '$iLike',
        notILike: '$notILike',
        regexp: '$regexp',
        notRegexp: '$notRegexp',
        iRegexp: '$iRegexp',
        notIRegexp: '$notIRegexp',
    });
}
