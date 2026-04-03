import React, { useState } from "react";

function Card({ title, description, color }) {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Faire les courses", done: false },
    { id: 2, label: "Réviser React", done: false },
  ]);
  const [colors, setColors] = useState([
    {day: "Monday", color: "#1A0089"},
    {day: "Tuesday", color: "#2601C6"},
    {day: "Wednesday", color: "#370BF6"},
    {day: "Thursday", color: "#532CFC"},
    {day: "Friday", color: "#8468FF"},
    {day: "Saturday", color: "#A001FF"},
    {day: "Sunday", color: "#C201FF"},
  ]);

    const dayColor = colors.find(c => c.day === title)?.color || "#1A0089";

  return (
    <div className="w-full rounded-2xl shadow-lg p-4 flex flex-col items-start gap-4
    " style={{ backgroundColor: dayColor }}>
      <h2 className="text-4xl font-lalezar text-white">{title}</h2>
      <p className="text-white text-center">task of the day</p>
      <ul className="w-full">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-2 px-3 py-2 mb-2 rounded-full bg-[#B5CF50] text-white"
          >
            <span className={"w-auto" + (task.done ? "line-through text-gray-400" : "")}>{task.label}</span>
            <div className="flex flex row gap-2">
              <button className="text-xs text-white ml-1 hover:underline focus:outline-none">
                review
              </button>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks(tasks =>
                    tasks.map(t =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;