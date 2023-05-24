import React, { useState } from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function App() {
  const dateBuilder = (d) => {
    // Date builder code...
  };

  const api = {
    key: "3636909987824359b74479e765d1c6a3",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [errorMessage, setErrorMessage] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === "404") {
            setErrorMessage("Invalid country name");
            setWeather({});
            setMapCenter({ lat: 0, lng: 0 });
          } else {
            setErrorMessage("");
            setWeather(result);
            setQuery("");
            setMapCenter({ lat: result.coord.lat, lng: result.coord.lon });
          }
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
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

        {Object.keys(weather).length !== 0 ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>

              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div style={{ height: "400px", width: "100%" }}>
              <LoadScript
                googleMapsApiKey="AIzaSyDDO2Em81WP6gZ9g1UhUnNXJjdYAXfoSHU"
                // Replace "YOUR_API_KEY" with your actual Google Maps API key
              >
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
          <div className="location-box">
          <div className="location">{errorMessage ? errorMessage : "Welcome"}</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
