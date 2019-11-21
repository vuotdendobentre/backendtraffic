module.exports = function(app){
    var car = require('../controllers/carController');

    // //car route
    // app.route('/cars')           
    //     .post(car.create_a_car)

    app.route('/cars/:blate')
        .get(car.read_a_car)
    
       
    
    


    
};