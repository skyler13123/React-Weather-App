function Body(props) {
    const [settings, setSettings] = React.useState({
        'tempCelsius': true,
        'displayTemp': true,
        'displayWind': true,
        'displayHumidity': true
    });
    const [weatherObj, setWeatherObj] = React.useState(null);

    React.useEffect(() => {
        if (props.selectedCity) {
            const Weather_API_key = '6b9ee5f9edbf0469243e280ab4f5d256';
            const url = 'https://api.openweathermap.org/data/2.5/forecast';
            const { lat, lon } = props.selectedCity;
            
            fetch(`${url}?lat=${lat}&lon=${lon}&appid=${Weather_API_key}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setWeatherObj(data);
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                });
        }
    }, [props.selectedCity]);

    const handleSettingsChange = (settingsUpdate) => {
        setSettings({ ...settings, ...settingsUpdate });
    };

    return (
        <div className="container p-3 bg-secondary bg-gradient">
            {weatherObj && (
                <h4>{weatherObj.city.name} - {weatherObj.city.country}</h4>
            )}
            <div className='row'>
                <div className='col'>
                    {weatherObj && (
                        <div>
                            {weatherObj.list.slice(0,4).map((item, index) => (
                                <WeatherItem 
                                    key={index} 
                                    data={item} 
                                    settings={settings} 
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className='col'>
                    <Settings settings={settings} settingsChangeHandler={handleSettingsChange} />
                </div>
            </div>
            <div className='row'>
                {weatherObj && <Graph data={weatherObj} dayIndex={0} settings={settings} />}
            </div>
        </div>
    );
}