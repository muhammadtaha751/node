const mongoose = require('mongoose')
const uri = "mongodb+srv://muhammad9675581:admin@cluster0.je6uxyp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
module.exports = mongoose