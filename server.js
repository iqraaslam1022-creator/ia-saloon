// Local development server (frontend + backend together)
// Run with: npm install && npm start
// This is only needed for local dev / non-Vercel hosting.
// On Vercel, the /api folder is used directly as serverless functions instead.

const express = require('express');
const path = require('path');
const bookHandler = require('./api/book.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/book', (req, res) => bookHandler(req, res));

app.listen(PORT, () => {
  console.log(`IA Saloon running at http://localhost:${PORT}`);
});
