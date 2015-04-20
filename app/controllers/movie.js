var _ = require('underscore');
var Movie = require('../models/movie');

//detail
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '影片详情 ' + movie.title,
            movie: movie
        });
    });
};

//admin new
exports.new = function (req, res) {
    res.render('admin', {
        title: '后台管理',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
};

//admin update
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '信息修改',
                movie: movie
            });
        });
    }
};


//admin save movie
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            title: movieObj.title,
            director: movieObj.director,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            language: movieObj.language,
            flash: movieObj.flash,
            summary: movieObj.summary
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id);
        });
    }
};

//movie list
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '影片列表',
            movies: movies
        });
    });
};

//delete
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
};