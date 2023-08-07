const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT;

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

app.get("/weather", (request, response) => {
     // http://localhost:4001/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle

  try {
    let result = data.find(
      (city) =>
        city.city_name === request.query.searchQuery &&
        city.lat === request.query.lat
    );
    let dates = result.data.map((day) => {
      let forecast = new Forecast(day.valid_date, day.weather.description);
      console.log(day);
      return forecast;
    });
    response.send(dates);
  } catch (error) {
    response.status(404).send({ error: "City not found." });
  }
});

// "city_name": "Seattle",
//      "lon": "-122.33207",
//      "timezone": "America/Los_Angeles",
//      "lat": "47.60621",

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
