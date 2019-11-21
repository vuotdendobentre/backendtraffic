var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
     Blate : String,
     label: String,
     color : String,
     number : String,
     manaUsername : String,
     name : String
}); 

  
module.exports = mongoose.model('cars', UserSchema);