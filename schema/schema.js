let mongoose = require('mongoose')

let User = mongoose.Schema({
	name: String,
	password: String
})

let Post = mongoose.Schema({
	author: String,
	content: String,
	time: Date
})

module.exports = {
	User,
	Post
}