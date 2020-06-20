// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//select element
const iconElement =document.querySelector(".weather-icon");
const tempElement =document.querySelector(".temperature-value p");
const descElement =document.querySelector(".temperature-description p");
const locationElement =document.querySelector(".location p");
const notificationElement =document.querySelector(".notification");

//App data
const weather  = {};

weather.temperature ={
    unit : "celsius"
}

//App const and vars
const KELVIN = 273;

//APP keys
const key = "&appid=d04cfa1a84d9929fbdb0c39c8a3cd2b1";

//checks if browser support geo-locations
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//set users position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

   alert('hello');
    getWeather(latitude, longitude);
}

//show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style = "block";
    notificationElement.innerHTML = '<p> ${error.message}</p>';
}
//get weather from API provider
function getWeather(latitude, longitude){
    let api = 'http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&appid=${key}';
    //console.log(api);
    alert(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp -kELVIN);
            weather.description = data.weather[0].icon;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country

        })
        .then(function(){
                displayWeather();
        });
    }

    //display weather to UI
    function displayWeather(){
        iconElement.innerHTML = '<img src="icons/${weather.iconId}.png" />';
        tempElement.innerHTML = '${weather.temperature.value} <span>C</span>'; 
        descElement.innerHTML = '${weather.description}'; 
        locationElement.innerHTML = '${weather.city}, ${weather.country}'; 
    }

    // C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

===============
<!-- HTML CODE -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App : Javascript</title>
   <!-- <link rel="stylesheet" href="font/Rimouski.css"> -->
    <link rel="stylesheet" href="style.css">

</head>
<body>
        <div class="container">
            <div class="app-title">
                <p>Weather</p>
            </div>
            <div class="notification">
                <p></p>
            </div>
            <div class="weather-container">
                <div class="weather-icon">
                    <imgn src="icons/unknown.png" alt="">
                </div>
                <div class="temperature-value">
                    <p>Temp - <span>C</span> </p>
                </div>
                <div class="temperature-description">
                    <p><span>-</span></p>
                </div>
                <div class="location">
                    <p>-</p>
                </div>
            </div>


        </div>
        <script src="app.js"></script>
</body>
</html>