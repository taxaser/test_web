//index page
var Text = require('../../../models/text');

exports.index = function (req, res) {
    res.render('cp/views/home/index', {
        title: "测试用例"
    });
};


exports.about = function (req, res) {
    res.render('cp/views/home/about', {
        title: "测试用例",
        about: ""
    });

};

exports.aboutSave = function (req, res) {
    var id = req.params.id;

    Product.findById(id, function (err, product) {
        if (err) {
            console.log(err);
        }
        product.category = eval(product.category);

        res.render('cp/views/home/add', {
            title: 'iproduct 列表页',
            product: product,
            categories: categories_arr
        })
    });


};

exports.items = function (req, res) {
    res.render('cp/views/home/items', {
        title: "测试用例"
    });

};

