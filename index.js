const express = require('express')
const db = require('./config/db')
const cors = require('cors')
const app = express()

app.use(cors())

app.listen(process.env.port || 4000, function () {
  console.log('Listening to 4000')
})

db.connection.once('open', () => {
  console.log('db connected successfully')
}).on("error", (e) => {
  console.log('error: ', e)
})

app.use(express.json());

app.use('/', require('./routes/index'))

