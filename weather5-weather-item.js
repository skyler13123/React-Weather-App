function WeatherItem({ data, settings }) {
    const dt = data && (new Date(data.dt * 1000)).toLocaleTimeString();

    const convertToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    };

    const temp = settings.tempCelsius ? 
        data.main.temp.toFixed(2) + 'C' : 
        convertToFahrenheit(data.main.temp).toFixed(2) + 'F';
        
    const feelsLikeTemp = settings.tempCelsius ? 
        data.main.feels_like.toFixed(2) + 'C' : 
        convertToFahrenheit(data.main.feels_like).toFixed(2) + 'F';

    return (
        <div className="container p-3 text-bg-secondary mb-3">
            {data &&
                <li>
                    {dt} -
                    {settings.displayTemp && `Temperature ${temp}, Feels Like ${feelsLikeTemp}`}
                    {settings.displayHumidity && ` - Humidity ${data.main.humidity}%`}
                    {settings.displayWind && ` - Wind Speed ${data.wind.speed}`}
                </li>
            }
        </div>
    );
}