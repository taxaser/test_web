var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    role: {
        type: Number,
        default: 0
    },
    // 0: normal user
    // 1: verified user
    // 2: professional user

    // >10: admin
    // >40: super admin
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});

UserSchema.pre('save',function(next){
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            //console.log("hash:",user);
            next();

        })
    });
});

UserSchema.methods = {
    comparePassword: function(_passowrd, cb){
        bcrypt.compare(_passowrd, this.password, function (err, isMatch) {
            if (err) return cb(err);

            cb(null, isMatch);
        })
    }
};

UserSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb){
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};
module.exports = UserSchema;