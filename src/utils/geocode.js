const request = require('request')

//Simple request use of the module.
// const urlMaxBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/New%20York.json?access_token=pk.eyJ1IjoiZ2Rha25pazIxIiwiYSI6ImNrZHk1dnU4cTB6a3MycW9heXNkZms3Y3QifQ.Kr4cFc-G8OjwiHMU0xnong&limit=1'
// request({ url: urlMaxBox,json: true}, (err, response) =>{ 
//     if(err){
//         console.log('Unable to setup connection')
//     }
//     else if(response.body.features.length === 0){
//         console.log('Unable to find the location')

//     }
//     else{
//         const longt = response.body.features[0].center[0];
//         const lat = response.body.features[0].center[1]
//         console.log(longt,lat)
//     }
// })


const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2Rha25pazIxIiwiYSI6ImNrZHk1dnU4cTB6a3MycW9heXNkZms3Y3QifQ.Kr4cFc-G8OjwiHMU0xnong&limit=1'

    request({ url,json: true}, (err, { body }={}) =>{ 
        if(err){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find the address. Try another search',undefined)
    
        }
        else{  
            callback(undefined,{
                latitude:body.features[0].center[1],
                longt :body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode