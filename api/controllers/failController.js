let mongoose = require('mongoose'),
    Fail = mongoose.model('fails');

let mkdir = require('mkdirp');
let fs = require('fs')

User = mongoose.model('users');
Car = mongoose.model('cars');



exports.read_list_fail = function (req, res) {
    //console.log(Fail)
    let data = [];
    Fail.find({}, function (err, fail) {
        if (err) res.send(err);
        data = fail;
        fail.map((value, index) => {
            User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                if (err) res.send(err);
                data[index].user = failUser[0]
                if (index === data.length - 1) {
                    setTimeout(() => {
                        res.json(data)
                    }, 200)

                }
            })
        })

    })
}

exports.create_a_fail = function (req, res) {
    let new_fail = new Fail(req.body);
    new_fail.save(function (err, fail) {
        if (err)
            res.send(err);
        res.json(fail);
    });
};


exports.read_a_fail = function (req, res) {

    Fail.find({ Blate: req.params.failname }, function (err, fail) {
        if (err) res.send(err);

        User.find({ Blate: req.params.failname }).select('name SDT CMND').exec((err, failUser) => {
            if (err) res.send(err);

            if (failUser) {
                setTimeout(() => {
                    //console.log(failUser)
                    res.json({ user: failUser[0], fails: fail })
                }, 200)
            }
        })
    })
};


exports.read_list_byplate = function (req, res) {
    let result = [];
    console.log(req.body.plate)
    try {
        User.find({Blate:req.body.plate}).select('name SDT CMND').exec((err,user)=>{
            
            if(user){
                req.body.plate.map((value,index)=>{
                    setTimeout(()=>{
                        Fail.find({Blate:value},(err,fail)=>{
                            if(err) res.send(err);
                            setTimeout(()=>{
                                if(fail){
                                    result= [...result,...fail]
                               }
                            },200)
                        })
                    },200)
                    if(req.body.plate.map.length-1 === index){
                        setTimeout(()=>{
                            for(let i = 0 ; i < result.length ; i++){
                                result[i].user = user[0] ;
                            }
                            console.log(result)
                            res.json(result)
                        },1000)
                    }
                })
            }
        })
        
    } catch (err) {
        res.send(false)
    }



}

exports.read_list_bydate = function (req, res) {

    let result = req.params.yyyy;
    if (req.params.mm !== '--') {
        result += `/${req.params.mm}`;
        if (req.params.dd !== '--') {
            result += `/${req.params.dd}`;
        }
    }

    let data = [];
    Fail.find({ date: { $regex: result, $options: 'i' } }, function (err, fail) {
        if (err) res.send(err);
        data = fail;
        if (data.length > 0) {
            fail.map((value, index) => {
                User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                    if (err) res.send(err);
                    data[index].user = failUser;
                    if (index === data.length - 1) {
                        res.json(Chonfile(data, req.params.sl))
                    }
                })
            })
        } else {
            res.send(data)
        }

    })


}

exports.read_list_bydate_img = function (req, res) {

    let plate = req.params.plate;
    let date = req.params.date.replace(/_/g, '/');

    Fail.find({ Blate: plate, date: date }, function (err, fail) {
        if (err) res.send(err);
        setTimeout(() => {
            res.json(fail)
        }, 200)
    })
}

exports.read_list_onlydate = function (req, res) {
    let data = [];
    let { sl, date,plate,time } = req.params;
    
    let obj = {}
    if(plate!=='--'){   
        obj.Blate={ $regex: plate, $options: 'i' };
    }
    if(date!=='--'){
       let  _date = date.replace(/_/g, '/');
        obj.date= { $regex: _date, $options: 'i' };
    }
    if(time!=='--'){
        obj.time={ $regex: time, $options: 'i' };
    }
    
    Fail.find( obj).sort({date : -1,time : -1}).exec((err, fail)=> {
        if (err) res.send(err);
        if (fail && fail.length > 0) {
            data = fail;
            fail.map((value, index) => {
                User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                    if (err) res.send(err);
                    data[index].user = failUser[0]
                    if (index === data.length - 1) {
                        setTimeout(() => {

                            res.json({ data: Chonfile(data, sl), maxSl: data.length })
                        }, 200)
                    }
                })
            })
        } else {
            res.send(data)
        }

    })
}


exports.all_submit = function(req,res){
    let { Blate , label , color , number , nameCar , username , password , nameUser , CMND , SDT , date , time }= req.body;
    let new_fail = new Fail({Blate,date,time });
    if(date!==''){
        new_fail.save(function (err, fail) {
            if (err)
                res.send(err);
        });
        console.log('fail')
    }
    let new_car = new Car({Blate,label,color,number, manaUsername : username,name:nameCar });
    if(label!==''){
        new_car.save(function (err, car) {
            if (err)
                res.send(err);
        });
        console.log('car')
    }
    if(password!==''){
        let plate = [];
        plate.push(Blate);
        let new_user = new User({username,password,name:nameUser,SDT,CMND,rule:1,Blate:plate});
        new_user.save(function (err, user) {
            if (err)
                res.send(err);
        });
        console.log('user')
    }
    res.send(true)
}


exports.create_new_fail = function(req,res){
    //console.log(req.body);
    if(req.body.img){
        saveIMG(req.body)
    }
    delete req.body.img;
    let new_fail = new Fail(req.body);
    new_fail.save(function (err, fail) {
        if (err)
            res.send(err);
        res.json(fail);
    });
}



function Chonfile(arr, soluong) {
    soluong = parseInt(soluong);
    soluong = soluong * 10;
    if (arr.length > (soluong + 10)) {
        return (arr.slice(soluong, soluong + 10));
    } else {
        return arr.slice(soluong, arr.length);
    }

}



function saveIMG(data) {
    let date = data.date.replace(/\//gi, '_');
    let time = data.time
    let dataImg = data.img.replace(/^data:image\/\w+;base64,/, "");
    let plate = data.Blate
    let buf = new Buffer.from(dataImg, 'base64');
    fs.exists(`public/img/${date}`, function (exists) {
        if (!exists) {
            mkdir(`public/img/${date}`, function (err) {
                if (err) console.log(err);
                fs.writeFileSync(`public/img/${date}/${plate}_${time}.jpg`, buf, function (err) {
                    if (err) console.log(err);

                })
            })
        } else {
            fs.writeFileSync(`public/img/${date}/${plate}_${time}.jpg`, buf, function (err) {
                if (err) console.log(err);

            })
        }
    })

}

