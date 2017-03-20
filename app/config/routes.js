var Web = require('./web');
var Cp = require('./cp');

function say(app) {
    console.log(app.locals.user);
}


module.exports = function (app) {
    // pre handle user
    app.use(function (req, res, next) {
        say(app);
        app.locals.user = req.session.user;
        next();
    });
    Cp(app);
    Web(app);

};
