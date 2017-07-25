var express = require('express');
var router = express.Router();
var User = require('../model/model').User
var md5 = require('md5')
var Promise = require('bluebird').Promise
var Post = require('../model/model').Post

// 首页
router.get('/', function(req, res, next) {
	Post.find({})
		.sort({ time: -1 })
		.exec((err, posts) => {
			res.render('index', {
				title: '首页' ,
				posts: posts
			})
		})
});

// 用户页
router.get('/u/:user', function(req, res, next) {
	var uername = req.params.user
	if(req.session.user) {
		Post.find({ author: uername })
			.sort({ time: -1 })
			.exec((err, posts) => {
				res.render('index', {
					title: '用户页' ,
					posts: posts
				})
			})
	} else {
		req.flash('error', '请登录')
		res.redirect('/')
	}
})

// 发送信息
router.post('/post', function(req, res, next) {
	var content = req.body.content
	var author = req.session.user.name
	var newPost = {
		author,
		content,
		time: new Date()
	}
	if(content) {
		req.flash('success', '发表成功')
		var two = new Post(newPost)
		two.save(function(err, that) {
			if(err) return console.log(err)
		})
		res.redirect('/')
	}
})

// 用户注册
router.get('/regin', function(req, res, next) {
	res.render('regin', {
		title: '用户注册'
	})
})
// 注册信息提交
router.post('/regin', function(req, res, next) {
	if(req.body.password !== req.body['password-repeat']) {
		req.flash('error', '两次输入的密码不一致')
		res.redirect('/regin')
	} else {
		var password = md5(req.body.password)
		var newUser = {
			name: req.body.username,
			password: password
		}
		var one = new User(newUser)
		new Promise((resolve, reject) => {
			User.find({ name: newUser.name, password: newUser.password }, (err, data) => { // find info
				if(err) reject()
				resolve(data)
			})
		}) // model->find
		.then(function (doc) {
			if (doc.length) {
				req.flash('error', '用户已注册')
				res.redirect('/regin')
			} else {
				req.flash('success', '注册成功')
				one.save(function(err, that) { // instance->save
					if (err) return console.log(err)
				})
				req.session.user = newUser // save user info
				res.redirect('/')
			}
		})
	}
})

// 用户登录
router.get('/login', function(req, res, next) {
	if(req.session.user) {
		req.flash('error', '您已登录')
		res.redirect('/')
	} else {
		res.render('login', {
			title: '用户登录'
		})
	}
})
// 登录信息提交
router.post('/login', function(req, res, next) {
	var name = req.body.username
	var password = md5(req.body.password)
	User.find({ name: name, password: password}, function(err, data) {
		if(data.length) {
			req.flash('success', '登陆成功')
			req.session.user = {
				name, password
			}
			res.redirect('/')
		} else {
			req.flash('error', '用户名/密码错误')
			res.redirect('/login')
		}
	})
})

// 登出
router.get('/logout', function(req, res, next) {
	req.session.user = null
	req.flash('success', '登出成功')
	res.redirect('/')
})


module.exports = router;
