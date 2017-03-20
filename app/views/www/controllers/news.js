var News = require('../../../models/news');
var Categories = require('./categories');
var moment = require('moment');
exports.news = function (req, res) {

    var page = parseInt(req.query.page, 10) || 1;
    var count = 2;
    var index = (page - 1) * count;
    Categories.categories().then(function (data) {
        News.fetch(function (err, news) {

            if (err) {
                console.log(err);
            }
            var results = page ? news.slice(index, index + count) : news;
            res.render('www/views/news/list', {
                title: 'BirghtLight News list',
                moment: moment,
                categories: data,
                news: results,
                currentPage: page,
                page_type: 'news',
                totalPage: Math.ceil(news.length / count) + 1
            })
        })


    });
};

exports.news_detail = function (req, res) {
    var id = req.query.id;
    Categories.categories().then(function (data) {
        News.findById(id, function (err, detail) {
            if (err) {
                console.log(err);
            }
            res.render('www/views/news/detail', {
                categories: data,
                title: detail.en_name,
                moment: moment,
                detail: detail
            });
        });
    });
};