const request = require('request')
const chalk = require('chalk')

const getWeather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0b0c492da4dfff823aa99d17c046a30&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (error, { body }) => {
        
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let forecast = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'
            callback(undefined, forecast)
        }
    })  
    
}

module.exports = getWeather