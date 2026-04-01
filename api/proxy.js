export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-rapidapi-key, x-rapidapi-host');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { url } = req.query;
  if (!url) { res.status(400).json({ error: 'No url provided' }); return; }

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (req.headers['x-rapidapi-key']) headers['X-RapidAPI-Key'] = req.headers['x-rapidapi-key'];
    if (req.headers['x-rapidapi-host']) headers['X-RapidAPI-Host'] = req.headers['x-rapidapi-host'];

    const response = await fetch(decodeURIComponent(url), {
      method: req.method === 'POST' ? 'POST' : 'GET',
      headers,
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
