const jwt = require('jsonwebtoken')
const secret = require('../config/jwt')

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.slice(7)
    jwt.verify(token, secret)
    console.log('verify hogyaa')

    next()
  } catch (e) {
    res.send({
      message: 'You need to login in order to use this API'
    })
  }
}

module.exports = verifyToken