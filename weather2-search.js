 function Search(props) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const Weather_API_key = '6b9ee5f9edbf0469243e280ab4f5d256';

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${Weather_API_key}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data); 
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <div className="container2">
           
            <form onSubmit={handleSubmit} className='my-3 row g-3'>
                <label className="col-sm-4 col-form-label">
                    Please enter city name:
                </label>
                <div className="col-sm-4">
                    <input type="text" value={searchTerm}
                        onChange={handleChange} className="form-control" />
                </div>
                <div className="col-sm-4">
                    <input type="submit" value="Search" className="btn btn-primary" />
                </div>
            </form>
            <Select data={searchResults} onCitySelect={props.onCitySelect} />
            </div>
      
    );
}