var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
     _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          auto: true,
        },
     Plate : String,
     label: String,
     color : String,
     number : String,
     manaUsername : String,
     name : String
}); 

  
module.exports = mongoose.model('cars', UserSchema);