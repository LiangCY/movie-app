var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');

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
    app.get('/admin/movie', Movie.new);
    app.get('/admin/update/:id', Movie.update);
    app.post('/admin/movie/new', Movie.save);
    app.get('/admin/list', Movie.list);
    app.delete('/admin/list', Movie.del);

    //user
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/logout', User.logout);
    app.get('/admin/userlist', User.list);
};
