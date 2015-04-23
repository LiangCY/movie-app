var Movie = require('../models/movie');
var Category = require('../models/category');

//index page
exports.index = function (req, res) {
    Category.find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function (err, categories) {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: '首页',
                categories: categories
            });
        });
};

//search
exports.search = function (req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p) || 1;
    var q = req.query.q;
    var count = 3;
    var index = (page - 1) * count;

    if (catId) {
        Category.findOne({_id: catId}).populate({
            path: 'movies',
            select: 'title poster'
        }).exec(function (err, category) {
            if (err) {
                console.log(err);
            }
            var movies = category.movies;
            var results = movies.slice(index, index + count);
            res.render('results', {
                title: "结果列表",
                keyword: category.name,
                currentPage: page,
                totalPage: Math.ceil(movies.length / count),
                movies: results,
                query: 'cat=' + catId
            });
        });
    } else {
        Movie.find({title: new RegExp(q + '.*', 'i')})
            .exec(function (err, movies) {
                if (err) {
                    console.log(err);
                }
                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: "结果列表",
                    keyword: q,
                    currentPage: page,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results,
                    query: 'q=' + q
                });
            });
    }
};

