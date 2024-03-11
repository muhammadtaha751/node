const express = require('express')
const db = require('./config/db')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('./models/User')
const User = mongoose.model('UserInfo')

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


app.use(express.json())

db.connection.once('open', () => {
  console.log('db connected successfully')
}).on("error", (e) => {
  console.log('error: ', e)
})



// signup api

app.post('/register', async (req, res) => {
  const { name, email, password, number } = req.body

  const oldUser = await User.findOne({ email: email })

  if (oldUser) {
    return res.send({ data: "User already exist" })
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  try {
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      number
    });
    res.send({ status: "ok", data: "user created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }

});


app.listen(port, () => {
  console.log("server is running")
})



// Login Api

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body

  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User doesnot exist" })
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET)

    if (res.status(201)) {
      return res.send({ status: "ok", data: token })
    } else {
      return res.send({ error: "error" })
    }
  }
})


// data api

app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, number,picture,web,address,description} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      email,
      number,
      picture,
      web,
      address,
      description
    }, { new: true }); // Return the updated user after update

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
