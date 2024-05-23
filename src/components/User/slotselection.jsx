import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';


const SlotSelection = () => {
    const [value, onChange] = useState(new Date());

  return (
    <div>
      <header>
        <h1 className='font-bold text-3xl'>React Calendar</h1>
      </header>
      <div>
        <main className='font-semibold mt-5 w-96'>
          <Calendar onChange={onChange} showWeekNumbers value={value} />
        </main>
      </div>
    </div>
  );
}

export default SlotSelection