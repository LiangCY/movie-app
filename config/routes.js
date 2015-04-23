var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');

module.exports = function (app) {
    //pre handle user
    app.use(function (req, res, next) {
        app.locals.user = req.session.user;
        return next();
    });

    //index
    app.get('/', Index.index);

    //movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save);
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);

    //user
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/logout', User.logout);
    app.get('/user/:id', User.detail);
    app.post('/admin/user', User.signinRequired, User.adminRequired, User.save);
    app.get('/admin/user/update/:id', User.signinRequired, User.adminRequired, User.update);
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
    app.delete('/admin/user/list', User.signinRequired, User.adminRequired, User.del);

    //comment
    app.post('/user/comment', User.signinRequired, Comment.save);

    //category
    app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);
    app.get('/admin/category/update/:id', User.signinRequired, User.adminRequired, Category.update);
    app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save);
    app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);
    app.delete('/admin/category/list', User.signinRequired, User.adminRequired, Category.del);

    //results
    app.get('/results', Index.search);
};
