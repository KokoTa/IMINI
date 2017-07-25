let mongoose = require('mongoose')
let schema = require('../schema/schema')

let User = mongoose.model('User', schema.User)

let Post = mongoose.model('Post', schema.Post)

module.exports = {
	User,
	Post
}