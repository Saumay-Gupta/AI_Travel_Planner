import React from 'react'

function Weather({ forecast = [] }) {
  if (!forecast.length) {
    return (
      <p className="text-white text-center text-lg font-medium">
        Loading weather data…
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 bg-black/40 backdrop-blur-md rounded-xl py-6">
      <h2 className="text-sm font-bold text-white/70 tracking-widest uppercase mb-2">
        Weather Forecast
      </h2>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="min-w-[160px] flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white"
          >
            <p className="text-sm font-semibold mb-2">{day.condition}</p>
            <img
              src={`/${day.condition}.png`}
              alt={day.condition}
              className="w-14 h-14 mb-2"
            />
            <h3 className="font-bold text-sm">{day.date}</h3>
            <p className="text-xs mt-1">
              🌡 {day.temperature.min}°C – {day.temperature.max}°C
            </p>
            <p className="text-xs">💧 {day.humidity}%</p>
            <p className="text-xs">🌬 {day.wind_speed} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather
