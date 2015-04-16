var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('movie site started on port ' + port);

//index page
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Movie',
        movies: [{
            title: '速度与激情7',
            _id: 1,
            poster: 'http://localhost:3001/fast_and_furious_7.jpg'
        }, {
            title: '王牌特工',
            _id: 2,
            poster: 'http://localhost:3001/kingsman_the_secret_service.jpg'
        }, {
            title: '速度与激情7',
            _id: 3,
            poster: ''
        }, {
            title: '速度与激情7',
            _id: 4,
            poster: ''
        }, {
            title: '速度与激情7',
            _id: 5,
            poster: ''
        }, {
            title: '速度与激情7',
            _id: 6,
            poster: ''
        }]
    });
});

//detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: '影片详情',
        movie: {
            title: '机械战警',
            doctor: '',
            country: '',
            year: '2014',
            poster: '',
            language: '英语',
            flash: '',
            summary: ''
        }
    });
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台管理',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
});

//list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: '影片列表',
        movies: [{
            title: '机械战警',
            _id: 1,
            doctor: '',
            country: '',
            year: '2014',
            poster: '',
            language: '英语',
            flash: '',
            summary: ''
        }]
    });
});

