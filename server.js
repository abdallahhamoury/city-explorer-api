'use strict';

const express = require('express');

require('dotenv').config

const server = express();

const PORT = process.env.PORT;

const witherData = require('./data/weather.json')


const cors = require('cors')

const cityData = require('./data/weather.json');

server.use(cors());



class Forcast {
    constructor(description, validDate) {
        this.description = description;
        this.valid_date = validDate;
    }
}

server.get('/getWitherData', (request, response) => {
    let cityName = request.query.searchQury

    let citylocation = cityData.find(item => {
        if (item.city_name == cityName) {
            return item.data
        }
    })

    let newArr = []

    citylocation.data.forEach(element => {

        let newObjict = new Forcast(element.weather.description, element.valid_date)
        newArr.push(newObjict)

    });
    response.send(witherData)
})

server.get('/', (request, response) => {
    response.send('HOME ROUT')
})


server.get('/test', (request, response) => {
   console.log('hi');
    response.send('¯\_( ͡❛ ͜ʖ ͡❛)_/¯')
})

server.get('*', (request, response) => {
    response.status(404).send('NOT FOUND')
})

server.listen(PORT, () => {
    console.log(`Listning On PORT ʕ•́ᴥ•̀ʔっ  ${PORT} ✅ `)
})