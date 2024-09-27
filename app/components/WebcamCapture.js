
import { useRef, useState } from 'react';

export default function Home() {
    const videoRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [response, setResponse] = useState(null);
    const [recognizedFaces, setRecognizedFaces] = useState([]);  // Ensure initialized as an empty array

    // Start the webcam stream
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error("Error accessing webcam: ", err));
    };

    // Capture the image from the webcam
    const captureImage = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");
        setImageData(image);
    };

    // Send the captured image to the backend for recognition
    const recognizeImage = async () => {
        if (!imageData) {
            alert("Capture an image first!");
            return;
        }

        try {
            const res = await fetch('/api/recognize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            });

            const result = await res.json();
            setResponse(result.message); // Set the message (like "Faces recognized")

            // Ensure the faces data is an array, even if empty or null
            const facesArray = Array.isArray(result.faces) ? result.faces : [];
            setRecognizedFaces(facesArray);  // Safely set the recognizedFaces state
        } catch (error) {
            console.error("Error recognizing image:", error);
            setResponse("Recognition failed.");
            setRecognizedFaces([]);  // Set to empty array on error
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Camera Face Recognition</h1>

            {/* Webcam video */}
            <div className="mb-6">
                <video ref={videoRef} className="rounded-lg shadow-lg border border-gray-300" autoPlay></video>
            </div>

            {/* Control Buttons */}
            <div className="space-x-4 mb-6">
                <button 
                    onClick={startVideo} 
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-200"
                >
                    Start Camera
                </button>
                <button 
                    onClick={captureImage} 
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-200"
                >
                    Capture Image
                </button>
                <button 
                    onClick={recognizeImage} 
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Recognize Face
                </button>
            </div>

            {/* Display response message */}
            {response && <p className="text-lg font-medium text-gray-700">{response}</p>}

            {/* Display recognized faces */}
            {recognizedFaces.length > 0 && (
                <div className="mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recognized Faces</h2>
                    <ul className="space-y-4">
                        {recognizedFaces.map((face, index) => (
                            <li key={index} className="border-b pb-4">
                                <p><strong>Name:</strong> {face.name}</p>
                                <p><strong>Confidence:</strong> {face.confidence}</p>
                                {/* <p><strong>Position:</strong> x: {face.position.x}, y: {face.position.y}, w: {face.position.w}, h: {face.position.h}</p> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}