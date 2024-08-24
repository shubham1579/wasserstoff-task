import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./components/Forecast";
import SearchBar from "./components/SearchBar";

const App = () => {
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const DateNDays = () => {
    const months = [
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
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  //new search function
  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const API_KEY = "02028412ad2bcb844f5171f40a1d3b41";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      await axios
        .get(url)
        .then((res) => {
          console.log("res", res.data);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "02028412ad2bcb844f5171f40a1d3b41";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=Varanasi&appid=${API_KEY}&units=metric`;

      try {
        const res = await axios.get(url);
        console.log(res.data);
        
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">

      {/* SearchBar component */}
      <SearchBar city={city} setCity={setCity} search={search} />

      {weather.loading && (
        <>
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <Forecast weather={weather} toDate={DateNDays} />
      )}
    </div>
  );
}

export default App;
