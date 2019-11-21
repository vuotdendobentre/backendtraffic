var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        _id : String,
        username: String,
        name: String,
        password: String,
        SDT : String,
        CMND : String,
        rule : String,
        Blate : Array
        
}); 

  
module.exports = mongoose.model('users', UserSchema);