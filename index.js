const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city from the html form, display in // console. Takes in as string.

        var lat = String(req.body.latInput);
        console.log(req.body.latInput);
        
        var long = String(req.body.longInput);
        console.log(req.body.longInput);

    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "641cb52b57932fde2fd10a671a6c6538";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            //const temp = weatherData.main.temp;
            //const windDirect = weatherData.wind.deg; 
            const windSpeed = weatherData.wind.speed;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2> The Minimum Temperature is " + minTemp + "Degrees Fahrenheit" + "<h2>");
            res.write("<h3> The Maximum Temperature is " + maxTemp + "Degrees Fahrenheit" + "<h3>");
            res.write("<h4> The Wind Speed is " + windSpeed + "Miles per hour" + "<h4>");
             res.write("<h5> The Wind Direction is " + windDirect + "Degrees" + "<h5>");
          
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3001, function() {
console.log ("Server is running on port")
});