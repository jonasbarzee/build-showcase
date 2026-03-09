import React, { useState, useEffect } from "react";

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const mockWeatherResponses = [
                    { temp: 72, condition: 'Sunny', icon: "🌤" },
                    { temp: 36, condition: 'Snowy', icon: "🌨" },
                    { temp: 53, condition: 'Cloudy', icon: '⛅' }
                ];

                const randomWeather = mockWeatherResponses[Math.floor(Math.random() * mockWeatherResponses.length)];

                setWeather(randomWeather);
            } catch (error) {
                console.error("Weather service failed", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, []);

    return { weather, loading };
}
