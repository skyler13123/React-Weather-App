function Main() {
    
    const [selectedCity, setSelectedCity] = React.useState(null);

    const handleCitySelect = (cityData) => {
        setSelectedCity(cityData);
    };

    return (
        <div className="container ">
            <h2 className='m-3'>My React Weather Application</h2>
            <Search onCitySelect={handleCitySelect} />
            <hr />
            <Body selectedCity={selectedCity} />
        </div>
    );
}