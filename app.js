// Tutorial by http://youtube.com/CodeExplained
//https://www.youtube.com/watch?v=KqZGuzrY9D4
// api key : 82005d27a116c2880c8f0fcb866998a0
//alert('aaa');
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
//http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d04cfa1a84d9929fbdb0c39c8a3cd2b1

//checks if browser support geo-locations
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//set users position
function setPosition(position){
    let latitude = Math.floor(position.coords.latitude);
    let longitude = Math.floor(position.coords.longitude);
    getWeather(latitude, longitude);
}

//show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}
//get weather from API provider
function getWeather(latitude, longitude){
    let api = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}${key}`;

    //console.log(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        
        .then(function(data){
            //alert(data->main);
            //alert('hhh');
            //weather.temperature.value = Math.floor(data.main.temp -kELVIN);
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);

            weather.description = data.weather[0].icon;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country

        })
        .then(function(){
                displayWeather();
        })
    }

    //display weather to UI
    function displayWeather(){
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
        tempElement.innerHTML = `${weather.temperature.value} <span>C</span>`; 
        descElement.innerHTML = `${weather.description}`; 
        locationElement.innerHTML = `${weather.city}, ${weather.country}`; 
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