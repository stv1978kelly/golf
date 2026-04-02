export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RAPIDAPI_GOLF_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const q = req.query.q || '';
  if (!q) return res.status(400).json({ error: 'Missing search query' });

  try {
    const response = await fetch(
      `https://uk-golf-api.vercel.app/clubs?search=${encodeURIComponent(q)}&limit=20`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'uk-golf-course-data-api.p.rapidapi.com'
        }
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
