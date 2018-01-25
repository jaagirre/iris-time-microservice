'use strict';
//para cargar el fichero .env en process.env
require('dotenv').load();
const config = require('../config/index');

const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
//server.listen(3010);
//random port
server.listen();

server.on('listening', function(){
    console.log(`IRIS-time is listening on ${server.address().port} in ${service.get('env')} mode`);

    const announce = ()=>{
        //request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err, res)=>{
        request.put(`${config.iris_service_regfistry_url}${server.address().port}`, (err, res)=>{
            if (err){
                console.log(err);
                console.log('Error connecting to Iris');
                return;
            }
            console.log(res.body);
        });

    };

    announce();
    setInterval(announce, 15*1000);
});

