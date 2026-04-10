import { useState } from 'react';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner(board) {
  for (let [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToe({ onWin }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setIsX(!isX);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setTimeout(() => onWin(newWinner === 'X' ? 'me' : 'yousra'), 1000);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-3xl p-8 shadow-2xl border border-[#B5CF50]/20">
      <h2 className="text-white text-2xl font-lalezar font-bold mb-2 text-center">Tic Tac Toe</h2>
      <p className="text-[#B5CF50] text-sm text-center mb-6">
        {winner ? `🏆 ${winner} wins!` : isDraw ? "It's a draw!" : `${isX ? 'X' : 'O'}'s turn`}
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="h-24 rounded-2xl bg-[#252525] border border-[#B5CF50]/20 text-4xl font-bold text-white hover:border-[#B5CF50] hover:bg-[#2f2f2f] transition-all duration-200"
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="w-full py-3 rounded-2xl border-2 border-[#B5CF50] text-[#B5CF50] font-semibold hover:bg-[#B5CF50]/10 transition-all duration-300"
      >
        Reset
      </button>
    </div>
  );
}