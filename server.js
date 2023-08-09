const express = require("express");
const cors = require("cors");
const axios = require("axios");
const {proofOfLife} = require("./controllers");
const { weatherHandler } = require("./controllers/weather");



const app = express();
app.use(cors());

require("dotenv").config();
const apiKey = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT;
const movieKey = process.env.MOVIE_API_KEY;

// const data = require("./data/weather.json");

class Forecast {
  constructor(valid_date, description) {
    this.date = valid_date;
    this.description = description;
  }
}
//TODO Create movie class; title, image, description

app.get("/", proofOfLife);

  
app.get("/weather", weatherHandler);


app.get("./movies", moviesHandler);


//  const movieData = await axios.get("url")

//   movies.filter((movie) => {
//    if (movie.title.includes("word")){
//       movieData.push(movie.title)
//    }
   
// })
// use includes instead of if statement
// use return instead of push.
// Comm
// Make query string
//  url = https://api.themoviedb.org/3/search/movie




// "city_name": "Seattle",
//      "lon": "-122.33207",
//      "timezone": "America/Los_Angeles",
//      "lat": "47.60621",

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
