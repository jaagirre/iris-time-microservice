'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');


//geocoding api key: AIzaSyDlnJCpWK0isWc5Yok9blxI5usG3IoQOOo
//https://maps.googleapis.com/maps/api/geocode/json?address=vienna&key=AIzaSyDlnJCpWK0isWc5Yok9blxI5usG3IoQOOo

//timezone api key : AIzaSyC0L1C47I2wkYfN3C6SJ1ExnLER4w_dIzY
//https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY

service.get('/service/:location', (req, res, next)=>{
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req.params.location+'&key=AIzaSyDlnJCpWK0isWc5Yok9blxI5usG3IoQOOo', (err, response)=>{
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');
        //res.json(response.body.results[0].geometry.location);
           //38.908133,-77.047119 
        request.get('https://maps.googleapis.com/maps/api/timezone/json?location='+location.lat+','+location.lng+'&timestamp='+timestamp+'&key=AIzaSyC0L1C47I2wkYfN3C6SJ1ExnLER4w_dIzY', (err, response)=>{
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }

            const result = response.body;
            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd,MMM Do YYYY, h:mm:ss a');
            res.json({result:timeString});
        });
    });
    //res.json({result: req.params.location});
});

module.exports = service;