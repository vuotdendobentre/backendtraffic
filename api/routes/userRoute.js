module.exports = function(app){
    var user = require('../controllers/userController');

    //user route
    app.route('/users')           
        .post(user.create_a_user)
        .get(user.read_list_user)

    app.route('/users/:username')
        .get(user.read_a_user)
        .put(user.update_a_user)
       
    
    app.route('/users/login')
        .post(user.authenticate_a_user)


    app.route('/users/finduser/:username')
        .post(user.find_user)

};