import {
    GraphQLScalarType,
    Kind
} from 'graphql';


/**
 * Parses a string literal into JSON format
 * Source: https://github.com/taion/graphql-type-json
 * @param ast
 * @returns {*}
 */
function parseLiteral(ast) {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
            return parseFloat(ast.value);
        case Kind.OBJECT: {
            const value = Object.create(null);
            ast.fields.forEach((field) => {
                value[field.name.value] = parseLiteral(field.value);
            });
            return value;
        }
        case Kind.LIST:
            return ast.values.map(parseLiteral);
        default:
        return null;
    }
}

export default {
    JSON: new GraphQLScalarType({
        name: 'JSON',
        description: 'The `JSON` scalar type represents JSON values as specified by \' + \'' +
        '[ECMA-404](http://www.ecma-international.org/\' + \'publications/files/ECMA-ST/ECMA-404.pdf).',
        serialize(value) {
            return value;
        },
        parseValue(value) {
            return value;
        },
        parseLiteral(ast) {
            return parseLiteral(ast);
        }
    }),
}
