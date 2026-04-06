import { useState } from 'react'
import './App.css'
import Card from './components/card';
import profileImg from './assets/profile.png';
import rewardsImg from './assets/rewards.png';
import calendarImg from './assets/calendar.png';
import qrImg from './assets/QR.png';
import scanFinishImg from './assets/scan_finish.png';
const actions = ["My task", "others'", "Today", "Tomorrow"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayColors = {
  Monday: "#1A0089",
  Tuesday: "#2601C6",
  Wednesday: "#370BF6",
  Thursday: "#532CFC",
  Friday: "#8468FF",
  Saturday: "#A001FF",
  Sunday: "#C201FF",
};
const choreTasksList = [
  "sweeping the floor",
  "washing the dishes",
  "taking out the trash",
  "set the table",
  "clean the kitchen",
  "clean the toilets",
  "clean the bathroom",
  "water the plants",
  "vacuum the living room",
  "fold laundry",
  "cook dinner",
];
const weeklyTasks = {
  Monday: {
    me: ["sweeping the floor", "washing the dishes"],
    yousra: ["taking out the trash", "set the table"],
  },
  Tuesday: {
    me: ["clean the kitchen", "clean the bathroom"],
    yousra: ["clean the toilets", "water the plants"],
  },
  Wednesday: {
    me: ["vacuum the living room", "fold laundry"],
    yousra: ["cook dinner", "wash the dishes"],
  },
  Thursday: {
    me: ["sweeping the floor", "set the table"],
    yousra: ["clean the kitchen", "take out the trash"],
  },
  Friday: {
    me: ["clean the bathroom", "water the plants"],
    yousra: ["clean the toilets", "vacuum the living room"],
  },
  Saturday: {
    me: ["fold laundry", "cook dinner"],
    yousra: ["sweeping the floor", "washing the dishes"],
  },
  Sunday: {
    me: ["rest", "plan next week"],
    yousra: ["take out the trash", "clean the kitchen"],
  },
};
const bottomIcons = [profileImg, rewardsImg, calendarImg, qrImg];


function App() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [view, setView] = useState('cards');
  const [scanStep, setScanStep] = useState('default');

  if (view === 'success') {
    return (
      <div className="w-full h-screen bg-[#1A0089] flex flex-col items-center justify-center font-poppins">
        <button onClick={() => setView('cards')} className="absolute top-4 right-4 text-white text-2xl">×</button>
        <h1 className="text-white text-3xl mb-8 font-lalezar font-normal">sweeping the floor has been added to your weekly schedule</h1>
        <img src={scanFinishImg} alt="" className="w-64 h-64 mb-8" />
        <div className="flex gap-4">
          <button onClick={() => { setView('scan'); setScanStep('default'); }} className="w-32 px-6 py-2 bg-[#B5CF50] text-black rounded-full font-poppins">scan more</button>
          <button onClick={() => setView('cards')} className="w-32 px-6 py-2 bg-[#B5CF50] text-black rounded-full font-poppins">finish</button>
        </div>
      </div>
    );
  }

  if (view === 'others') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-4 gap-8 overflow-auto font-poppins">
        <div className="w-full h-[10vh] flex justify-between px-6">
          <div className='w-1/4 h-full flex items-center justify-center font-lalezar text-3xl font-bold text-white '>
            Weekly calendar
          </div>
          <button onClick={() => setView('cards')} className="text-white text-2xl">×</button>
        </div>

        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs">others</p>
              <h2 className="text-white text-3xl font-lalezar font-bold">Task calendar</h2>
            </div>
            <div className="bg-[#131313] rounded-full px-4 py-2 text-white text-sm">Me + Yousra</div>
          </div>

          <div className="space-y-4 pb-8">
            {days.map((day) => (
              <div key={day} className="bg-[#252525] rounded-3xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-white text-lg font-semibold">{day}</span>
                    <p className="text-gray-400 text-xs">{weeklyTasks[day].me.length + weeklyTasks[day].yousra.length} tasks</p>
                  </div>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dayColors[day] }} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="bg-[#1F1F1F] rounded-3xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#B5CF50] uppercase text-xs tracking-[0.2em]">Me</span>
                      <span className="text-white text-xs">{weeklyTasks[day].me.length} tasks</span>
                    </div>
                    <div className="space-y-2">
                      {weeklyTasks[day].me.map((task, idx) => (
                        <div key={idx} className="rounded-2xl bg-[#131313] px-3 py-2 text-white text-sm">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1F1F1F] rounded-3xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#B5CF50] uppercase text-xs tracking-[0.2em]">Yousra</span>
                      <span className="text-white text-xs">{weeklyTasks[day].yousra.length} tasks</span>
                    </div>
                    <div className="space-y-2">
                      {weeklyTasks[day].yousra.map((task, idx) => (
                        <div key={idx} className="rounded-2xl bg-[#131313] px-3 py-2 text-white text-sm">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'scan') {
    const scanLabel = scanStep === 'challenge-get-rid'
      ? 'scan the task you want to get rid of'
      : scanStep === 'challenge-scan-target'
      ? 'scan the task you want to challenge'
      : scanStep === 'challenge-options'
      ? 'what kind of game do you want to play?'
      : 'scan your next chore';

    const handleScanClick = () => {
      if (scanStep === 'challenge-get-rid') {
        setScanStep('challenge-scan-target');
      } else if (scanStep === 'challenge-scan-target') {
        setScanStep('challenge-options');
      } else if (scanStep === 'challenge-options') {
        setView('success');
        setScanStep('default');
      } else {
        setView('success');
      }
    };

    return (
      <div className="w-full h-screen bg-[#1A0089] flex flex-col items-center justify-center px-6 font-poppins">
        <button onClick={() => { setView('cards'); setScanStep('default'); }} className="absolute top-4 right-4 text-white text-2xl">×</button>
        <h1 className="text-white text-4xl mb-4 font-lalezar font-normal text-center">{scanLabel}</h1>
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setScanStep('default')}
            className={`px-4 py-2 rounded-full ${scanStep === 'default' ? 'bg-white text-black' : 'bg-[#131313] text-white'}`}
          >
            Scan chore
          </button>
          <button
            onClick={() => setScanStep('challenge-get-rid')}
            className={`px-4 py-2 rounded-full ${scanStep.startsWith('challenge') ? 'bg-white text-black' : 'bg-[#131313] text-white'}`}
          >
            Challenge
          </button>
        </div>
        {scanStep === 'challenge-options' ? (
          <div className="w-full max-w-md bg-[#131313] rounded-3xl p-6 shadow-xl">
            <p className="text-white text-base mb-6">choose a game style to challenge Yousra</p>
            <div className="space-y-4">
              <button
                onClick={() => setScanStep('challenge-winner')}
                className="w-full rounded-3xl bg-[#B5CF50] py-3 text-black font-poppins font-medium"
              >
                Personal game
              </button>
              <button
                onClick={() => { setView('success'); setScanStep('default'); }}
                className="w-full rounded-3xl border border-white/30 py-3 text-white font-poppins font-medium"
              >
                Built-in game
              </button>
            </div>
          </div>
        ) : scanStep === 'challenge-winner' ? (
          <div className="w-full max-w-md bg-[#131313] rounded-3xl p-6 shadow-xl">
            <p className="text-white text-base mb-6 text-center">Who won the game?</p>
            <div className="space-y-4">
              <button
                onClick={() => { setView('success'); setScanStep('default'); }}
                className="w-full rounded-3xl bg-[#B5CF50] py-3 text-black font-poppins font-medium"
              >
                Me
              </button>
              <button
                onClick={() => { setView('success'); setScanStep('default'); }}
                className="w-full rounded-3xl border border-white/30 py-3 text-white font-poppins font-medium"
              >
                Yousra
              </button>
            </div>
          </div>
        ) : (
          <div className="w-64 h-64 bg-black cursor-pointer" onClick={handleScanClick} />
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-4 gap-12 overflow-auto font-poppins">
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
              className="w-full px-4 py-2 bg-gray-500 text-black rounded-full shadow hover:bg-purple-700 transition whitespace-nowrap cursor-pointer"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      <div className='w-screen h-[65vh] flex flex-col items-center justify-start px-6'>
        <div className="relative w-full flex flex-col items-stretch mt-8 overflow-visible">
          {days.map((day, idx) => (
            <div
              key={day}
              className={idx === 0 ? "" : "-mt-36"} 
              style={{ zIndex: days.length + idx }} 
            >
              <Card title={day} onClick={() => setExpandedDay(day)} />
            </div>
          ))}
        </div>
        {expandedDay && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Card title={expandedDay} onClick={() => setExpandedDay(null)} className="w-96 transition-all duration-300" />
          </div>
        )}
      </div>
      <div className='absolute bottom-4 w-screen h-12 z-20 flex justify-center '>
      <div className='w-64 h-full flex flex-row items-center justify-center gap-6  rounded-full bg-[#131313]'>
        {bottomIcons.map((icon, idx) => (
          <div
            key={idx}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5D5D5D] shadow-lg cursor-pointer"
            onClick={idx === 2 ? () => setView('others') : idx === 3 ? () => { setView('scan'); setScanStep('default'); } : undefined}
          >
            <img src={icon} alt="" className="w-4 h-4" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
