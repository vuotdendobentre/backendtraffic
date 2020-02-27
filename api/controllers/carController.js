var mongoose = require('mongoose'),
  Car = mongoose.model('cars');
User = mongoose.model('users')


exports.read_a_car = function (req, res) {
  let data = '';
  Car.find({ Plate: req.params.Plate }).select('Plate label color number name').exec((err, car) => {
    if (err)
      res.send(err);
    data = car[0];
    User.find({ Plate: req.params.Plate }).select('name SDT CMND').exec((err, user) => {
      if (err) res.send(err)
      res.json({ car: data, user: user[0] })
    })
  });
};


exports.add_new_car = function (req,res) {
  let new_car = new Car(req.body)
  new_car.save((err,car)=>{
    if(err) res.send(err)
    res.json(car)
  })
}

exports.read_list_car = function (req,res){
  Car.find({},(err,car)=>{
    if(err) res.send(err);
    res.json(car)
  })
}

exports.find_car = function(req,res){
  Car.find({Plate:req.params.Plate},function(err,car){
    if(err) res.json(err);
    res.json({
      status : car.length>0 ? true : false
    })
  })
}

exports.update_a_car = function(req, res) {
  User.findOneAndUpdate({Plate: req.params.Plate}, req.body, {new: true}, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};


exports.delete_a_car = function(req,res){
  User.deleteOne({Plate:req.params.Plate},function(err){
    if(err) res.send(err)
    res.json({message:true})
  })
}
