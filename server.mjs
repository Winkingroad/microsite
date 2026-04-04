import { WebSocketServer } from 'ws';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const sheetId = process.env.SHEET_ID;
const apiKey = process.env.API_KEY;

if (!sheetId || !apiKey) {
  console.error("Missing SHEET_ID or API_KEY environment variable");
  process.exit(1);
}

// Columns: A=Name, B=Region, C=Store, D=LapTime, E=Date, F=Sets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:F?key=${apiKey}`;

// Handles both HH:MM:SS and MM:SS formats
const lapTimeToSeconds = (lapTime) => {
  if (!lapTime || typeof lapTime !== 'string') return null;
  const parts = lapTime.trim().split(':').map(Number);
  if (parts.some(isNaN)) return null;

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  return null;
};

const fetchSheetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values) return [];

    const rows = data.values.slice(1); // skip header row

    const valid = rows
      .filter(row => {
        const name = row[0]?.trim();
        const lapTime = row[3]?.trim();
        return name && lapTime; // skip rows with no name or no lap time
      })
      .map(row => {
        const lapTimeInSeconds = lapTimeToSeconds(row[3]);
        if (lapTimeInSeconds === null) return null; // skip malformed lap times
        return {
          Name: row[0].trim(),
          Region: row[1]?.trim() || '',
          Store: row[2]?.trim() || '',
          LapTime: row[3].trim(),
          Date: row[4]?.trim() || '',
          Sets: row[5]?.trim() || '',
          LapTimeInSeconds: lapTimeInSeconds
        };
      })
      .filter(Boolean); // remove nulls from malformed lap times

    valid.sort((a, b) => a.LapTimeInSeconds - b.LapTimeInSeconds);

    console.log(`Valid leaderboard entries: ${valid.length}`);

    return valid.map((entry, index) => ({
      Rank: index + 1,
      Name: entry.Name,
      Region: entry.Region,
      Store: entry.Store,
      LapTime: entry.LapTime,
      Sets: entry.Sets,
      Date: entry.Date
    }));

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
};

let leaderboardData = [];

const updateLeaderboard = async () => {
  leaderboardData = await fetchSheetData();
  console.log("Leaderboard updated:", leaderboardData);

  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(leaderboardData));
    }
  });
};

updateLeaderboard();
setInterval(updateLeaderboard, 6000);

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', ws => {
  ws.send(JSON.stringify(leaderboardData));
  ws.on('error', error => console.error('WebSocket error:', error));
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);