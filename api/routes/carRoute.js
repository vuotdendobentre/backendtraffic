module.exports = function(app){
    var car = require('../controllers/carController');

    // //car route
    // app.route('/cars')           
    //     .post(car.create_a_car)

    app.route('/cars/:Plate')
        .get(car.read_a_car)
        
    
    app.route('/cars')
        .get(car.read_list_car)
        .post(car.add_new_car)
       
    
    


    
};