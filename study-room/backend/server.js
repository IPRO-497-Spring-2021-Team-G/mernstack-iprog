const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const tablesRouter = require('./routes/tables');
const usersRouter = require('./routes/users');
const adminRouter = require("./routes/admins");
require('dotenv').config();

const app = express();

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
) // Adding new Mongo URL parser
.then(() => console.log('MongoDB connected ...'))
.catch(err => console.log(err));

// Use Routes: anything that goes into /api/items should refer to items var
app.use('/api/admins', require('./routes/api/admins'));
app.use('/api/auth', require('./routes/api/auth'));

app.use('/tables', tablesRouter);
app.use('/users', usersRouter);
app.use("/admins", adminRouter);

// Serve static assets if in production and not hitting api/items
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    // Use node.js path module to load index.html file
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}

// Set up potential connection to Heroku: PaaS platform
const port =  process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));