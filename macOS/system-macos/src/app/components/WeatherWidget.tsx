"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: [
      {
        hour: Array<{
          time: string;
          temp_c: number;
          condition: {
            icon: string;
            text: string;
          };
        }>;
        day: {
          maxtemp_c: number; // Add maxtemp_c and mintemp_c
          mintemp_c: number;
        };
      }
    ];
  };
}

const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('Lviv');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=dcc92e9cd9d14cb9813192013242905&q=${city}&days=1&aqi=no&alerts=no`
        );
        console.log(response.data);  // Log the response data for debugging
        setWeather(response.data);
      } catch (err) {
        console.error(err);  // Log the error for debugging
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <Draggable>
      <div className="max-w-sm w-80 mx-auto p-4 bg-gray-900 text-white shadow-lg rounded-lg ">
        <div className="mb-4">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="w-full px-3 py-2 mb-4 bg-gray-800 border border-gray-600 rounded-md text-white"
            placeholder="Enter city"
          />
        </div>

        {loading && <div className="text-center">Loading...</div>}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {weather && (
          <div className="text-center">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">{weather.location.name}</h2>
                <div className="text-5xl font-bold">{weather.current.temp_c}°</div>
              </div>
              <div>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <div>{weather.current.condition.text}</div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <div>Max t°: {weather.forecast.forecastday[0].day.maxtemp_c}°C</div>
                <div>Min t°: {weather.forecast.forecastday[0].day.mintemp_c}°C</div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {weather.forecast.forecastday[0].hour.map((hourData, index) => (
                <div key={index} className="text-center mx-2">
                  <div>{hourData.time.split(' ')[1]}</div>
                  <img src={hourData.condition.icon} alt={hourData.condition.text} className="mx-auto" />
                  <div>{hourData.temp_c}°</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default WeatherWidget;
