"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import './customScrollbar.css'; 

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
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    pressure_mb: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          icon: string;
          text: string;
        };
      }>;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
      };
    }>;
  };
}

type WidgetSize = 'small' | 'medium' | 'large';

const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState('Lviv');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [size, setSize] = useState<WidgetSize>('medium');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=dcc92e9cd9d14cb9813192013242905&q=${city}&days=7&aqi=no&alerts=no`
        );
        setWeather(response.data);
      } catch (err) {
        console.error(err);
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

  const handleSizeChange = (size: WidgetSize) => {
    setSize(size);
    setDropdownOpen(false);
  };

  const widgetSizes: { [key in WidgetSize]: string } = {
    small: 'w-52 h-36',
    medium: 'w-87 h-62',
    large: 'w-144 h-144', 
  };

  const calculateFontSize = (
    text: string,
    baseSize: string,
    smallThreshold: number,
    largeThreshold: number
  ): string => {
    const length = text.length;
    if (length > largeThreshold) return 'text-xs';
    if (length > smallThreshold) return 'text-sm';
    return baseSize;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const cityNameFontSize = weather
    ? calculateFontSize(
        weather.location.name,
        size === 'small' ? 'text-sm' : 'text-lg',
        12,
        18
      )
    : 'text-lg';

  const weatherDescriptionFontSize = weather
    ? calculateFontSize(
        weather.current.condition.text,
        size === 'small' ? 'text-xs' : 'text-sm',
        15,
        20
      )
    : 'text-sm';

  const temperatureFontSize: string = size === 'small' ? 'text-xl' : 'text-2xl';
  const weatherIconSize: string = size === 'small' ? 'w-10 h-10' : 'w-12 h-12';

  const responsiveTextClasses = (text: string, baseSize: string): string => {
    if (text.length < 10) return baseSize;
    if (text.length < 15) return 'text-sm';
    if (text.length < 20) return 'text-xs';
    return 'text-xs truncate';
  };

  const getBackgroundColorClass = (condition: string): string => {
    if (condition.includes('sunny')) return 'bg-sky-500';
    if (condition.includes('rain')) return 'bg-gray-700';
    if (condition.includes('cloudy') || condition.includes('mist') || condition.includes('fog')) return 'bg-slate-500';
    if (condition.includes('snow')) return 'bg-gray-100';
    return 'bg-sky-500';
  };

  const backgroundColorClass = weather ? getBackgroundColorClass(weather.current.condition.text.toLowerCase()) : 'bg-gray-900';

  return (
    <Draggable>
      <div className={`max-w-sm ${widgetSizes[size]} mx-auto p-4 ${backgroundColorClass} text-white shadow-lg rounded-lg relative`}>
        <div className="flex justify-between items-center mb-1.5">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="w-11/12 h-8 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            style={{ background: '#2d37484f' }}
            placeholder="Enter city"
          />
          <button
            className="ml-1 h-8 p-1 bg-gray-800 rounded-md"
            style={{ background: '#2d37484f' }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            &#8942;
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg z-10">
              <button className="block px-4 py-2 text-left w-full text-white hover:bg-gray-700" onClick={() => handleSizeChange('small')}>
                Small
              </button>
              <button className="block px-4 py-2 text-left w-full text-white hover:bg-gray-700" onClick={() => handleSizeChange('medium')}>
                Medium
              </button>
              <button className="block px-4 py-2 text-left w-full text-white hover:bg-gray-700" onClick={() => handleSizeChange('large')}>
                Large
              </button>
            </div>
          )}
        </div>

        {/* {loading && <div className="text-center">Loading...</div>} */}

        {/* {error && <div className="text-red-500 text-center">{error}</div>} */}

        {weather && (
          <div className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left ml-2">
                <h2 className={`font-bold ${responsiveTextClasses(weather.location.name, cityNameFontSize)} `}>{weather.location.name}</h2>
                <div className={`font-bold ${temperatureFontSize}`}>{weather.current.temp_c}°</div>
              </div>
              <div className="text-right mr-2">
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  className={`${weatherIconSize} ml-auto`}
                />
                <div className={`${responsiveTextClasses(weather.current.condition.text, weatherDescriptionFontSize)} mr-2`}>{weather.current.condition.text}</div>
              </div>
            </div>

            {size !== 'small' && (
              <>
                <div className="flex justify-between mt-4">
                  <div className="ml-2 text-sm">Max t°: {weather.forecast.forecastday[0].day.maxtemp_c}°C</div>
                  <div className="mr-2 text-sm">Min t°: {weather.forecast.forecastday[0].day.mintemp_c}°C</div>
                </div>
                <div className="flex justify-between items-center mt-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {weather.forecast.forecastday[0].hour.map((hourData, index) => (
                    <div key={index} className="text-center mx-2">
                      <div className="text-xs">{formatTime(hourData.time)}</div>
                      <img src={hourData.condition.icon} alt={hourData.condition.text} className="mx-auto w-6 h-6" />
                      <div className="text-xs">{hourData.temp_c}°</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {size === 'large' && (
              <>
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 ml-2">
                    <div className="text-left">
                      <p><strong>Sunrise:</strong> {weather.forecast.forecastday[0].astro.sunrise}</p>
                      <p><strong>Wind:</strong> {weather.current.wind_kph} kph ({weather.current.wind_dir})</p>
                      <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
                      <p><strong>Pressure:</strong> {weather.current.pressure_mb} mb</p>
                      <p><strong>Chance of rain:</strong> {weather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                    </div>
                    <div className="text-left">
                      <p><strong>Sunset:</strong> {weather.forecast.forecastday[0].astro.sunset}</p>
                      <p><strong>UV Index:</strong> {weather.current.uv}</p>
                      <p><strong>Condition:</strong> {weather.current.condition.text}</p>
                      <p><strong>Moon Phase:</strong> {weather.forecast.forecastday[0].astro.moon_phase}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Weather Forecast</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {weather.forecast.forecastday.slice(1).map((day, index) => (
                      <div key={index} className="text-center text-xs">
                        <div>{formatDate(day.date)}</div>
                        <img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto w-8 h-8" />
                        <div>{day.day.condition.text}</div>
                        <div>Max: {day.day.maxtemp_c}°C</div>
                        <div>Min: {day.day.mintemp_c}°C</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default WeatherWidget;
