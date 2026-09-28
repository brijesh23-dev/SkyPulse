import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./SearchBox.css";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "4832a84a2a06db19bb9e1eb30c3d3a23";

export default function SearchBox({ updateInfo, setLoading, setError }) {
  const [city, setCity] = useState("");

  const fetchWeather = async (params) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}?${params}&appid=${API_KEY}&units=metric`);
      if (!res.ok) throw new Error("City not found. Please try again.");
      const data = await res.json();
      updateInfo({
        city: data.name,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        windSpeed: data.wind?.speed,
        country: data.sys?.country,
        icon: data.weather[0].icon,
        visibility: data.visibility,
        pressure: data.main.pressure,
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    await fetchWeather(`q=${city.trim()}`);
    setCity("");
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        fetchWeather(`lat=${coords.latitude}&lon=${coords.longitude}`),
      () => setError("Unable to retrieve your location.")
    );
  };

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <SearchIcon className="search-icon-left" />
          <input
            type="text"
            className="search-input"
            placeholder="Search city…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <span>Go</span>
          </button>
        </div>
      </form>
      <button className="geo-btn" onClick={handleGeolocate} title="Use my location">
        <MyLocationIcon style={{ fontSize: 18 }} />
        <span>My Location</span>
      </button>
    </div>
  );
}