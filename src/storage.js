import defaultData from './data.json';

const STORAGE_KEY = 'chorify_data';

export function getData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // first time — load from data.json and save it
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUsers() {
  return getData().users;
}

export function getChores() {
  return getData().chores;
}

export function getSchedule() {
  return getData().weeklySchedule;
}

export function addChoreToSchedule(userId, day, choreName) {
  const data = getData();
  if (!data.weeklySchedule[day][userId]) {
    data.weeklySchedule[day][userId] = [];
  }
  if (!data.weeklySchedule[day][userId].includes(choreName)) {
    data.weeklySchedule[day][userId].push(choreName);
  }
  saveData(data);
}

export function removeChoreFromSchedule(userId, day, choreName) {
  const data = getData();
  data.weeklySchedule[day][userId] = data.weeklySchedule[day][userId].filter(c => c !== choreName);
  saveData(data);
}

export function transferChore(fromUserId, toUserId, choreName, day) {
  removeChoreFromSchedule(fromUserId, day, choreName);
  addChoreToSchedule(toUserId, day, choreName);
}

export function updateChoreOwner(choreId, userId) {
  const data = getData();
  const chore = data.chores.find(c => c.id === choreId);
  if (chore) chore.owner = userId;
  saveData(data);
}

export function addLog(entry) {
  const data = getData();
  data.logs.push({ ...entry, timestamp: new Date().toISOString() });
  saveData(data);
}