const axios = require('axios');
module.exports = getmoviesData;


let moviesObject = {};
async function getmoviesData(req, res) {

    let cityName = req.query.cityName

    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${cityName}&include_adult=false`;

    if (moviesObject[cityName] !== undefined) {
        res.send(moviesObject[cityName]);
    }
    else {

        try {
            console.log('hello');
            let moviesData = await axios.get(moviesUrl);
            let moviesArr = moviesData.data.results.map(obj => {
                return new Moveis(obj);
            })
            moviesObject[cityName] = moviesArr;
            console.log('out of memory');
            res.send(moviesArr);

        }
        catch (error) {

            console.log('error from axios', error);
            res.send(error)

        }

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