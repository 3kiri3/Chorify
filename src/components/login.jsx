import { useState } from 'react';
import { getData, saveData } from '../storage';

export default function Login({ onLogin }) {
  const [data, setData] = useState(getData());
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const createUser = () => {
    if (!newName.trim()) return;
    const newUser = {
      id: Date.now().toString(),
      name: newName.trim(),
      color: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
    };
    const updated = { ...data, users: [...data.users, newUser] };
    saveData(updated);
    setData(updated);
    setNewName('');
    setShowCreate(false);
  };

  const deleteUser = (userId) => {
    const updated = { ...data, users: data.users.filter(u => u.id !== userId) };
    saveData(updated);
    setData(updated);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1A0089] via-[#2601C6] to-[#0D0047] flex flex-col items-center justify-center px-6 font-poppins">
      <div className="mb-10 text-center">
        <h1 className="font-lalezar text-5xl font-bold text-white mb-2">Chorify</h1>
        <p className="text-[#B5CF50] text-sm">who are you?</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {data.users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <button
              onClick={() => onLogin(user)}
              className="flex-1 py-5 rounded-2xl font-lalezar text-2xl text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ backgroundColor: user.color }}
            >
              {user.name}
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-red-400 transition-all duration-300 text-sm"
            >
              ×
            </button>
          </div>
        ))}

        {showCreate ? (
          <div className="flex gap-2 mt-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="enter name..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/40 border border-[#B5CF50]/30 focus:outline-none focus:border-[#B5CF50]"
              onKeyDown={(e) => e.key === 'Enter' && createUser()}
            />
            <button
              onClick={createUser}
              className="px-4 py-3 rounded-2xl bg-[#B5CF50] text-black font-bold hover:scale-105 transition-all duration-300"
            >
              add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCreate(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-[#B5CF50]/40 text-[#B5CF50] font-semibold hover:border-[#B5CF50] hover:bg-[#B5CF50]/10 transition-all duration-300 mt-2"
          >
            + new user
          </button>
        )}
      </div>
    </div>
  );
}