import { useState } from 'react'
import './App.css'
import Card from './components/card';
const actions = ["My task", "others'", "Today", "Tomorrow"];
const days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];



function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#1E1E1E] pt-4 gap-12 overflow-hidden">
      <div className="w-full h-[10vh] flex justify-between  px-6">
        <div className='w-1/4 h-full flex items-center justify-center font-lalezar text-3xl font-bold text-white '>
          Chorify
        </div>
        <div className='w-auto h-full flex items-center justify-center text-lg text-white'>
          R
          </div>
      </div>
      <div className='w-auto h-auto flex items-center justify-start text-2xl font-bold text-white px-6'>
        Welcome back Maryatou !
      </div>
      <div className='w-full h-auto '>
        <div className='w-full h-auto flex flex-row items-center justify-start gap-6 overflow-x-auto no-scrollbar z-10'>
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="w-full px-4 py-2 bg-gray-500 text-black rounded-full shadow hover:bg-purple-700 transition whitespace-nowrap"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      <div className='w-screen h-[65vh] flex flex-col items-center justify-start px-6'>
        <Card title="Monday" />
        <div className="relative w-full flex flex-col items-stretch mt-8 overflow-hidden">
          {days.map((day, idx) => (
            <div
              key={day}
              className={idx === 0 ? "" : "-mt-36"} 
              style={{ zIndex: days.length + idx }} 
            >
              <Card title={day} />
            </div>
          ))}
        </div>
      </div>
      <div className='absolute bottom-4 w-screen h-[6vh] z-20 flex justify-center '>
      <div className='w-[70%] h-full flex flex-row items-center justify-center gap-6  rounded-full bg-[#131313]'>
        {[1,2,3,4].map((n) => (
          <div
            key={n}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5D5D5D] shadow-lg"
          >
            {/* Future icon here */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
