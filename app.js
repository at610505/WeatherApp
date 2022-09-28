const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/index.html", (req, res) => {
    var Name = String(req.body.city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+Name+"&units=metric&appid=f12396abffc6a28dc73972629573aea4";
    https.get(url,(response)=>{
      response.on("data",(data)=>{
          const weatherData = JSON.parse(data);
          const city = weatherData.name;
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
  
          res.write("<p1>Current weather in "+city+" is "+weatherDescription+" </p>");
          res.write("<h1>The temperature in "+city+" is " +temp +" degree celcius</h1>");
          res.write("<img src='"+icon+"' alt = 'weatherIcon'>");
          res.send();
      })
  })
  



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});

