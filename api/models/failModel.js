var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  Blate: String,
  date: String,
  time: String,
  user : Object

});



module.exports = mongoose.model('fails', UserSchema);