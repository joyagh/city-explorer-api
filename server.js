const express = require("express");
const cors = require("cors");
const axios = require("axios");
const proofOfLife  = require("./controllers");
const weatherHandler  = require("./controllers/weather");
const moviesHandler  = require("./controllers/movies"); // Weather Handler is in an object of weather file, must use {}.

const app = express();
app.use(cors());
//TODO app.use routes; create routes folder
require("dotenv").config();
const PORT = process.env.PORT;
//? const apiKey = process.env.WEATHER_API_KEY; // remove from server.js
//? const movieKey = process.env.MOVIE_API_KEY; // remove from server.js


app.get("/weather", weatherHandler);

app.get("/movies", moviesHandler);

app.get("/", proofOfLife);
app.listen(PORT, () => {
  console.log(`${PORT}`);
});
