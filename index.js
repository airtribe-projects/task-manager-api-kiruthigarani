const express = require('express');
require('dotenv').config();


// Importing Routes
const taskManagerRoutes = require('./routes/task_manager_routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(taskManagerRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});