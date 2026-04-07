import { useState, useEffect } from 'react';

const choices = ['✊', '✋', '✌️'];

function getWinner(p1, p2) {
  if (p1 === p2) return 'draw';
  if (
    (p1 === '✊' && p2 === '✌️') ||
    (p1 === '✋' && p2 === '✊') ||
    (p1 === '✌️' && p2 === '✋')
  ) return 'p1';
  return 'p2';
}

export default function RockPaperScissors({ onWin }) {
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [phase, setPhase] = useState('p1'); // p1, p2, countdown, reveal
  const [countdown, setCountdown] = useState(3);
  const [roundResult, setRoundResult] = useState(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown === 0) {
        // reveal
        const result = getWinner(p1Choice, p2Choice);
        setRoundResult(result);
        setPhase('reveal');
        if (result !== 'draw') {
          const newScores = {
            p1: result === 'p1' ? scores.p1 + 1 : scores.p1,
            p2: result === 'p2' ? scores.p2 + 1 : scores.p2,
          };
          setScores(newScores);
          if (newScores.p1 >= 5 || newScores.p2 >= 5) {
            setGameOver(true);
            setTimeout(() => onWin(newScores.p1 >= 5 ? 'me' : 'yousra'), 2500);
          }
        }
        return;
      }
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown]);

  const selectP1 = (choice) => {
    setP1Choice(choice);
    setPhase('p2');
  };

  const selectP2 = (choice) => {
    setP2Choice(choice);
    setPhase('countdown');
    setCountdown(3);
  };

  const nextRound = () => {
    setP1Choice(null);
    setP2Choice(null);
    setRoundResult(null);
    setPhase('p1');
    setCountdown(3);
  };

  if (phase === 'p1') return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
      <div className="flex justify-between mb-6">
        <span className="text-[#B5CF50] font-bold">You: {scores.p1}</span>
        <span className="text-white font-bold">First to 5</span>
        <span className="text-[#B5CF50] font-bold">Yousra: {scores.p2}</span>
      </div>
      <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Your turn</h2>
      <p className="text-[#B5CF50] text-sm text-center mb-8">Pick your move — Yousra won't see it!</p>
      <div className="flex justify-center gap-6">
        {choices.map((c) => (
          <button key={c} onClick={() => selectP1(c)}
            className="text-5xl w-24 h-24 rounded-2xl bg-[#252525] border border-[#B5CF50]/20 hover:border-[#B5CF50] hover:bg-[#2f2f2f] transition-all duration-200">
            {c}
          </button>
        ))}
      </div>
    </div>
  );

  if (phase === 'p2') return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
      <div className="flex justify-between mb-6">
        <span className="text-[#B5CF50] font-bold">You: {scores.p1}</span>
        <span className="text-white font-bold">First to 5</span>
        <span className="text-[#B5CF50] font-bold">Yousra: {scores.p2}</span>
      </div>
      <div className="text-center mb-4">
        <span className="text-green-400 text-sm font-semibold">✅ You locked in!</span>
      </div>
      <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Yousra's turn</h2>
      <p className="text-[#B5CF50] text-sm text-center mb-8">Pass the phone to Yousra!</p>
      <div className="flex justify-center gap-6">
        {choices.map((c) => (
          <button key={c} onClick={() => selectP2(c)}
            className="text-5xl w-24 h-24 rounded-2xl bg-[#252525] border border-[#B5CF50]/20 hover:border-[#B5CF50] hover:bg-[#2f2f2f] transition-all duration-200">
            {c}
          </button>
        ))}
      </div>
    </div>
  );

  if (phase === 'countdown') return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20 flex flex-col items-center justify-center">
      <h2 className="text-white text-2xl font-lalezar font-bold mb-6 text-center">Revealing in...</h2>
      <div className="text-8xl font-bold text-[#B5CF50] animate-pulse">{countdown}</div>
    </div>
  );

  if (phase === 'reveal') return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
      <div className="flex justify-between mb-6">
        <span className="text-[#B5CF50] font-bold">You: {scores.p1}</span>
        <span className="text-white font-bold">First to 5</span>
        <span className="text-[#B5CF50] font-bold">Yousra: {scores.p2}</span>
      </div>
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="text-center">
          <p className="text-[#B5CF50] text-xs mb-2">You</p>
          <div className="text-6xl">{p1Choice}</div>
        </div>
        <div className="text-white text-2xl font-bold">vs</div>
        <div className="text-center">
          <p className="text-[#B5CF50] text-xs mb-2">Yousra</p>
          <div className="text-6xl">{p2Choice}</div>
        </div>
      </div>
      <p className="text-white text-xl font-lalezar font-bold text-center mb-6">
        {roundResult === 'draw' ? "Draw! 🤝" : roundResult === 'p1' ? 'You win this round! 🎉' : 'Yousra wins this round! 😅'}
      </p>
      {!gameOver && (
        <button onClick={nextRound}
          className="w-full py-3 rounded-2xl border-2 border-[#B5CF50] text-[#B5CF50] font-semibold hover:bg-[#B5CF50]/10 transition-all duration-300">
          Next Round
        </button>
      )}
    </div>
  );
}