var Text = require('../../../models/text');
var moment = require('moment');
var _ = require('underscore');


exports.add = function (req, res) {
    res.render('cp/views/text/add', {
        title: "添加文章",
        text: {}
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Text.findById(id, function (err, text) {
            console.log(text);
            res.render('cp/views/text/add', {
                title: '添加文章',
                text: text
            })
        })
    }

};


exports.list = function (req, res) {
    Text.fetch(function (err, text) {
        if (err) {
            console.log(err);
        }
        res.render('cp/views/text/list', {
            title: '文章列表',
            moment: moment,
            text: text
        })
    })

};

//console.log(moment().format('YYYY-M-d-h:mm:ss'));

//post saveText

exports.save = function (req, res) {
    var id = req.body._id,
        textObj = req.body.text,
        _text;

    if (id) {
        Text.findById(id, function (err, text) {
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
        res.redirect('/passport/text/list');
    }
    else {
        _text = new Text(textObj);

        _text.save(function (err, text) {
            if (err) {
                console.log(err);
            }

            res.redirect('/passport/text/list');
        });
    }
};


//post del.
exports.del = function (req, res) {
    var id = req.query.id; // 获取id
    Text.remove({_id: id}, function (err, text) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({success: 1});
        }
    })
};


