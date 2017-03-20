//index page
exports.main = function (req, res) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/user/sign_in');
    }
    res.render('cp/views/main/main', {
        title: "测试用例"
    });
};

exports.left = function (req, res) {
    res.render('cp/views/main/left', {
        title: "cp/测试用例"
    });

};

exports.top = function (req, res) {
    res.render('cp/views/main/top', {
        title: "测试用例"
    });

};