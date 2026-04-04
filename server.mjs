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

// Columns: A=Name, B=Region, C=Store, D=Date
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:D?key=${apiKey}`;

const fetchSheetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length < 2) {
      console.warn("Sheet returned no data or only a header row");
      return [];
    }

    const rows = data.values.slice(1);
    let rank = 1;
    const leaderboard = [];

    for (const row of rows) {
      const name = row[0]?.trim() ?? '';
      if (!name) continue;

      leaderboard.push({
        Rank: rank++,
        Name: name,
        Region: row[1]?.trim() || '',
        Store: row[2]?.trim() || '',
        Date: row[3]?.trim() || ''
      });
    }

    console.log(`Leaderboard entries: ${leaderboard.length}`);
    return leaderboard;

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
};

let leaderboardData = [];

const updateLeaderboard = async () => {
  leaderboardData = await fetchSheetData();
  console.log(`Leaderboard updated — ${leaderboardData.length} entries`);

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