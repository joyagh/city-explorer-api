const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

require("dotenv").config();
const apiKey = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT;
const movieKey = process.env.MOVIE_API_KEY;

const data = require("./data/weather.json");

class Forecast {
  constructor(valid_date, description) {
    this.date = valid_date;
    this.description = description;
  }
}
const proofOfLife = (request, response) => {
  response.send("City Explorer!");
}
app.get("/", proofOfLife);

app.get("/weather", async (request, response) => {
     // http://localhost:4001/weather

  try {
    let result = data.find((city) =>
        city.city_name === request.query.searchQuery);

    if (result) {
    let dates = result.data.map((day) => {
      let forecast = new Forecast(day.valid_date, day.weather.description);
      // console.log(day);
      return forecast;
    });
    response.send(dates);
  } else {
    response.status(404).send({ error: "City not found." });
  }
  } catch (error) {
    response.status(500).send({error: "An error has occured"});
  }
});
// app.get("./movies" (request, response) => {

// })

// "city_name": "Seattle",
//      "lon": "-122.33207",
//      "timezone": "America/Los_Angeles",
//      "lat": "47.60621",

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
