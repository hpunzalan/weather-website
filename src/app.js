const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PORT = process.env.PORT || '3000'

const app = express()

app.set("port", PORT)

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hazelle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hazelle'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Hazelle'
    })
})

// req contains the information from the request

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
         
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search);

        res.send({
            products: []
        })
    }
})

app.get('/about/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Hazelle',
        message: 'Page not found'})
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Hazelle',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(PORT, () => {
    console.log('Server is up on port')
})