const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI; 

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err);
  });

const db = mongoose.connection; 

module.exports = db;