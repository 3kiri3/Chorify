import { QRCodeSVG } from 'qrcode.react';
import { getChores } from '../storage';

export default function QRGenerator({ onClose }) {
  const chores = getChores();

  return (
    <div className="w-full min-h-screen bg-[#1E1E1E] flex flex-col pt-6 font-poppins overflow-auto pb-10">
      <div className="flex justify-between items-center px-6 mb-8">
        <div>
          <p className="text-[#B5CF50] uppercase tracking-[0.2em] text-xs font-semibold">print these</p>
          <h1 className="font-lalezar text-4xl font-bold text-white">Chore Cards</h1>
        </div>
        <button onClick={onClose} className="text-white text-3xl hover:text-[#B5CF50] transition-all duration-300">×</button>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6">
        {chores.map((chore) => (
          <div key={chore.id} className="bg-gradient-to-br from-[#1F1F1F] to-[#131313] rounded-2xl p-4 flex flex-col items-center gap-3 border border-[#B5CF50]/20">
            <div className="bg-white p-3 rounded-xl">
              <QRCodeSVG value={chore.id} size={100} />
            </div>
            <p className="text-white text-xs font-semibold text-center">{chore.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}