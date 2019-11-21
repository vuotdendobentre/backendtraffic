var mongoose = require('mongoose'),
Car = mongoose.model('cars');
User = mongoose.model('users')


exports.read_a_car = function(req, res) {
    let data = '';
  Car.find({Blate:req.params.blate}).select('Blate label color number name').exec((err,car)=>{
    if (err)
      res.send(err);
      data = car[0];
    User.find({Blate:req.params.blate}).select('name SDT CMND').exec((err,user)=>{
        if(err) res.send(err)    
        res.json({car :data,user:user[0]})
    })
  });
};


