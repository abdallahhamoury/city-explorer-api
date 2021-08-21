'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const server = express();
server.use(cors());
const PORT = process.env.PORT;
const getmoviesData = require('./model/movies');
const getWeatherData = require('./model/wahther');

server.get('/', (request, response) => {
    response.send('HOME ROUT')
});
// http://localhost:3001/weather?lat=43&lon=42
server.get('/weather', getWeatherData);

// http://localhost:3001/movies?cityName=amman
server.get('/movies', getmoviesData);

server.get('/test', (request, response) => {
    response.send('¯\_( ͡❛ ͜ʖ ͡❛)_/¯')
})
server.get('*', (request, response) => {
    response.status(404).send('NOT FOUND')
})
server.listen(PORT, () => {
    console.log(`Listning On PORT ʕ•́ᴥ•̀ʔっ  ${PORT} ✅ `)
})