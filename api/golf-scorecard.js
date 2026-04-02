export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RAPIDAPI_GOLF_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const { clubId, courseId } = req.query;

  try {
    // If we have a courseId, fetch the scorecard directly
    if (courseId) {
      const r = await fetch(
        `https://uk-golf-api.vercel.app/courses/${courseId}/scorecard`,
        {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'uk-golf-course-data-api.p.rapidapi.com'
          }
        }
      );
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    // Otherwise fetch courses for a club first
    if (clubId) {
      const r = await fetch(
        `https://uk-golf-api.vercel.app/clubs/${clubId}/courses`,
        {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'uk-golf-course-data-api.p.rapidapi.com'
          }
        }
      );
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    res.status(400).json({ error: 'Missing clubId or courseId' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
