const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Routes/formPage');
const sequelize = require('./Models/User');

app.use(cors());
app.use(express.json());

app.use('/', router);

// Serve task12.html from the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/task12.html');
});

sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
}).catch(err => console.log(err));