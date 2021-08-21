const axios = require('axios');
module.exports = getWeatherData;


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



class Forcast {
    constructor(obj) {
        this.description = `Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description}`
        this.valid_date = obj.valid_date;
    }
}
