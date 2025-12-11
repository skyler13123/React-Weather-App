function Graph(props) {
    React.useEffect(() => {
        const data = props.data;
        const temp_min = [];
        const temp_max = [];
        const temp_time = [];
        const startIndex = props.dayIndex * 8;
        const endIndex = (props.dayIndex + 1) * 8 - 1;

        const convertToFahrenheit = (celsius) => {
            return (celsius * 9/5) + 32;
        };

        data.list.forEach((sample, index) => {
            if (index < startIndex || index > endIndex) return;
            const d = new Date(sample.dt * 1000);
            
            const minTemp = props.settings.tempCelsius ? sample.main.temp_min : convertToFahrenheit(sample.main.temp_min);
            const maxTemp = props.settings.tempCelsius ? sample.main.temp_max : convertToFahrenheit(sample.main.temp_max);

            temp_min.push(minTemp);
            temp_max.push(maxTemp);
            temp_time.push(d.toLocaleTimeString());
        });

        const myChart = new Chart("myChart", {
            type: "line",
            data: {
                labels: temp_time,
                datasets: [{
                    data: temp_min,
                    borderColor: "blue",
                    fill: false,
                }, {
                    data: temp_max,
                    borderColor: "red",
                    fill: false,
                }],
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                return value + (props.settings.tempCelsius ? ' C' : ' F');
                            }
                        }
                    }]
                }
            },
        });

        
        return () => myChart.destroy();
    }, [props.data, props.dayIndex, props.settings.tempCelsius]);

    return (
        <div className="p-3 my-5 bg-danger-subtle">
            <h4>Hourly Temperature data</h4>
            <canvas id="myChart" style={{ width: '90%', maxWidth: 600 }}></canvas>
        </div>
    );
}