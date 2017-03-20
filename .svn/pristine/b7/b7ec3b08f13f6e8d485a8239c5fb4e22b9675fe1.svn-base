var User = require('../../../models/user');

//siginup

exports.showSignUp = function (req, res) {
    res.render('cp/views/passport/sign_up', {
        title: '注册页面'
    })
};

exports.showSignIn = function (req, res) {
    res.render('cp/views/user/sign_in', {
        title: '登陆页面'
    })
};

exports.signUp = function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if(err) {
            console.log(err);
        }
        if(user) {
            return res.redirect('/passport/sign_in');
        }else{
            var user = new User(_user);

            user.save(function (err, user) {
                if(err) {
                    console.log(err);
                }
                console.log("user:",user);
                req.session.user = user;
                res.redirect('/');
            });
        }
    });
    // req.param('user')
    //console.log(req.query);

    console.log(_user);

};

exports.signIn = function (req, res) {

    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if(err) {
            console.log(err);
        }

        if(!user) {
            return res.redirect('/user/sign_up');
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }
            if(isMatch) {
                req.session.user = user;
                return res.redirect('/passport');
            }else{
                console.log('Password is not matched!');
                return res.redirect('/user/sign_in');
            }
        })

    })
};

//logout
exports.logOut = function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};

//userlist page
exports.list = function (req, res) {
    User.fetch(function(err,users){
        if (err) {
            console.log(err);
        }

        res.render('cp/user_list',{
            title:'用户 列表页',
            users:users
        })
    })
};


exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({_id:id},function(err,user){
            if (err) {
                console.log(err);
            }
            else{
                res.json({success:1});
            }
        })
    }
};


exports.signInRequired = function (req, res, next) {
    var user = req.session.user;
    if(!user) {
        return res.redirect('/user/sign_in')
    }
    next();
};

exports.adminRequired = function (req, res, next) {

    var user = req.session.user;
    if(user.role <= 10) {
        return res.redirect('/user/sign_in')
    }
    next();
};

exports.user = function (req,res, next) {
    var obj = {},
        user = req.session.user;
        if(user){
            obj.name=user.name;
            obj.role=user.role;
            obj.code=1;
        }else{
            obj={
                msg:"用户没有登录"
            }
        }

    res.json(obj);
};