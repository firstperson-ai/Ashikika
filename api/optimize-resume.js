export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { resume, jobDescription } = req.body;
      const optimizedResume = `Optimized: ${resume} for job ${jobDescription || 'general'}`;
      const atsScore = Math.floor(Math.random() * 100); // Mock ATS score for preview
      res.status(200).json({ optimizedResume, atsScore });
    } catch (error) {
      res.status(500).json({ error: 'Preview mode: Optimization failed (mock data used).' });
    }
  }