var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var bodyParser = require('body-parser');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/movie');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('movie site started on port ' + port);

//index page
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'Movie',
            movies: movies
        });
    });
});

//detail page
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '影片详情 ' + movie.title,
            movie: movie
        });
    });
});

//admin page
app.get('/admin/movie', function (req, res) {
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
});

//admin update
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '信息修改',
                movie: movie
            });
        });
    }
});


//admin post movie
app.post('/admin/movie/new', function (req, res) {
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
});

//list page
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'Movie',
            movies: movies
        });
    });
});

//list delete movie
app.delete('/admin/list', function (req, res) {
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
});

