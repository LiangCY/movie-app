var _ = require('underscore');
var User = require('../models/user');

//signup page
exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '注册'
    });
};

//signin page
exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '登录'
    });
};

//signup
exports.signup = function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            return res.redirect('/signin');
        } else {
            var newUser = new User(_user);
            newUser.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/signin');
            });
        }
    });
};

//signin
exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/signup');
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                req.session.user = user;
                return res.redirect('/');
            } else {
                return res.redirect('/signin');
            }
        })
    });

};

//logout
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};

//user info
exports.detail = function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        res.render('userinfo', {
            title: user.name
        });
    });
};

//edit user
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        User.findById(id, function (err, user) {
            if (user) {
                res.render('user_admin', {
                    title: '资料修改 ' + user.name,
                    user: user
                });
            } else {
                res.render('error', {
                    message: '用户不存在'
                });
            }
        });
    }
};

//save user
exports.save = function (req, res) {
    var id = req.body.user._id;
    var userObj = req.body.user;
    var _user;
    if (id !== undefined) {
        User.findById(id, function (err, user) {
            if (err) {
                console.log(err);
            }
            _user = _.extend(user, userObj);
            _user.save(function (err, user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/user/list');
            });
        });
    } else {
        res.redirect('/admin/user/list');
    }
};

//userlist page
exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: '用户列表',
            users: users
        });
    });
};

//delete
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({_id: id}, function (err, user) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        });
    }
};

// midware for user
exports.signinRequired = function (req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }
    next();
};

exports.adminRequired = function (req, res, next) {
    var user = req.session.user;
    if (user.role <= 10) {
        return res.redirect('/signin');
    }
    next();
};