var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                auto: true,
        },
        username: String,
        name: String,
        password: String,
        SDT : String,
        CMND : String,
        rule : String,
        Blate : Array
        
}); 

  
module.exports = mongoose.model('users', UserSchema);