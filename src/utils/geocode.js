const request = require('request')
const chalk = require('chalk')

//Getting current, minute, hourly and daily forecast weather data
// const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=1.715280&lon=44.771671&units=metric&appid=e3b80aa4bd2108074866ea58a382e669'

// // const url =  'http://api.openweathermap.org/data/2.5/weather?q=Merca&units=metric&lang=fr&appid=e3b80aa4bd2108074866ea58a382e669'
// // const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&lang=fr&appid=e3b80aa4bd2108074866ea58a382e669'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2hhemFsaTRtZSIsImEiOiJja2xmNmo2MTQxZ2JqMndzNDRjZHFycjVhIn0.AmtqKl0X9RgneclZgcMFtA'

    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to location services! Please check your Internet connection', undefined)
        } else if(body.features.length === 0){
             callback('Unable to find location. Try another search.', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]

            callback(undefined,{
                latitude: latitude,
                longitude: longitude,
                location: body.features[0].place_name
            })
        }

    })
}


module.exports = geocode

