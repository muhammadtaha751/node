const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://muhammad9675581:expertizo123@cluster0.cac0rjt.mongodb.net/olx'

mongoose.connect(mongoURI)

module.exports = mongoose