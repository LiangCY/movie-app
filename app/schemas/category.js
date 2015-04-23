var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    name: {type: String, unique: true},
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

CategorySchema.statics = {
    fetch: function (cb) {
        return this.find({})
            .sort('-meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this.findOne({_id: id})
            .exec(cb);
    }
};

module.exports = CategorySchema;