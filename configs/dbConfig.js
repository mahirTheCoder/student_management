const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed");
    });
};

// PORT = 8000
// BASE_URL=/api/v1
// DB_URL=mongodb+srv://management:LCjhehBpkzyuCifi@cluster0.mjewgzf.mongodb.net/hazira?appName=Cluster0

module.exports = dbConfig;
