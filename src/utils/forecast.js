const request = require('request')

//Simple Reuest module usage
// const url = 'http://api.weatherstack.com/current?access_key=4d5ed590ad9d7a9f695d93629818377f&query=37.8267,-122.4233&units=f'

// request({ url: url,json: true}, (err, response) =>{ 
//     if (err){
//         console.log('Unable to connect to weather service')
//     }
//     else if(response.body.error){
//         console.log('Unable to find location')

//     }
//     else{
//         console.log("It is Currently ", response.body.current.temperature," degrees out". response.body.current.weather_descriptions[0])
//         console.log(response.body.current.weather_descriptions[0])
//     }
    
// })


const forecast = (longitude,lattitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4d5ed590ad9d7a9f695d93629818377f&query='+encodeURIComponent(longitude)+','+encodeURIComponent(lattitude)+'&units=f'
    request({url, json: true}, (err, {body}) =>{ 
    if (err){
        callback('Internet Issue',undefined)
    }
    else if(body.error){
        callback('Unable to find location',undefined)

    }
    else{
        callback(undefined,{
            current_temp : body.current.temperature,
            desc : body.current.weather_descriptions[0]
        })
    }
    
})

}

module.exports = forecast