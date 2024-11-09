import { WebSocketServer } from 'ws';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const sheetId = process.env.SHEET_ID;
const apiKey = process.env.API_KEY;

if (!sheetId || !apiKey) {
  console.error("Missing SHEET_ID or API_KEY environment variable");
  process.exit(1); // Exit if necessary environment variables are not set
}

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:E?key=${apiKey}`;

const lapTimeToSeconds = (lapTime) => {
  const [hours, minutes, seconds] = lapTime.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const fetchSheetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.values) {
      const leaderboard = data.values.slice(1).map(row => ({
        Name: row[0],
        Region: row[1],
        Store: row[2],
        LapTime: row[3],
        Date: row[4],
        LapTimeInSeconds: lapTimeToSeconds(row[3])
      }));

      leaderboard.sort((a, b) => a.LapTimeInSeconds - b.LapTimeInSeconds);
      return leaderboard.map((entry, index) => ({
        Rank: index + 1,
        Name: entry.Name,
        Region: entry.Region,
        Store: entry.Store,
        LapTime: entry.LapTime,
        Date: entry.Date
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

let leaderboardData = [];

const updateLeaderboard = async () => {
  leaderboardData = await fetchSheetData();
  console.log("Updated leaderboard data:", leaderboardData);

  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(leaderboardData));
    }
  });
};

// Initial update and interval for periodic updates
updateLeaderboard();
setInterval(updateLeaderboard, 6000);

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', ws => {
  ws.send(JSON.stringify(leaderboardData)); // Send the latest leaderboard to new clients
  ws.on('error', error => console.error('WebSocket error:', error));
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
