const request = require('request')

const forecast = (lat,lng,callback) =>{
    const url = 'https://api.darksky.net/forecast/ee11ebcd5dc9c4baf3689abcb28fecd6/' + lat + ',' + lng
    request({ url, json : true}, (error, {body}) =>{
        if(error){
            callback("Unable to connect to weather services")
        }else if(body.error){
            callback("Unable to forecast",undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature+ " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })

}

module.exports= forecast