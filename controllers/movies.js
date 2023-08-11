const axios = require("axios");

class Movie {
  constructor(title, overview, average, total, popularity, release, poster_path) {
    this.title = title;
    this.description = overview;
    this.avgVotes = average;
    this.totalVotes = total;
    this.popularity = popularity;
    this.releaseDate = release;
    this.imgUrl = poster_path;
  }
}

const moviesHandler = async (request, response) => {
  let cityName = request.query.cityname;
  try {
    const movieKey = process.env.MOVIE_API_KEY;
    console.log(request.query);

    const movieData = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${cityName}`
    ); //? city name
    //? let movies = [];
    //? if statement
    const result = movieData.data.results.map(
      (movie) => {
          console.log(movie.original_title);
           let newMovie=  new Movie(
               movie.title, 
               movie.overview,
               movie.average,
               movie.total,
               movie.popularity,
               movie.release,
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

//   movies.filter((movie) => {
//    if (movie.title.includes("word")){
//       movieData.push(movie.title)
//    }

// })
// use includes instead of if statement
// use return instead of push.

//TODO Create movie class; title, image, description
