let mongoose = require('mongoose'),
    Fail = mongoose.model('fails');
User = mongoose.model('users');



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
    try {

        if (req.body.plate) {
            if (req.body.plate.length > 0) {

                req.body.plate.map((value, index) => {
                    Fail.find({ Blate: value }, function (err, fail) {
                        if (err) res.send(err);
                        data = fail;
                        fail.map((value, index) => {
                            User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                                if (err) res.send(err);
                                data[index].user = failUser[0]
                                if (index === data.length - 1) {
                                    result = [...result, ...data];

                                }
                            })
                        })

                    })
                    if (index === req.body.plate.length - 1) {
                        setTimeout(() => {

                            res.json({
                                success: true,
                                data: result
                            })
                        }, 1000)
                    }
                })
            } else {
                res.json({
                    success: false
                })
            }
        } else {
            res.json({
                success: false
            })
        }
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
        if(data.length>0){
            fail.map((value, index) => {
                User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                    if (err) res.send(err);
                    data[index].user = failUser;
                    if (index === data.length - 1) {
                        res.json(Chonfile(data, req.params.sl))
                    }
                })
            })
        }else{
            res.send(false)
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
    let { sl, date } = req.params;
    _date = date.replace(/_/g, '/');
    console.log(_date)
    Fail.find({ date:_date }, function (err, fail) {
        if (err) res.send(err);
        if (fail && fail.length > 0) {
            data = fail;
            fail.map((value, index) => {
                User.find({ Blate: value.Blate }).select('name SDT CMND').exec((err, failUser) => {
                    if (err) res.send(err);
                    data[index].user = failUser[0]
                    if (index === data.length - 1) {
                        setTimeout(() => {
                            res.json(Chonfile(data, sl))
                        }, 200)

                    }
                })
            })
        }else{
            res.send(false)
        }

    })
}

function Chonfile(arr, soluong) {
    soluong = parseInt(soluong);
    soluong = soluong * 15;
    if (arr.length > (soluong + 15)) {
        return (arr.slice(soluong, soluong + 15));
    } else {
        return arr.slice(soluong, arr.length);
    }

}

