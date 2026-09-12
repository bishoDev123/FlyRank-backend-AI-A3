console.log('####### SERVER BUILD MARKER 12345 #######');

const { seedIfEmpty } = require('./src/db/connection');
const taskService = require('./src/services/tasks.service');
 
const seedCount = seedIfEmpty();

const { createApp } = require('./src/app');

const app = createApp();
const port = 3000;

console.log(seedCount);
 
app.listen(port, () => {
  console.log(`CRUD API listening on port ${port}`);
});

module.exports = taskService;