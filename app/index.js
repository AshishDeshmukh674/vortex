// pages/index.js
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 p-6">
        <h1 className="text-4xl font-bold text-white text-center">AI-Powered Student System</h1>
        <nav className="mt-4 flex justify-center space-x-10">
  <Link href="/chatbot" className="text-white hover:underline">Chatbot</Link>
  <Link href="/attendance" className="text-white hover:underline">Attendance</Link>
  <Link href="/parking" className="text-white hover:underline">Parking</Link>
  <Link href="/events" className="text-white hover:underline">Events</Link>
</nav>

      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Your AI-Powered Assistant!</h2>
          <p className="mb-8 text-lg">Easily manage your academic schedule, attendance, events, and more with our intuitive tools.</p>
          <Link href="/Chatbot">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Icons Section */}
      <section className="p-8 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-center">Explore Our Features</h3>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/Chatbot" className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-200">
            <img src="/icons/chatbot.svg" alt="Chatbot Icon" className="w-16 mb-2" />
            <span className="text-lg font-medium">Chatbot</span>
          </Link>
          <Link href="/Attendance" className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-200">
            <img src="/icons/attendance.svg" alt="Attendance Icon" className="w-16 mb-2" />
            <span className="text-lg font-medium">Attendance</span>
          </Link>
          <Link href="/Parking" className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-200">
            <img src="/icons/parking.svg" alt="Parking Icon" className="w-16 mb-2" />
            <span className="text-lg font-medium">Parking</span>
          </Link>
          <Link href="/Events" className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-200">
            <img src="/icons/events.svg" alt="Events Icon" className="w-16 mb-2" />
            <span className="text-lg font-medium">Events</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
