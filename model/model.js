let mongoose = require('mongoose')
let schema = require('../schema/schema')

let User = mongoose.model('User', schema.User)

module.exports = {
	User: User
}