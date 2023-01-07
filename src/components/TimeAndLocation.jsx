import React from 'react';

function TimeAndLocation({weather: {localTime, name, country}}) {

  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-center my-6'>
            <p className='text-2xl font-medium text-white'>
                {`${localTime}`}
            </p>
        </div>
        <div className='flex flex-row items-center justify-center my-2'>
            <p className='text-3xl text-white'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  );
}

export default TimeAndLocation;