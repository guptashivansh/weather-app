const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Define Paths for  Express Config
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', { 
        title : 'Weather App',
        name : 'Shivansh Gupta'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About Me',
        name : 'Shivansh Gupta'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText : "This is some helpful message",
        title : 'Help',
        name : 'Shivansh Gupta'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "Please provide an address."
        })
    }
    const address = req.query.address 
    geocode(address, (error,{ latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({
                error,
            })
        }
        // console.log(response.latitude)
        forecast(latitude, longitude, (error2,response) =>{
            if(error2)
            {
                return res.send({
                    error2,
                })
            }
            return res.send({
                address,
                location,
                forecast: response
            })
        })
    })
})

app.get('/products',(req,res) =>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must Provide a search term'
        })
    }
        console.log(req.query.search)

        res.send({
            products: [],
        })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title : "Error 404",
        name : 'Shivansh Gupta',
        errorMessage : 'Help Article Not Found',
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : "Error 404",
        name : 'Shivansh Gupta',
        errorMessage : 'Page Not Found'

    })
})

app.listen(port, ()=>{
    console.log('Server is up on port'+port)
})

