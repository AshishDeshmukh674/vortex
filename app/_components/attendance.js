// pages/Attendance.js
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import WebcamCapture from '../components/WebcamCapture'; // Adjust the path if necessary

const Attendance = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6" id='attendance'>
      <h1 className="text-4xl font-bold mb-10 text-blue-700">Webcam Attendance</h1>
      <nav className="mb-6">
        <Link href="/chatbot" className="text-blue-500 hover:underline">
          Go to Chatbot Page
        </Link>
      </nav>

      {/* Attendance Component */}
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Capture Attendance</h2>
        <div className="flex flex-col items-center">
          <WebcamCapture />
          <p className="text-sm mt-4 text-gray-500">
            Ensure your face is clearly visible for accurate attendance capture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
