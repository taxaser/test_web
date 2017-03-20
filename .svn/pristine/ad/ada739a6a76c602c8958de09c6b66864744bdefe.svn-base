var Product = require('../../../models/product');
var Category = require('../../../models/category');
var Categories = require('./categories');
var Text = require('../../../models/text');

exports.index = function (req, res) {
    Product.find({recommend:1},function(err,items){
        if (err) {
            console.log(err);
        }
        res.render('www/views/home/index',{
            title: "BirghtLight",
            product:items
        });
    })

};
//内网
//581955e4684a95aa7d76a08d 关于我们
//5819531eac6373247da82d34 联系方式

//外网
//5828a521ecaaebec28f4d388 关于我们
//5828a53eecaaebec28f4d389 联系方式
exports.about = function (req, res) {
    var id = '5828a521ecaaebec28f4d388';
    Categories.categories().then(function(data){
        Text.findById(id, function(err,text){
            res.render('www/views/home/about',{
                title: "About BirghtLight",
                text:text,
                categories:data
            });
            if (err) {
                console.log(err);
            }

        });
    });

};


exports.contact = function (req, res) {
    var id = '5828a53eecaaebec28f4d389';
    Categories.categories().then(function(data){
        Text.findById(id, function(err,text){
            res.render('www/views/home/contact',{
                title: "Contact BirghtLight",
                text:text,
                categories:data
            });
            if (err) {
                console.log(err);
            }

        });
    });
};

