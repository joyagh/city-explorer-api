const express = require('express');
const cors = require ('cors');

const app = express();
app.use(cors());

require('dotenv').config(); 

const PORT = process.env.PORT;

const data = require('./data/weather.json');

app.get('/', (request, response) => {
     response.send(data);
})

app.get('/weather', (request, response) => {
     response.send(data);
})



app.listen(PORT, () => {
     console.log(`${PORT}`);
});