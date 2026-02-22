import React, { useEffect, useState } from 'react'

function Weather({ forecast = [] }) {
  if (!forecast.length) {
    return (
      <p className="text-white text-center mt-10">
        Loading weather data...
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 mx-5 mb-10">
      <div className="flex gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col border border-white/40 backdrop-blur-xs rounded p-4 items-center text-white"
          >
            <p>{day.condition}</p>
            <img
              src={`/${day.condition}.png`}
              alt={day.condition}
              className="w-20 h-20"
            />
            <h2 className="font-medium">{day.date}</h2>
            <p>🌡 {day.temperature.min}°F - {day.temperature.max}°F</p>
            <p>💧 Humidity: {day.humidity}%</p>
            <p>🌬 Wind: {day.wind_speed} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather
