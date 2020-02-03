var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  Plate: String,
  date: String,
  time: String,
  //user : Object,
  type: Number

});



module.exports = mongoose.model('fails', UserSchema);