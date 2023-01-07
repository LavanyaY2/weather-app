import {DateTime} from "luxon";
<script type = "text/JavaScript" src = " https://MomentJS.com/downloads/moment.js"></script>

const API_KEY = "cc38cf08b5a73d802e366d7646a03b33";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const fetchWeatherData = (typeOfInfo, searchParams) => {
    const url = new URL(BASE_URL + typeOfInfo)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    return fetch(url)
        .then((result) => result.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind:{speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, 
    name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastData = (data) => {

    let {city, list} = data;

    let sunriseTime = (city.sunrise)*1000;
    let sunsetTime = (city.sunset)*1000;

    let timezoneOffset = city.timezone;

    var moment = require('moment-timezone');
    let timezoneOffsetInMinutes = timezoneOffset/60;

    let localTime = moment(DateTime.utc().ts)
    .utcOffset(timezoneOffsetInMinutes)
    .format('ddd MMM DD Y hh:mm:ss A ');

    let sunriseLocalTime = (moment(sunriseTime)
    .utcOffset(timezoneOffsetInMinutes)
    .format('ddd MMM DD Y hh:mm:ss A ')).substring(16, 27);

    let sunsetLocalTime = (moment(sunsetTime)
    .utcOffset(timezoneOffsetInMinutes)
    .format('ddd MMM D Y hh:mm:ss A ')).substring(16, 27);

    list = list.slice(1,8).map(h => {
        let str = h.dt_txt;
        let time = str.substring(12, 16);

        return {
            title: time,
            temp: h.main.temp,
            icon: h.weather[0].icon
        }
    });

    return {list, localTime, sunriseLocalTime, sunsetLocalTime};
}

const formatWeatherData = async (searchParams) => {

    const formattedCurrentWeather = await fetchWeatherData('weather', searchParams).then(formatCurrentWeather);
    const {lat, lon} = formattedCurrentWeather;
    
    const formattedForecastData = await fetchWeatherData('forecast', {
        lat, lon, units: searchParams.units
    }).then(formatForecastData);

    return {...formattedCurrentWeather, ...formattedForecastData};
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromResult = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default formatWeatherData;

export {formatToLocalTime, iconUrlFromResult};