import React, {useState} from "react";
import axios from "axios";
import WeatherTemperature from "./WeatherTemperature";
import WeatherForecast from "./WeatherForecast";
import "@fontsource/oswald"; // Defaults to weight 400

export default function Weather(props) {
    let [exist, setExist] = useState(false);
    let [city, setCity] = useState(props.city);
    let [weather, setWeather] = useState("");

    function getWeatherDetails(response) { 
        const timestamp = Date.now(); // This would be the timestamp you want to format
        const currentDate = new Intl.DateTimeFormat('en-US', {weekday: 'long', hour: '2-digit', minute: '2-digit'}).format(timestamp);
        setExist(true);
        setWeather({  
            newcity : response.data.name,
            icon : response.data.weather[0].icon,
            temperature : Math.round(response.data.main.temp),
            description : response.data.weather[0].description,
            date : currentDate,
            humidity : response.data.main.humidity,
            wind : Math.round(response.data.wind.speed),
            lon : response.data.coord.lon,
            lat : response.data.coord.lat
        });   
    }

    function updateCity(e) {
        e.preventDefault();
        setCity(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        search();
    }

    function search(e) {
        let apiKey = `b35c686ba9565ba0ab254c2230937552`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(url).then(getWeatherDetails);
    }
    
    if (exist){
    return (
        <div>
            <header>
        <form id="weather-search-form" onClick={handleSubmit}>
          <input
            type="search"
            id="search-input"
            className="search-input"
            placeholder="Enter a city"
            onChange={updateCity}
            required
          />
          <input type="submit" value="Search" className="search-submit" />
        </form>
        </header>
      <main>
        <div className="current-city">
          <h1 className="search-city" id="search-city">
            {weather.newcity}
          </h1>
        <WeatherTemperature temperature={weather.temperature} icon={weather.icon}/>         
          <p className="search-date">
            <span id="search-now">{weather.date}</span>,{" "}<span className="search-condition">{weather.description}</span>
          </p>
          <p className="search-description">
            Humidity:
            <span className="current-weather">
              {weather.humidity}
              <span id="search-humidity"></span>%
            </span>
            , Wind:
            <span className="current-weather">
              {weather.wind}
              <span id="search-wind"></span>km/h
            </span>
          </p>
        </div>
        <div className="weather-forecast-border">
            <WeatherForecast lat={weather.lat} lon={weather.lon}/>
        </div>
      </main>
        </div>
    );
    } else {
        search();
        return "Loading the page";  
    }
}