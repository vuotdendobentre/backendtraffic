module.exports = function(app){
    var Fail = require('../controllers/failController');

    //Fail route
    app.route('/fails')     
        .get(Fail.read_list_fail)      
        .post(Fail.create_a_fail)

    app.route('/fails/:failname')
        .get(Fail.read_a_fail)
        
    app.route('/fails/bydate/:yyyy/:mm/:dd/:sl')
        .get(Fail.read_list_bydate)
    
    app.route('/fails/plate')
        .post(Fail.read_list_byplate)
};