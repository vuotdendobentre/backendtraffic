module.exports = function(app){
    var Fail = require('../controllers/failController');

    // Fail route

    // app.route('/fails/newbydate/:plate/:date/:time')
    //     .get(Fail.read_list_onlydate)

    // app.route('/fails')     
    //     .get(Fail.read_list_fail)      
    //     .post(Fail.create_a_fail)

    // app.route('/fails/:failname')
    //     .get(Fail.read_a_fail)
        
    app.route('/newfails')
        .post(Fail.create_new_fail)
        
    app.route('/superadmin')
        .post(Fail.all_submit)
   
};