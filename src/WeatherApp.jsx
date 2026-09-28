import WeatherCard from "./WeatherCard";
import SearchBox from "./SearchBox";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Gujarat",
    temp: 45.56,
    humidity: 34.45,
    tempMax: 35.67,
    tempMin: 10.45,
    weather: "haze",
    feels_like: 45.67,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateInfo = (result) => {
    setWeatherInfo(result);
  };

  return (
    <div className={`app-wrapper ${getWeatherTheme(weatherInfo.weather, weatherInfo.temp)}`}>
      {/* Animated background orbs */}
      <div className="bg-orb orb1"></div>
      <div className="bg-orb orb2"></div>
      <div className="bg-orb orb3"></div>

      <div className="app-container">
        <header className="app-header">
          <div className="app-logo">
            <span className="logo-icon">🌤</span>
            <div>
              <h1 className="app-title">SkyPulse</h1>
              <p className="app-subtitle">Live Weather Intelligence</p>
            </div>
          </div>
        </header>

        <SearchBox
          updateInfo={updateInfo}
          setLoading={setLoading}
          setError={setError}
        />

        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
          </div>
        )}

        <WeatherCard info={weatherInfo} loading={loading} />
      </div>
    </div>
  );
}

function getWeatherTheme(weather, temp) {
  const w = (weather || "").toLowerCase();
  if (w.includes("rain") || w.includes("drizzle") || w.includes("shower"))
    return "theme-rain";
  if (w.includes("snow") || w.includes("sleet") || w.includes("blizzard"))
    return "theme-snow";
  if (w.includes("thunder") || w.includes("storm"))
    return "theme-storm";
  if (w.includes("fog") || w.includes("mist") || w.includes("haze"))
    return "theme-haze";
  if (w.includes("cloud") || w.includes("overcast"))
    return "theme-cloud";
  if (temp > 35) return "theme-hot";
  return "theme-clear";
}