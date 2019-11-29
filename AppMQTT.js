let mosca = require('mosca');
let mqtt = require('mqtt');
let wsAddress = 'ws://127.0.0.1:1884';
let callApi = require('./apiCaller/callApi');
let mkdir = require('mkdirp');
let fs = require('fs')
//path ssl 

//config mqtt 
let settings = {
    port: 1885,
    stats: false,
    http: {
        port: 1884,
        static: __dirname + "/public",
        bundle: true
    }

};
let mqttServer = new mosca.Server(settings);
let mqttClient = mqtt.connect(wsAddress, { keepalive: 0 });

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

mqttServer.on('published', function (packet, client) {


    if ((typeof packet.payload) === 'object') {
        console.log(true);
        dataObject = JSON.parse(packet.payload.toString());
        saveIMG(dataObject)
        if (dataObject.Blate) {
            callApi(`fails`, 'POST', {
                Blate: dataObject.Blate,
                date: dataObject.date,
                time: dataObject.time
            }).then(res => {
                if (res) console.log(res.data);
            });


            console.log(client.id + ' is publish message : ' + packet.payload.toString())
        }

    }
    console.log('published : ' + packet.payload.toString());
});


mqttServer.on('subscribed', function (topic, client) {
    console.log('subscribe : ' + topic);



});

mqttServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribe : ' + topic);


});

mqttServer.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});
mqttServer.on('clientDisconnected', function (client) {
    console.log('client disconnected', client.id);
});