function Select(props) {
    const [selectedCityData, setSelectedCityData] = React.useState(null);
    const [userInput, setUserInput] = React.useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setUserInput(selectedValue);

        const cityData = props.data.find(city => {
            const cityName = city.state ? `${city.name} , ${city.country} , ${city.state}` : `${city.name} , ${city.country}`;
            return cityName === selectedValue;
        });

        setSelectedCityData(cityData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (selectedCityData) {
            props.onCitySelect(selectedCityData);
        }
    };

    const cities = props.data;
    return (
        <div className="container1">
        
            <form onSubmit={handleSubmit} className=' row g-3'>
                <label className="col-sm col-form-label">
                    Choose your country:</label>
                <select value={userInput} onChange={handleSelectChange}
                    className='form-select col-md'>
                   
                    <option value="">Select Country...</option>
                    {cities.map((city, index) =>
                        <option key={city.country + index} value={city.state ? `${city.name} , ${city.country} , ${city.state}` : `${city.name} , ${city.country}`}>
                            {city.name}, {city.country} {city.state && `(${city.state})`}
                        </option>
                    )}
                </select>
                <div className="col-sm col-form-label">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
            {
                selectedCityData &&
                <div style={{ color: 'white' }}> You selected: {selectedCityData.name}, {selectedCityData.country} </div>
            }
        </div>
    );
}
