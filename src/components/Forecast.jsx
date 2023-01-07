import React from 'react'
import { iconUrlFromResult } from '../services/weatherService'

function Forecast({title, items}) {
  return (
    <div>
        <div className='flex items-center justify-start my-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-1'/>
        <div className='flex flex-row items-center justify-between text-white my-1'>
          {items.map((item) => (
            <div className='flex flex-col items-center justify-center'>
            <p className='font-medium text-sm my-2'>{item.title}</p>
            <img src={iconUrlFromResult(item.icon)} alt=""/>
            <p className='font-medium'>{`${item.temp.toFixed()}`}°</p>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Forecast;