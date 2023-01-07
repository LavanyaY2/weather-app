import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id:1,
            city: 'Toronto'
        },
        {
            id:2,
            city: 'London'
        },
        {
            id:3,
            city: 'Delhi'
        },
        {
            id:4,
            city: 'Tokyo'
        },
        {
            id:5,
            city: 'Sydney'
        },
        {
            id:6,
            city: 'New York'
        }
    ]

  return (
  <div className='flex items-center justify-around my-6'>
    {cities.map((city) => (
        <button 
            key={city.id} 
            className='text-white text-lg font-medium'
            onClick={() => setQuery({q: city.city })}>
            {city.city}
        </button>
    ))}
  </div>);
}

export default TopButtons;