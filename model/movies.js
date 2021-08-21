const axios = require('axios');
module.exports =getmoviesData;



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