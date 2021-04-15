const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon=' + longitude +'&units=metric&appid=e3b80aa4bd2108074866ea58a382e669'
    //const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2hhemFsaTRtZSIsImEiOiJja2xmNmo2MTQxZ2JqMndzNDRjZHFycjVhIn0.AmtqKl0X9RgneclZgcMFtA'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(chalk.red('Unable to connect to weather service!',undefined))
        } else if(body.message){
            callback(chalk.red('Unable to find location.', undefined))
        } else {
        const tempreature = body.current.temp
        const rain = body.current.rain
        const data = body.daily[0].weather[0].description +'. It\'s currently '+ tempreature + ' degrees out. The high today is ' + body.daily[0].temp.max +' with a low of ' + body.daily[0].temp.min + '. There is a '+ body.daily[0].pop + '% chance of rain'
        callback(undefined,data)
        console.log('\n'); 
        }
    })
}

module.exports = forecast