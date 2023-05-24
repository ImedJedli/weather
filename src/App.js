import React, { useState } from "react";
import axios from "axios";

import { GoogleMap , LoadScript , Marker} from "@react-google-maps/api"

function App() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const api = {
    key: "3636909987824359b74479e765d1c6a3",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [mapCenter , setMapCenter] = useState({lat : 0, lng: 0})

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setMapCenter({lat :result.coord.lat, lng : result.coord.lon})
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>

              <div className="weather"> {weather.weather[0].main}</div>
            </div>
            <div style={{height : "400px" , width:"100%"}}>
            <LoadScript googleMapsApiKey="AIzaSyDDO2Em81WP6gZ9g1UhUnNXJjdYAXfoSHU">
            <GoogleMap
                  center={mapCenter}
                  zoom={10}
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                >
                <Marker position={mapCenter} />
                </GoogleMap>
            </LoadScript>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
