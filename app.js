var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);

console.log('movie site started on port ' + port);

//index page
app.get('/', function (req, res) {
    res.render('index',
        {title: 'Movie'});
});

//detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail',
        {title: '影片详情'});
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin',
        {title: '后台管理'});
});

//list page
app.get('/admin/list', function (req, res) {
    res.render('list',
        {title: '影片列表'});
});

