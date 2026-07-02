const express = require ('express')
const router = require ('./routes')
const dbConfig = require('./configs/dbConfig')
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(router)
dbConfig()


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});