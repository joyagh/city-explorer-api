const axios = require("axios");

class Forecast {
     constructor(valid_date, description) {
       this.date = valid_date;//? use datetime?
       this.description = description;
       //? this.datetime = datetime;
     }
   }
//? cityName variable; event target
 const weatherHandler = async (request, response) => {
     try {
     const apiKey = process.env.WEATHER_API_KEY;
     console.log(request.query);

       const weatherData = await axios.get(
         `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&days=16&lat=${request.query.lat}&lon=${request.query.lon}`
         );
         
         if (weatherData.data && weatherData.data.data.length > 0) {
              let dates = [];
             for (let i = 0; i < 10; i++){
               dates.push(new Forecast(weatherData.data.data[i].valid_date, weatherData.data.data[i].weather.description));//? add .datetime
         } 
           console.log(dates);
           response.status(200).send(dates);
         } else {
           response.status(404).send({ error: "City not found." });
         }
       } catch (error) {
         response.status(404).send({ error: "City not found." });
       }
     };
          module.exports = weatherHandler