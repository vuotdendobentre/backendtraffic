var axios = require('axios');
var Config = require('./Config');

module.exports = function(endpoint,method='GET',body){
    console.log(`${Config.API_URL}/${endpoint}`);
    return axios({
        method: method,
        dataType : 'jsonp',
        url : `${Config.API_URL}/${endpoint}`,
        data : body
    }).catch(err=>{
        console.log(false);
    });
}