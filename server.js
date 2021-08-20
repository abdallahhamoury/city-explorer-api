'use strict';

const express = require('express');

const cors = require('cors');

require('dotenv').config();

const axios = require('axios');

const server = express();

server.use(cors());

const PORT = process.env.PORT;



server.get('/', (request, response) => {
    response.send('HOME ROUT')
});


class Forcast {
    constructor(obj) {
        this.description = `Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`
        this.valid_date = obj.valid_date;
    }
}


// http://localhost:3001/weather?lat=43&lon=42
server.get('/weather', getWeatherData);


async function getWeatherData(req, res) {

    let cityName = req.query.cityName
    let cityLat = req.query.lat
    let cityLon = req.query.lon
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WITHER_KEY}&lat=${cityLat}&lon=${cityLon}&days=5`;

    try {
        console.log('hi');
        let witherData = await axios.get(weatherUrl);
        let weatherArr = witherData.data.data.map(obj => {
            return new Forcast(obj);
        })
        res.send(weatherArr);

    }
    catch (error) {

        console.log('error from axios', error);
        res.send(error)

    }

}

class Moveis {
    constructor(elem) {
        this.title = elem.title;
        this.date = elem.release_date;
        this.overview = elem.overview;
        this.vote = elem.vote_count;
        this.avgVote = elem.vote_average;
        this.src = `https://image.tmdb.org/t/p/original${elem.poster_path}`;
    }
}


// http://localhost:3001/movies?cityName=amman
server.get('/movies', getmoviesData);


async function getmoviesData(req, res) {

    let cityName = req.query.cityName

    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${cityName}&include_adult=false`;

    try {
        console.log('hello');
        let  moviesData = await axios.get(moviesUrl);
        let moviesArr =  moviesData.data.results.map(obj => {
            return new Moveis(obj);
        })
        res.send(moviesArr);

    }
    catch (error) {

        console.log('error from axios', error);
        res.send(error)

    }

}




server.get('/test', (request, response) => {
    response.send('¯\_( ͡❛ ͜ʖ ͡❛)_/¯')
})

server.get('*', (request, response) => {
    response.status(404).send('NOT FOUND')
})

server.listen(PORT, () => {
    console.log(`Listning On PORT ʕ•́ᴥ•̀ʔっ  ${PORT} ✅ `)
})