var Main = require('../views/cp/controllers/main'),
    Index = require('../views/cp/controllers/index'),
    Product = require("../views/cp/controllers/product"),
    User = require('../views/cp/controllers/user'),
    Msg = require('../views/cp/controllers/msg'),
    Text = require('../views/cp/controllers/text'),
    News = require('../views/cp/controllers/news'),
    Category = require('../views/cp/controllers/category'),
    ueditor = require("ueditor"),
    path = require("path"),
    multiparty = require('connect-multiparty')();

module.exports = function(app){
    //Main
    app.get('/passport', Main.main);
    app.get('/main/top', Main.top);
    app.get('/main/left', Main.left);

    //cp
    app.get('/passport/index', Index.index);
    app.get('/passport/about', Index.about);

    // User
    app.post('/user/sign_up', User.signUp);
    app.post('/user/sign_in', User.signIn);
    app.get('/user', User.user);
    app.get('/user/sign_in', User.showSignIn);
    app.get('/user/sign_up', User.showSignUp);
    app.get('/log_out', User.logOut);
    app.get('/admin/user/list', User.signInRequired, User.adminRequired, User.list);

    app.delete('/admin/user/list',User.signInRequired, User.adminRequired, User.del);

    // products
    // app.get('/product/:id', Movie.detail);
    app.get('/passport/add',User.signInRequired, User.adminRequired, Product.add);
    app.get('/passport/add/update/:id',User.signInRequired, User.adminRequired,Product.update);
    app.post('/passport/product',User.signInRequired, User.adminRequired,multiparty,Product.savePoster, Product.save);
    app.get('/passport/items', User.signInRequired, User.adminRequired, Product.list);
    app.delete('/passport/product/list',User.signInRequired, User.adminRequired, Product.del);
    app.delete('/passport/product/img',User.signInRequired, User.adminRequired, Product.delImg);
    app.get('/ueditor/ue', User.signInRequired, User.adminRequired, Product.editor);
    app.post('/ueditor/ue', User.signInRequired ,User.adminRequired, Product.editor);


    // Comment

    // app.post('/user/comment', User.signinRequired, Comment.save);

    // Category
    app.post('/passport/arry', User.signInRequired,multiparty, Category.arry);
    app.get('/passport/category', User.signInRequired,Category.add);
    app.post('/passport/category', User.signInRequired,multiparty, Category.save);
    app.get('/passport/category/update/:id',User.signInRequired, User.adminRequired,Category.update);
    app.get('/passport/category/list', User.signInRequired, Category.list);
    app.delete('/passport/category/list',User.signInRequired, User.adminRequired, Category.del);

    // text
    app.get('/passport/text', User.signInRequired,Text.add);
    app.post('/passport/text', User.signInRequired,multiparty, Text.save);
    app.get('/passport/text/update/:id',User.signInRequired, User.adminRequired,Text.update);
    app.get('/passport/text/list', User.signInRequired, Text.list);
    app.delete('/passport/text/list',User.signInRequired, User.adminRequired, Text.del);

    // news
    app.get('/passport/news', User.signInRequired,News.add);
    app.post('/passport/news', User.signInRequired,multiparty, News.save);
    app.get('/passport/news/update/:id',User.signInRequired, User.adminRequired,News.update);
    app.get('/passport/news/list', User.signInRequired, News.list);
    app.delete('/passport/news/list',User.signInRequired, User.adminRequired, News.del);

    //Msg
    app.delete('/passport/msg/list',User.signInRequired, User.adminRequired, Msg.del);
    app.get('/passport/msg', User.signInRequired,multiparty,Msg.list);
    app.post('/msg', Msg.add);
    // Results

    // app.get('/results', Index.search);*/
}