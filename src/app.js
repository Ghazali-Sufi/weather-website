const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// We are telling express which templating engine we installed. => and that's views engine
// Set allows you to set a value for a given express setting
// That means, i need view engine that's called hbs 



// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Ghazali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed Ghazali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mohamed Ghazali'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
       return res.send({
            error: 'address must be provided!!'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if (error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude , (error, forecastData) => {
            if (error){
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohamed Ghazali',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohamed Ghazali',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})