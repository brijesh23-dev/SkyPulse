import "./WeatherCard.css";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const WEATHER_EMOJI = {
  clear: "☀️",
  sun: "☀️",
  cloud: "☁️",
  rain: "🌧️",
  drizzle: "🌦️",
  thunder: "⛈️",
  storm: "🌩️",
  snow: "❄️",
  sleet: "🌨️",
  fog: "🌫️",
  mist: "🌫️",
  haze: "🌫️",
  smoke: "💨",
  tornado: "🌪️",
  default: "🌤️",
};

function getWeatherEmoji(description = "") {
  const d = description.toLowerCase();
  for (const [key, emoji] of Object.entries(WEATHER_EMOJI)) {
    if (d.includes(key)) return emoji;
  }
  return WEATHER_EMOJI.default;
}

function StatCard({ icon, label, value, unit, accent }) {
  return (
    <div className="stat-card" style={{ "--accent": accent }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">
          {value !== undefined && value !== null ? (
            <>
              {typeof value === "number" ? value.toFixed(1) : value}
              {unit && <span className="stat-unit"> {unit}</span>}
            </>
          ) : (
            <span className="stat-na">N/A</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default function WeatherCard({ info, loading }) {
  const emoji = getWeatherEmoji(info.weather);
  const tempRounded = Math.round(info.temp);
  const feelsRounded = info.feels_like != null ? Math.round(info.feels_like) : null;

  return (
    <div className={`weather-card ${loading ? "card-loading" : "card-visible"}`}>
      {loading && (
        <div className="card-spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* ── Hero section ── */}
      <div className="card-hero">
        <div className="hero-location">
          <LocationOnIcon style={{ fontSize: 16 }} />
          <span>{info.city}{info.country ? `, ${info.country}` : ""}</span>
        </div>

        <div className="hero-center">
          {info.icon ? (
            <img
              className="weather-icon-img"
              src={`https://openweathermap.org/img/wn/${info.icon}@4x.png`}
              alt={info.weather}
            />
          ) : (
            <span className="weather-emoji">{emoji}</span>
          )}
          <div className="hero-temp-block">
            <span className="hero-temp">{tempRounded}</span>
            <span className="hero-deg">°C</span>
          </div>
        </div>

        <p className="hero-description">{info.weather}</p>

        <div className="hero-hi-lo">
          <span className="hi-lo-item hi">
            <ArrowUpwardIcon style={{ fontSize: 14 }} />
            {info.tempMax != null ? Math.round(info.tempMax) : "—"}°
          </span>
          <div className="hi-lo-divider" />
          <span className="hi-lo-item lo">
            <ArrowDownwardIcon style={{ fontSize: 14 }} />
            {info.tempMin != null ? Math.round(info.tempMin) : "—"}°
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="card-divider" />

      {/* ── Stats grid ── */}
      <div className="stats-grid">
        <StatCard
          icon={<ThermostatIcon style={{ fontSize: 20 }} />}
          label="Feels Like"
          value={feelsRounded}
          unit="°C"
          accent="#f87171"
        />
        <StatCard
          icon={<WaterDropIcon style={{ fontSize: 20 }} />}
          label="Humidity"
          value={info.humidity}
          unit="%"
          accent="#60a5fa"
        />
        <StatCard
          icon={<AirIcon style={{ fontSize: 20 }} />}
          label="Wind"
          value={info.windSpeed}
          unit="m/s"
          accent="#34d399"
        />
        <StatCard
          icon={<DeviceThermostatIcon style={{ fontSize: 20 }} />}
          label="Pressure"
          value={info.pressure}
          unit="hPa"
          accent="#fbbf24"
        />
        <StatCard
          icon={<VisibilityIcon style={{ fontSize: 20 }} />}
          label="Visibility"
          value={info.visibility != null ? (info.visibility / 1000) : undefined}
          unit="km"
          accent="#a78bfa"
        />
        <StatCard
          icon={<CompressIcon style={{ fontSize: 20 }} />}
          label="Condition"
          value={info.weather ? info.weather.charAt(0).toUpperCase() + info.weather.slice(1) : undefined}
          accent="#f472b6"
        />
      </div>
    </div>
  );
}