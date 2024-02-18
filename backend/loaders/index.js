const ExpressServer = require("./server/expressServer");
const config = require("../config");
const logger = require("./logger");

module.exports = async () => {
  const server = new ExpressServer();
  logger.info("Challenge Natural Tech House Backend API loaded!");

  server.start();
  logger.info(`#######################################
          Server listening on port: ${config.port}
      #######################################
  `);
};