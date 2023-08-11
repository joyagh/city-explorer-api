const axios = require("axios");

class Movie {
  constructor(title, overview, vote_average, vote_count, popularity, release_date, poster_path) {
    this.title = title;
    this.description = overview;
    this.avgVotes = vote_average;
    this.totalVotes = vote_count;
    this.popularity = popularity;
    this.releaseDate = release_date;
    this.imgUrl = poster_path;
  }
}

const moviesHandler = async (request, response) => {
  let location = request.query.location;
  try {
    const movieKey = process.env.MOVIE_API_KEY;
    console.log(request.query);

    const movieData = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${location}`
    ); //? city name
    //? let movies = [];
    //? if statement
    const result = movieData.data.results.map(
      (movie) => {
           let newMovie=  new Movie(
               movie.title, 
               movie.overview,
               movie.vote_average,
               movie.vote_count,
               movie.popularity, 
               movie.release_date,
               "https://image.tmdb.org/t/p/w500" + movie.poster_path,
               );
               console.log(newMovie);
               return newMovie;
        }
        
     );
    response.status(200).send(result);
  } catch (error) {
    response.status(404).send({ error: "No movies found." });
  }
};

module.exports = moviesHandler;

