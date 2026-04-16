import { useState } from 'react'
import './App.css'
import Card from './components/card';
import profileImg from './assets/profile.png';
import rewardsImg from './assets/rewards.png';
import calendarImg from './assets/calendar.png';
import qrImg from './assets/QR.png';
import scanFinishImg from './assets/scan_finish.png';
import TicTacToe from './tictactoe';
import RockPaperScissors from './RockPaperScissors';
const actions = ["My task", "Calendar", "Today", "Tomorrow"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const todayDay = days[0];
const tomorrowDay = days[1];
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
  const [challengeWinner, setChallengeWinner] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  if (view === 'success') {
    const successText = challengeWinner === 'me'
      ? "Congrats! You won, your task will be moved to Yousra's task!"
      : challengeWinner === 'yousra'
      ? "You lost :( Yousra's task will be moved to your task"
      : "sweeping the floor has been added to your weekly schedule";

    const isWinner = challengeWinner === 'me';
    const emoji = isWinner ? '🎉' : challengeWinner === 'yousra' ? '😅' : '✅';
    const title = isWinner ? 'Victory!' : challengeWinner === 'yousra' ? 'Challenge Lost' : 'Task Added';
    const subtitle = isWinner ? 'Amazing job!' : challengeWinner === 'yousra' ? 'Better luck next time!' : 'Great work!';

    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-[#1A0089] via-[#2601C6] to-[#0D0047] flex flex-col items-center justify-center font-poppins relative overflow-auto py-6">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-10 text-6xl opacity-20 animate-bounce" style={{animationDelay: '0s'}}>✨</div>
          <div className="absolute top-52 right-20 text-4xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}>🎯</div>
          <div className="absolute bottom-52 left-20 text-5xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🏆</div>
          <div className="absolute bottom-32 right-10 text-4xl opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}>⭐</div>
        </div>

        <button onClick={() => { setView('cards'); setChallengeWinner(null); setScanStep('default'); }} className="absolute top-8 right-6 text-white text-3xl hover:text-[#B5CF50] transition-all duration-300 hover:scale-110 z-10">×</button>

        {/* Main success card */}
        <div className="bg-gradient-to-br from-[#1F1F1F]/90 to-[#131313]/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20 max-w-md w-full mx-6 relative z-10">
          {/* Success emoji */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4 animate-pulse">{emoji}</div>
            <h1 className="text-white text-3xl font-lalezar font-bold mb-2">{title}</h1>
            <p className="text-[#B5CF50] text-lg font-semibold">{subtitle}</p>
          </div>

          {/* Success message */}
          <div className="bg-gradient-to-r from-[#B5CF50]/10 to-[#a8c43a]/10 rounded-2xl p-4 mb-8 border border-[#B5CF50]/20">
            <p className="text-white text-center text-sm leading-relaxed">{successText}</p>
          </div>

          {/* Success image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img src={scanFinishImg} alt="Success" className="w-48 h-48 rounded-2xl shadow-lg" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] rounded-full p-2 shadow-lg">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => { setView('scan'); setScanStep('default'); setChallengeWinner(null); }}
              className="w-full py-4 bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] text-black rounded-2xl font-poppins font-bold text-lg hover:shadow-xl hover:shadow-[#B5CF50]/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              Scan More Tasks
            </button>
            <button
              onClick={() => { setView('cards'); setChallengeWinner(null); setScanStep('default'); }}
              className="w-full py-4 bg-gradient-to-r from-[#252525] to-[#131313] text-white rounded-2xl font-poppins font-semibold text-lg border border-[#B5CF50]/30 hover:shadow-xl hover:shadow-[#B5CF50]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🏠</span>
              Back to Home
            </button>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
          <div className="w-2 h-2 bg-[#B5CF50] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#B5CF50] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-[#B5CF50] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }

  if (view === 'others') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-6 gap-10 overflow-auto font-poppins">
        <div className="w-full flex justify-between items-center px-6">
          <div className='flex flex-col justify-center'>
            <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">planning</p>
            <h2 className="font-lalezar text-4xl font-bold text-white">Task calendar</h2>
          </div>
          <button onClick={() => setView('cards')} className="text-white text-3xl hover:text-[#B5CF50] transition-all duration-300 hover:scale-110">×</button>
        </div>

        <div className="px-6">
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-[#1F1F1F] to-[#131313] rounded-2xl p-4 border border-[#B5CF50]/20">
            <div className="flex flex-col gap-1">
              <span className="text-white text-lg font-semibold">Me + Yousra</span>
              <p className="text-[#B5CF50] text-xs">Full weekly overview</p>
            </div>
            <span className="text-[#B5CF50] text-2xl">📋</span>
          </div>

          <div className="space-y-4 pb-8">
            {days.map((day) => (
              <div key={day} className="bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-6 border border-[#B5CF50]/10 hover:border-[#B5CF50]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dayColors[day] }} />
                    <div>
                      <span className="text-white text-xl font-semibold font-lalezar">{day}</span>
                      <p className="text-[#B5CF50] text-xs">{weeklyTasks[day].me.length + weeklyTasks[day].yousra.length} tasks</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-[#131313] rounded-2xl p-4 border border-[#B5CF50]/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#B5CF50] uppercase text-xs tracking-[0.1em] font-semibold">You</span>
                      <span className="text-white text-xs bg-[#1F1F1F] rounded-full px-2 py-1">{weeklyTasks[day].me.length}</span>
                    </div>
                    <div className="space-y-2">
                      {weeklyTasks[day].me.map((task, idx) => (
                        <div key={idx} className="rounded-xl bg-gradient-to-r from-[#1F1F1F] to-[#131313] px-4 py-2 text-white text-sm border border-[#B5CF50]/10 hover:border-[#B5CF50]/30 transition-all duration-300">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#131313] rounded-2xl p-4 border border-[#B5CF50]/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#B5CF50] uppercase text-xs tracking-[0.1em] font-semibold">Yousra</span>
                      <span className="text-white text-xs bg-[#1F1F1F] rounded-full px-2 py-1">{weeklyTasks[day].yousra.length}</span>
                    </div>
                    <div className="space-y-2">
                      {weeklyTasks[day].yousra.map((task, idx) => (
                        <div key={idx} className="rounded-xl bg-gradient-to-r from-[#1F1F1F] to-[#131313] px-4 py-2 text-white text-sm border border-[#B5CF50]/10 hover:border-[#B5CF50]/30 transition-all duration-300">
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

  if (view === 'today') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-6 gap-10 overflow-auto font-poppins">
        <div className="w-full h-[10vh] flex justify-between px-6">
          <div className='flex flex-col justify-center font-lalezar text-3xl font-bold text-white'>
            Today
          </div>
          <button onClick={() => setView('cards')} className="text-white text-3xl hover:text-[#B5CF50] transition-all duration-300 hover:scale-110">×</button>
        </div>
        <div className="px-6">
          <div className="mb-6">
            <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">today's schedule</p>
            <h2 className="text-white text-2xl font-lalezar font-bold mt-2">{todayDay}</h2>
          </div>
          <Card title={todayDay} />
        </div>
      </div>
    );
  }

  if (view === 'tomorrow') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-6 gap-10 overflow-auto font-poppins">
        <div className="w-full h-[10vh] flex justify-between px-6">
          <div className='flex flex-col justify-center font-lalezar text-3xl font-bold text-white'>
            Tomorrow
          </div>
          <button onClick={() => setView('cards')} className="text-white text-3xl hover:text-[#B5CF50] transition-all duration-300 hover:scale-110">×</button>
        </div>
        <div className="px-6">
          <div className="mb-6">
            <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">tomorrow's schedule</p>
            <h2 className="text-white text-2xl font-lalezar font-bold mt-2">{tomorrowDay}</h2>
          </div>
          <Card title={tomorrowDay} />
        </div>
      </div>
    );
  }

  if (view === 'rockpaperscissors') {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1A0089] via-[#2601C6] to-[#0D0047] flex flex-col items-center justify-center px-6 font-poppins">
      <button onClick={() => { setView('scan'); setScanStep('built-in-games'); }} className="absolute top-8 right-6 text-white text-3xl hover:text-[#B5CF50] transition-all duration-300">×</button>
      <RockPaperScissors onWin={(winner) => { setChallengeWinner(winner); setView('success'); }} />
    </div>
  );
}
if (view === 'tictactoe') {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1A0089] via-[#2601C6] to-[#0D0047] flex flex-col items-center justify-center px-6 font-poppins">
      <button onClick={() => { setView('scan'); setScanStep('built-in-games'); }} className="absolute top-8 right-6 text-white text-3xl hover:text-[#B5CF50] transition-all duration-300">×</button>
      <TicTacToe onWin={(winner) => { setChallengeWinner(winner); setView('success'); }} />
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
      <div className="w-full min-h-screen bg-gradient-to-br from-[#1A0089] via-[#2601C6] to-[#0D0047] flex flex-col items-center justify-center px-6 font-poppins py-6">
        <button onClick={() => { setView('cards'); setScanStep('default'); }} className="absolute top-8 right-6 text-white text-3xl hover:text-[#B5CF50] transition-all duration-300 hover:scale-110">×</button>
        <h1 className="text-white text-4xl mb-6 font-lalezar font-bold text-center">{scanLabel}</h1>
        <div className="flex gap-3 mb-8 bg-[#131313] rounded-full p-1">
          <button
            onClick={() => setScanStep('default')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              scanStep === 'default'
                ? 'bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] text-black shadow-lg shadow-[#B5CF50]/50'
                : 'text-white hover:text-[#B5CF50]'
            }`}
          >
            Scan chore
          </button>
          <button
            onClick={() => setScanStep('challenge-get-rid')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              scanStep.startsWith('challenge')
                ? 'bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] text-black shadow-lg shadow-[#B5CF50]/50'
                : 'text-white hover:text-[#B5CF50]'
            }`}
          >
            Challenge
          </button>
        </div>
        {scanStep === 'challenge-options' ? (
          <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
            <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Game Mode</h2>
            <p className="text-[#B5CF50] text-sm text-center mb-8">choose a game style to challenge Yousra</p>
            <div className="space-y-4">
              <button
                onClick={() => setScanStep('challenge-winner')}
                className="w-full rounded-2xl bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] py-3 text-black font-poppins font-semibold hover:shadow-lg hover:shadow-[#B5CF50]/50 transition-all duration-300"
              >
                Personal game
              </button>
              <button
                onClick={() => setScanStep('built-in-games')}
                className="w-full rounded-2xl border-2 border-[#B5CF50] py-3 text-[#B5CF50] font-poppins font-semibold hover:bg-[#B5CF50]/10 transition-all duration-300"
              >
                Built-in game
              </button>
            </div>
          </div>
        ) : scanStep === 'challenge-winner' ? (
          <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
            <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Victory</h2>
            <p className="text-[#B5CF50] text-sm text-center mb-8">Who won the game?</p>
            <div className="space-y-4">
              <button
                onClick={() => { setChallengeWinner('me'); setView('success'); setScanStep('default'); }}
                className="w-full rounded-2xl bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] py-3 text-black font-poppins font-semibold hover:shadow-lg hover:shadow-[#B5CF50]/50 transition-all duration-300"
              >
                Me
              </button>
              <button
                onClick={() => { setChallengeWinner('yousra'); setView('success'); setScanStep('default'); }}
                className="w-full rounded-2xl border-2 border-[#B5CF50] py-3 text-[#B5CF50] font-poppins font-semibold hover:bg-[#B5CF50]/10 transition-all duration-300"
              >
                Yousra
              </button>
            </div>
          </div>
        ) : scanStep === 'built-in-games' ? (
          <div className="w-full max-w-lg bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
            <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Game Select</h2>
            <p className="text-[#B5CF50] text-sm text-center mb-8">pick a built-in game</p>
            <div className="grid grid-cols-3 gap-4">
              {[
  { name: 'Rock Paper Scissors', icon: '✊' },
  { name: 'Tic Tac Toe', icon: '⭕' },
  { name: 'Memory Game', icon: '🧠' },
  { name: 'Quiz Challenge', icon: '❓' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Flappy Bird', icon: '🐦' }
].map((game, i) => (
  <div key={i} className="bg-gradient-to-br from-[#B5CF50] to-[#a8c43a] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-[#B5CF50]/50 transition-all duration-300"
    onClick={() => {
      if (game.name === 'Tic Tac Toe') {
  setView('tictactoe');
} else if (game.name === 'Rock Paper Scissors') {
  setView('rockpaperscissors');
} else {
  setView('success');
  setScanStep('default');
}
    }}
  >
    <span className="text-3xl mb-2">{game.icon}</span>
    <span className="text-black text-xs font-poppins font-semibold text-center">{game.name}</span>
  </div>
))}
            </div>
          </div>
        ) : (
          <div className="w-72 h-72 bg-gradient-to-br from-[#131313] to-[#1F1F1F] cursor-pointer rounded-3xl flex items-center justify-center border-2 border-[#B5CF50]/30 hover:border-[#B5CF50] hover:shadow-2xl hover:shadow-[#B5CF50]/30 transition-all duration-300" onClick={handleScanClick}>
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-[#B5CF50] text-sm font-semibold">tap to scan</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1E1E1E] pt-6 gap-10 overflow-auto font-poppins">
      <div className="w-full flex justify-between items-center px-6">
        <div className='flex flex-col justify-center gap-1'>
          <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">chore app</p>
          <h1 className="font-lalezar text-4xl font-bold text-white">Chorify</h1>
        </div>
        <div className='text-5xl'>🎯</div>
      </div>
      <div className='px-6'>
        <div className='flex flex-col gap-2'>
          <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">welcome</p>
          <h2 className="text-4xl font-lalezar font-bold text-white">Maryatou</h2>
          <p className="text-[#B5CF50]/60 text-sm mt-1">Let's manage your chores for the week</p>
        </div>
      </div>
      <div className='px-6'>
        <div className='w-full flex flex-row items-center justify-start gap-3 overflow-x-auto no-scrollbar z-10'>
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="px-6 py-2.5 bg-gradient-to-r from-[#B5CF50] to-[#a8c43a] text-black rounded-full shadow-lg hover:shadow-xl hover:shadow-[#B5CF50]/60 transition-all duration-300 font-poppins font-semibold whitespace-nowrap"
              onClick={
                action === 'My task' ? () => setView('cards') :
                action === 'Calendar' ? () => setView('others') :
                action === 'Today' ? () => setView('today') :
                action === 'Tomorrow' ? () => setView('tomorrow') : undefined
              }
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col items-center justify-start px-6 pb-40'>
        <div className="relative w-full flex flex-col items-stretch mt-4 overflow-visible">
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
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 rounded-3xl transition-all duration-300">
            <Card title={expandedDay} onClick={() => setExpandedDay(null)} className="w-96 transition-all duration-300" />
          </div>
        )}
      </div>
      <div className='fixed bottom-6 w-screen flex justify-center z-20'>
      <div className='w-72 h-14 flex flex-row items-center justify-center gap-8 rounded-2xl bg-gradient-to-r from-[#1F1F1F] to-[#131313] border border-[#B5CF50]/20 shadow-2xl'>
        {bottomIcons.map((icon, idx) => (
          <div
            key={idx}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#B5CF50]/20 to-[#a8c43a]/10 shadow-md cursor-pointer hover:from-[#B5CF50]/40 hover:to-[#a8c43a]/20 transition-all duration-300 hover:scale-110"
            onClick={idx === 2 ? () => setView('others') : idx === 3 ? () => { setView('scan'); setScanStep('default'); } : undefined}
          >
            <img src={icon} alt="" className="w-5 h-5" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
