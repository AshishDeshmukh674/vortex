import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { image } = req.body;

        // Remove base64 prefix and save image to file
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const filePath = path.join(process.cwd(), 'public', 'captured_image.png');

        // Ensure the 'public' folder exists
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // Write the image file
        try {
            fs.writeFileSync(filePath, base64Data, 'base64');
            console.log(`Image saved at ${filePath}`);

            // Call Python Flask backend with the relative path to the image
            const pythonResponse = await fetch('http://localhost:5000/recognize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imagePath: 'public/captured_image.png' }) // Pass relative path
            });

            if (!pythonResponse.ok) {
                console.error("Error response from Python backend:", pythonResponse.statusText);
                return res.status(500).json({ message: 'Recognition service error.' });
            }

            const result = await pythonResponse.json();
            console.log('Response from Python backend:', result);
            res.status(200).json({ message: result.message, faces: result.faces });
        } catch (error) {
            console.error("Error saving image or calling Python service: ", error);
            res.status(500).json({ message: 'Recognition failed.' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed.' });
    }
}
