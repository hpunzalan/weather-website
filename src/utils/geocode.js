const request = require('request')
const chalk = require('chalk')

const getGeoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicGhtcHVuemFsYW4iLCJhIjoiY2tqbjFnbDlmOHZxODMycng5bjd6OHh3dyJ9.SQjwqWZiykDvRdGrhNjrnQ&limit=1'
    
    request({ url, json: true }, (error, { body }) => {
        
        if (error) {
            callback('Unable to connect to location service')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const location = body.features[0]
            
            callback(undefined, {
                longitude: location.center[0],
                latitude:  location.center[1],
                location: location.place_name
            })
        }
    })
}

module.exports = getGeoCode