var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var userSchema = new Schema({
provider:  String,
accessToken: String,
refreshToken: String,
name: String,
userId: String,
id: {type: ObjectId, ref: 'User'},
dateAdded: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);