const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
const proofOfLife = (request, response) => {
  response.send("City Explorer!");
};
app.get("/", proofOfLife);

app.get("/weather", async (request, response) => {
  // http://localhost:4001/weather?lon=-122.33207&lat=47.60621
  console.log(request.query);
  try {
    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&days=16&lat=${request.query.lat}&lon=${request.query.lon}`
    );
    
    if (weatherData) {
      /* let dates = []
      for (let i = 0; i < 10; i++){
        dates.push(new Forecast(weatherData.data.data[i].datetime, weatherData.data.data[i].weather.description))
      }
      */
      let dates = weatherData.data.data.map((day) => {
        let forecast = new Forecast(day.datetime, day.weather.description);
        // console.log(day);
        return forecast;
      });
      console.log(dates);
      response.send(dates);
    } else {
      response.status(404).send({ error: "City not found." });
    }
  } catch (error) {
    response.status(404).send({ error: "City not found." });
  }
});
// app.get("/movies" (request, response) => {

// })

// "city_name": "Seattle",
//      "lon": "-122.33207",
//      "timezone": "America/Los_Angeles",
//      "lat": "47.60621",

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
