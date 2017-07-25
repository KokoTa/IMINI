let mongoose = require('mongoose')

let User = mongoose.Schema({
		name: String,
		password: String
	})

module.exports = {
	User: User
}