var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var userSchema = new Schema({
provider:  String,
accessToken: String,
refreshToken: String,
name: String,
userId: {type: String, ref: 'User'},
dateAdded: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);