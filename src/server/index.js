const server = require('mokker');

const { MOCK_PORT: defaultPort } = require('../../gulp/config');

const routes = require('./routes');

server.start({
  routes,
  defaultPort,
});
