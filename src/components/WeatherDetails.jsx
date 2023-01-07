import React from 'react'
import { BsThermometerSun } from "react-icons/bs";
import { BsDropletFill } from "react-icons/bs";
import { BsWind } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { iconUrlFromResult } from '../services/weatherService'


function WeatherDetails({
    weather: {details, icon, temp, temp_min, temp_max, sunriseLocalTime, sunsetLocalTime, speed, humidity, feels_like, timezone
}}) {
  return (
    <div>
        <div className='flex flex-row items-center justify-center text-white text-xl'>
            <p>Current Weather: </p>
            <img src={iconUrlFromResult(icon)} alt=""/>
            <p className='text-4xl'> {`${temp.toFixed()}`}°</p>
        </div>
        <div className='flex flex-row items-center justify-center my-2'>
            <p className='text-cyan-200 text-xl'>
                {details}
            </p>
        </div>
        <div className='flex flex-row items-center justify-center text-white text-md py-3'>
            <div className='flex font-light items-center justify-center mx-4'>
                <BsThermometerSun size={20} className="mr-1"/>
                Feels like: 
                <span className='font-medium ml-1'> {`${feels_like}`}°</span>
            </div>
            <p>|</p>
            <div className='flex font-light items-center justify-center mx-4'>
                <BsDropletFill size={20} className="mr-1"/>
                Humidity: 
                <span className='font-medium ml-1'> {`${humidity}`}%</span>
            </div>
            <p>|</p>
            <div className='flex font-light items-center justify-center mx-4'>
                <BsWind size={20} className="mr-1"/>
                Wind Speed: 
                <span className='font-medium ml-1'> {`${speed}`} km/h</span>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center text-white text-md py-3'>
            <div className='flex font-light items-center justify-center mx-4'>
                <WiSunrise size={25} className="mr-1"/>
                Sunrise: 
                <span className='font-medium ml-1'> {sunriseLocalTime}</span>
            </div>
            <p>|</p>
            <div className='flex font-light items-center justify-center mx-4'>
                <WiSunset size={25} className="mr-1"/>
                Sunset: 
                <span className='font-medium ml-1'> {sunsetLocalTime}</span>
            </div>
            <p>|</p>
            <div className='flex font-light items-center justify-center mx-4'>
                <BsArrowDown size={20} className="mr-1"/>
                Low: 
                <span className='font-medium ml-1'> {`${temp_min.toFixed()}`}°</span>
            </div>
            <p>|</p>
            <div className='flex font-light items-center justify-center mx-4'>
                <BsArrowUp size={20} className="mr-1"/>
                High: 
                <span className='font-medium ml-1'> {`${temp_max.toFixed()}`}°</span>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails;