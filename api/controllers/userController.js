var mongoose = require('mongoose'),
User = mongoose.model('users');

exports.read_list_user = function(req,res){
  
  User.find({},function(err,user){
    //console.log(req.headers.sl)
    if(err) res.send(err)
    res.json(user)
  })
}


exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.read_a_user = function(req, res) {
  User.find({username:req.params.username}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
    //res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};






exports.find_user = function(req,res){
  User.find({username:req.params.username},function(err,user){
    if(err) res.json(err);
    res.json({
      status : user.length>0 ? true : false
    })
  })
}

exports.authenticate_a_user = function(req,res){
  console.log(req.body)
  console.log(req.params)
  console.log(req.headers)
  User.findOne({username:req.body.username},function(err,user){
    if(err) res.send(err);
    if(!user){
      res.json({
        success : false,
        msg : 'Username does not exist'
      })
    }else if(user.password == req.body.password){
      console.log(user)

      setTimeout(() => {
        res.json({
          role : user.rule,
          plate : user.Plate ? user.Plate :[],
          success : true,
          msg : 'authenticate success'
        })
      }, 200);
    }else{
      res.json({
        success : false, 
        msg:'Wrong password'
      })
    }

  })
}


