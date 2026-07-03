require('dotenv').config()
const express = require ('express')
const router = require ('./routes')
const dbConfig = require('./configs/dbConfig')
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(router)
dbConfig()
console.log(process.env.BASE_URL);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});