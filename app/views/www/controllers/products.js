var Product = require('../../../models/product');
var Category = require('../../../models/category');
var Categories = require('./categories');
var moment = require('moment');

exports.list = function (req, res) {
    var id = req.query.id;
    var page = parseInt(req.query.page, 10) || 1;
    var count = 4;
    var index = (page-1) * count;
    Category.fetch(function(err,categories){
        if (err) {
            console.log(err);
        }
        var categories_arry = [];
        categories.forEach(function(file){
            if(file.level==1){
                for(var i =0;i<categories.length;i++){
                    var cat = categories[i];
                    if(cat['level']==2 && String(file._id)==String(cat['parent_id'])){
                        file['categories'].push(cat);
                    }
                }
                categories_arry.push(file);
                //console.log(categories_arry)
            }
        });

        if(id){
            Product.find({category:id},function(err,products) {
                if (err) {
                    console.log(err);
                }
                console.log("products:",products);
                var results = products.slice(index, index + count);
                res.render('www/views/product/list',{
                    title:'iproduct 列表页',
                    categories:categories_arry,
                    product:results,
                    id:id,
                    page_type:'list',
                    currentPage:page,
                    totalPage: Math.ceil(products.length / count)+1
                })

            });
        }else{
            Product.fetch(function(err,products) {
                if (err) {
                    console.log(err);
                }
                var results = products.slice(index, index + count);
                res.render('www/views/product/list',{
                    title:'BirghtLight Product',
                    categories:categories_arry,
                    product:results,
                    currentPage:page,
                    page_type:'list',
                    id:id,
                    totalPage: Math.ceil(products.length / count)+1
                })

            });
        }


    });
};

exports.detail = function (req, res) {
    var id = req.query.id;
    Categories.categories().then(function (data) {
        Product.findById(id, function(err, product) {
            if (err) {
                console.log(err);
            }
            res.render('www/views/product/detail',{
                title: product.english_name,
                item:product,
                moment: moment,
                categories:data
            });
        })
    })


};