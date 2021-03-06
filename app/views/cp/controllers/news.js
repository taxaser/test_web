var News = require('../../../models/news');
var moment = require('moment');
var _ = require('underscore');


exports.add = function (req, res) {
    res.render('cp/views/news/add', {
        title: "添加文章",
        news: {}
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        News.findById(id, function (err, text) {
            res.render('cp/views/news/add', {
                title: '添加文章',
                news: text
            })
        })
    }

};


exports.list = function (req, res) {
    News.fetch(function (err, text) {
        if (err) {
            console.log(err);
        }
        res.render('cp/views/news/list', {
            title: '文章列表',
            moment: moment,
            news: text
        })
    })

};

//console.log(moment().format('YYYY-M-d-h:mm:ss'));

//post saveText

exports.save = function (req, res) {
    var id = req.body._id,
        textObj = req.body.news,
        _text;

    if (id) {
        News.findById(id, function (err, text) {
            if (err) {
                console.log(err);
            }
            _text = _.extend(text, textObj);
            _text.save(function (err, text) {
                if (err) {
                    console.log(err);
                }
                //res.redirect('/passport/text/list');

            })
        });
        res.json({
            success: 1
        });
    }
    else {
        _text = new News(textObj);

        _text.save(function (err, text) {
            if (err) {
                console.log(err);
            }

            res.redirect('/passport/news/list');
        });
    }
};


//post del.
exports.del = function (req, res) {
    var id = req.query.id; // 获取id

    News.remove({_id: id}, function (err, text) {
        if (err) {
            console.log("error:",err);
        }
        else {
            res.json({success: 1});
        }
    });
};


