var User = require('../views/cp/controllers/user'),
    Index = require('../views/www/controllers/index'),
    Products = require('../views/www/controllers/products'),
    News = require('../views/www/controllers/news');
var Domain = require('domain');
var logger = require('morgan');

module.exports = function(app){

    app.get('/', Index.index);
    app.get('/list/:id', Products.list);
    app.get('/list', Products.list);
    app.get('/detail', Products.detail);
    app.get('/about', Index.about);
    app.get('/contact', Index.contact);
    //新闻
    app.get('/news', News.news);
    app.get('/news/:id', News.news);
    app.get('/news_detail', News.news_detail);

    //app.get('*', error);

    process.on('uncaughtException', function (err) {
        console.log(12345);
        //logger.error(err);
    });

};