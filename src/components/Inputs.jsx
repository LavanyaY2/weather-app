import React from 'react'
import {useState} from "react";
import { MdLocationOn } from "react-icons/md";
import { MdSearch } from "react-icons/md";

function Inputs({setQuery, units, setUnits}) {

  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if(city !== '') setQuery({q:city});
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery(({lat, lon}));
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  return (
    <div className='flex flex-row justify-center my-10'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            placeholder="Search.." 
            className='text-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-lg h-10'/>
        </div>
        <MdSearch size={25} className="text-white h-10 mx-2 cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}/>
        <MdLocationOn size={25} className="text-white h-10 mx-2 cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='text-xl mx-1 text-white font-medium cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitsChange}>°C</button>
            <p className='text-xl text-white mx-1 font-medium'>|</p>
            <button name='imperial' className='text-xl mx-1 text-white font-medium cursor-pointer transition ease-out hover:scale-125' onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  );
  
}

export default Inputs;