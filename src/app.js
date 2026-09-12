const express = require('express');
const swaggerUi = require('swagger-ui-express');

const {swaggerDocs} = require('./util/swagger');

// const metaRoutes = require('./routes/meta.routes');
const tasksRoutes = require('./routes/tasks.routes');
const { errorHandler } = require('./middleware/error-handler');

function createApp() {
  const app = express();

  app.use(express.json());

  
  app.use('/', tasksRoutes);
  
  app.use(errorHandler);
  
  swaggerDocs(app);

  return app;
}

module.exports = { createApp };