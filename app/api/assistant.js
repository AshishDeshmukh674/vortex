import { BardAPI } from 'bard-api-node';

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    // Initialize BardAPI object
    const bard = new BardAPI();
    const apiKey = 'AIzaSyDvujJ5BC_kMt1IamSE5f6hoAiU91nraz0'; // Store your API key in an environment variable

    // Initialize chat with API key
    await bard.initializeChat(apiKey);

    // Send the query to Bard
    const response = await bard.getBardResponse(message);

    // Here, let's assume the AI can generate CSV-like responses for timetable generation queries
    const csvResponse = response.text;

    // Send back the CSV-like data as JSON
    res.status(200).json({ response: csvResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the request.' });
  }
}
