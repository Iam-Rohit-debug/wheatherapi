//jshint esversion:6


const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

});
app.post("/" , function(req,res){
   const query = req.body.city;
    // console.log("post successfully");
     
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=6550f44f94f161698e76d9c63a660407&units=metric";
https.get(url,function(response){

 response.on("data",function(data){
     const wheatherData = JSON.parse(data);
     const temp = wheatherData.main.temp;
     const description = wheatherData.weather[0].description;
     const iconCode = wheatherData.weather[0].icon;
     const imageUrl =  "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
     res.write("<p> The Weather is Currently " + description + "</p>");
     res.write("<h2>The current temperature are " + temp + " Degree celsius </h2>");
     res.write("<img src="+ imageUrl + ">");
     res.send();
     
 })
})
});

app.listen("3000",function(){
    console.log("sever is live");
});

 