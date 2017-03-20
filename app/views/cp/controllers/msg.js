var Msg = require('../../../models/msg');
var _ = require('underscore');

//post saveCategory

exports.add = function(req, res) {
    var msgObj = req.body;
    var _msg = new Msg(msgObj);

    _msg.save(function(err, msg) {
            if (err) {
                console.log(err);
            }else{
                res.json({
                    success:1
                });
            }
        })
};

exports.list = function(req, res) {
    Msg.fetch(function(err,msg){
        if (err) {
            console.log(err);
        }
        res.render('cp/views/home/msg',{
            title:'留言列表',
            msgs:msg
        })
    })
};

exports.del = function(req, res) {
    var id = req.query.id; // 获取id
    Msg.findById(id, function (err, result) {
        if(err){
            cosnole.log(err)
        }else{
            console.log("result:",result);
            result.remove();
            res.json({
                success:1
            });
        }
    })
};