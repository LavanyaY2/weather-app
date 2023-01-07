import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import WeatherDetails from './components/WeatherDetails';
import formatWeatherData from './services/weatherService';
import {useEffect, useState} from "react";

function App() {

  const [query, setQuery] = useState({q: "Berlin"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async() => {
      await formatWeatherData({...query, units}).then(data => {
        setWeather(data);
      });
    };
    
    fetchWeather();
  }, [query, units]);


  const dynamicBackground = () => {
    if(!weather) return 'from-cyan-500 to-blue-600'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-500 to-blue-600'
    return 'from-rose-500 to-orange-600'
  }

  return (
    <div className="App">
      <div className={`mt-4 py-5 px-32 bg-gradient-to-br ${dynamicBackground()}`}>
      
        <TopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather}/>
            <WeatherDetails weather={weather}/>
            <Forecast title="3-Hour Forecast" items={weather.list}/>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
