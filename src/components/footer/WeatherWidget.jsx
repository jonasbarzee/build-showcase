import React from 'react';
import { useWeather } from '@src/hooks/useWeather';


export function WeatherWidget() {

    const { weather, loading } = useWeather();

    return (

        <div className='weather-widget'>
            {loading ? (<span>Detecting local climate...</span>
            ) : (
                <span>Weather: {weather.temp}C&#176;</span>)}
        </div>
    );
}


