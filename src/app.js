const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
    title : 'Weather App',
    name: 'Dakshita Garg'
    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
       title : 'About Me', 
       name: 'Dakshita Garg'
   })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        HelpPage:'This is the help app',
        title : 'Help',
        name:'Dakshita Garg'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"You must enter an address"
        })
    }
    
    geocode(req.query.address,(error, {latitude,long,location} = {})=>{
        if(error){
            return res.send({
                Error : error
            })
    
        }
        forecast(latitude,long,(error,data_forecast)=>{
            if(error){
                return  res.send({
                    Error : error
                })
            }
    
            console.log('location',location)
            console.log(data_forecast)
            return res.send({
                location : location,
                dataforecast:data_forecast
            })
        })
    
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage:"Help Page not found",
        name : 'Dakshita Garg'
    
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage:"Page not found",
        name :'Dakshita Garg'
    })

})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})

