const express = require('express')
const router = express.Router()
const Users = require('../model/Users')
const verifyToken = require('../middleware/verifyToken')


router.get('/', verifyToken, async (req, res) => {
  const users = await Users.find()

  res.send({
    message: 'All users',
    data: users
  })
})

//fetch('https://localhost:4000/users/register')
router.post('/register', async (req, res) => {
  try {
    const credentials = req.body
    const user = new Users(credentials)
    await user.save()
  
    res.send({
      message: 'User Registered Successfully!'
    })
  } catch (e) {
    res.send({
      message: e
    })
  }
})

router.post('/login', async (req, res) => {
  //Step 1: Check if email exists in database
  const { email, password } = req.body

  const user = await Users.findOne({ email })

  if (!user) {
    res.send({
      message: "User doesn't exist"
    })
    return
  }
  console.log('user', user)

  //Step 2: Compare passwords

  const isPasswordCorrect = user.comparePassword(password)

  if (!isPasswordCorrect) {
    res.send({
      message: "Invalid Password"
    })
    return
  }

  //Step 3: Generate Token!
  //JWT:
  const token = user.generateToken()
  user.token = token
  await user.save() //1234

  res.send({
    message: 'Logged in successfully',
    token
  })
})