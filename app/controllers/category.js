var _ = require('underscore');
var Category = require('../models/category');

//new category
exports.new = function (req, res) {
    res.render('category_admin', {
        title: '添加分类',
        category: {
            name: ''
        }
    });
};

//edit category
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Category.findById(id, function (err, category) {
            res.render('category_admin', {
                title: '分类信息修改',
                category: category
            });
        });
    }
};


//save category
exports.save = function (req, res) {
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _category;

    if (id !== undefined) {
        Category.findById(id, function (err, category) {
            if (err) {
                console.log(err);
            }
            _category = _.extend(category, categoryObj);
            _category.save(function (err, category) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/category/list');
            });
        });
    } else {
        _category = new Category({
            name: categoryObj.name
        });
        _category.save(function (err, category) {
            if (err) {
                console.log(err)
            }
            res.redirect('/admin/category/list');
        });
    }
};

//category list
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('categorylist', {
            title: '分类列表',
            categories: categories
        });
    });
};

//category delete
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Category.remove({_id: id}, function (err, category) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        });
    }
};