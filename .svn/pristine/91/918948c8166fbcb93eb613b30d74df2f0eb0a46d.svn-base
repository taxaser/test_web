var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProductsSchema = new Schema({
    chinese_name:String,
    english_name: String,
    cn_description: String,
    en_description: String,
    price: String,
    poster:[],
    img_file:String,
    recommend:{
        type: Number,
        default:0
    },
    category_name:String,
    category: {

            type:ObjectId,
            ref: 'Category'

    },
    chinese_detail:String,
    english_detail:String,
    pv:{
        type: Number,
        default: 0
    },
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

ProductsSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
});

ProductsSchema.statics = {
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

module.exports = ProductsSchema;