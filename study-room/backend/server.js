const express = require('express');
const cors = require('cors');
const passport = require("passport");
const mongoose = require('mongoose');
const tablesRouter = require('./routes/tables');
const usersRouter = require('./routes/users');
const adminRouter = require("./routes/admins");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true ,useNewUrlParser: true , useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(passport.initialize());
require("./config/passport")(passport);

app.use('/tables', tablesRouter);
app.use('/users', usersRouter);
app.use("/admins", adminRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 