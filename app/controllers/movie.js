var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');

//movie detail
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findOne({_id: id})
        .populate('category', 'name')
        .exec(function (err, movie) {
            Comment.find({movie: id})
                .populate('from', 'name')
                .populate('reply.from reply.to', 'name')
                .exec(function (err, comments) {
                    res.render('detail', {
                        title: '影片详情 ' + movie.title,
                        movie: movie,
                        comments: comments
                    });
                });
        });
};

//new movie
exports.new = function (req, res) {
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: '后台管理',
            categories: categories,
            movie: {}
        });
    });

};

//update movie
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, categorie) {
                res.render('admin', {
                    title: '信息修改',
                    categories: categorie,
                    movie: movie
                });
            });
        });
    }
};


//admin save movie
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (req.poster) {
        movieObj.poster = req.poster;
    }
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            Category.findById(movie.category, function (err, category) {
                if (err) {
                    console.log(err);
                }
                var i = 0, index;
                for (; i < category.movies.length; i++) {
                    if (category.movies[i].toString() == movie._id.toString()) {
                        index = i;
                        break;
                    }
                }
                category.movies.splice(index, 1);
                category.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                });
            });
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                Category.findById(movie.category, function (err, category) {
                    if (err) {
                        console.log(err)
                    }
                    category.movies.unshift(movie._id);
                    category.save(function (err) {
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/movie/' + movie._id);
                    });
                });
            });
        });
    } else {
        _movie = new Movie(movieObj);
        _movie.save(function (err, movie) {
            Category.findById(movie.category, function (err, category) {
                if (err) {
                    console.log(err)
                }
                category.movies.unshift(movie._id);
                category.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                    res.redirect('/movie/' + movie._id);
                });
            });
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
        Movie.remove({_id: id}, function (err) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        });
    }
};

//poster middleware
exports.savePoster = function (req, res, next) {
    var posterFile = req.files.uploadPoster;

    if (posterFile) {
        req.poster = posterFile.name;
        next();
    } else {
        next();
    }
};