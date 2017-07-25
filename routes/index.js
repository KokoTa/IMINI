var express = require('express');
var router = express.Router();
var User = require('../model/model').User;
var md5 = require('md5')
var Promise = require('bluebird').Promise

// 首页
router.get('/', function(req, res, next) {
  res.render('index', {
		title: '首页' 
	});
});

// 用户页
router.get('/u/:user', function(req, res, next) {

})

// 发送信息
router.post('/post', function(req, res, next) {
	
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
			User.find({ name: newUser.name }, (err, data) => { // find info
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
	
})
// 登录信息提交
router.post('/login', function(req, res, next) {
	
})

// 登出
router.get('/logout', function(req, res, next) {
	
})


module.exports = router;
