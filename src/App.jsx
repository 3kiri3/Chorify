import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
const actions = ["My task", "others'", "Today", "Tomorrow"];



function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200 pt-4 gap-12">
      <div className="w-full h-[10vh] flex justify-between bg-red-500 px-6">
        <div className='w-1/4 h-full flex items-center justify-center text-2xl font-bold text-white'>
          Chorify
        </div>
        <div className='w-auto h-full flex items-center justify-center text-lg text-white'>
          R
          </div>
      </div>
      <div className='w-auto h-auto flex items-center justify-start text-2xl font-bold text-white px-6'>
        Welcome back Maryatou !
      </div>
      <div className='w-full h-auto overflow-hidden'>
        <div className='w-full h-auto flex flex-row items-center justify-start gap-6 overflow-x-auto no-scrollbar'>
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
      <div className='w-full h-[65vh] flex flex-col items-center justify-center bg-white'>
        <div className='w-full h-[35vh] flex flex-col items-center justify-center'>
        </div>

      </div>
    </div>
  );
}

export default App;
