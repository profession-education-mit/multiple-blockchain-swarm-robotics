// external
import express from 'express';
var childProcess = require('child_process');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
// app
import models from './models';

const GRAPHQL_PORT = 9000;
const GRAPHQL_ENDPOINT = '/graphql';
// import types from schema directory
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
// import resolvers from resolvers directory
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

app.use(cors('*'));

app.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
        schema,
        context: {
            models,
            req
        }
    }))
);

app.use('/graphiql', graphiqlExpress({ endpointURL: GRAPHQL_ENDPOINT }));

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./server/geth_processes/creategeths.js', function (err) {
    if (err) throw err;
    console.log('finished running some-script.js');
});


// force: true drops your database every time you start the server
// logging: true allows you to see all the database logging
models.sequelize.sync({force: true, logging: false}).then(() => {
    app.listen(GRAPHQL_PORT, () => console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_ENDPOINT}`
    ));
});
