const mongoose = require('mongoose');

const connectDB = (url) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        console.log('Connected to database successfully!');
        resolve();
      })
      .catch((error) => {
        console.error('Error connecting to database:', error);
        reject(error);
      });
  });
};

module.exports = connectDB;