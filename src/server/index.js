const restify = require('restify');
const server = restify.createServer({
    name: 'my-rest-api',
    version: '1.0.0'
});
const cors = require('./cors');

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

module.exports = server;
