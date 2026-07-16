require('dotenv').config()
const express = require ('express')
const router = require ('./routes')
const dbConfig = require('./configs/dbConfig')
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(router)
dbConfig()


// // -----when db congfig not working then use this code t
// // const dns = require('dns');
// // dns.setServers(['8.8.8.8', '8.8.4.4'])


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});