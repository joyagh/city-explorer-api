export const weatherHandler = async (request, response) => {
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
          let dates = weatherData.data.data.map((day, i, array) => {
            //if (i < 10)
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
     }