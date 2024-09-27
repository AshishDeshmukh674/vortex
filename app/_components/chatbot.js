// pages/Chatbot.js
// import WebcamCapture from 'components/WebcamCapture'; // Adjust the path if needed
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from 'next/link';
import Papa from 'papaparse';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';

const promptInstructions = `
Please generate a timetable based on the following guidelines if applicable:
1. Prioritize academic subjects relevant to the curriculum.
2. Include extracurricular activities that students can engage in.
3. Suggest optimal study times for each subject based on difficulty and importance.
4. Recommend breaks and leisure activities to ensure a balanced schedule.
5. If the user asks for study-related queries, provide detailed responses, including resources and study techniques.
6. Ensure the chatbot understands common student activities, such as clubs, sports, and events, and can incorporate them into the timetable.
7. Handle questions regarding exam schedules, assignment due dates, and study group sessions effectively.
8. Be polite and encouraging, as many students may feel overwhelmed. Use positive language to motivate them.
9. Respond to user queries about time management tips and strategies for efficient studying.
10. Maintain flexibility in the generated timetable, allowing students to adjust according to personal preferences and commitments.
11. Provide examples of how to structure study sessions, including techniques like the Pomodoro Technique.
12. Incorporate seasonal and holiday schedules to help students plan their time effectively.
13. Answer any questions about balancing academics with personal life or mental health awareness.
14. Always ask follow-up questions to clarify user needs, such as 'What subjects do you need to prioritize?' or 'Are there specific events you would like to include?'.
15. If the user needs help with specific topics, provide study resources, online courses, and tutoring options.
16. Ensure that responses are structured, easy to read, and follow a logical flow.
17. Include examples of study schedules based on various scenarios, like last-minute exam preparation or long-term project planning.
18. Encourage user feedback to improve the generated timetable or study plan.
19. Be proactive in suggesting tools and apps that can aid in scheduling and studying.
20. Finally, express willingness to assist with any additional queries or changes the user may have regarding their timetable or study plans.
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [structuredResponse, setStructuredResponse] = useState(null);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage + promptInstructions }),
      });
    
      console.log("API Response:", response); // Log the response
    
      if (!response.ok) {
        throw new Error('Failed to fetch response from the server.');
      }
    
      const data = await response.json();
      console.log("Response Data:", data); // Log the data returned
    
      responseText = data.response || 'An error occurred';
    } catch (error) {
      console.error("Error:", error); // Log any error messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Error: ${error.message}` },
      ]);
    }    
}


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const parseCSV = (csvString) => {
    Papa.parse(csvString, {
      header: true,
      complete: (result) => {
        setTableData(result.data);
      },
    });
  };

  const parseStructuredResponse = (response) => {
    const structured = response.split('**').map((section) => section.trim()).filter(Boolean);
    setStructuredResponse(structured);
  };

  const downloadPDF = () => {
    const table = document.getElementById('timetable');
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, canvas.height * 180 / canvas.width);
      pdf.save('timetable.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10 text-blue-700">AI-Powered Attendance System</h1>

      <nav className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </nav>

      <div className="w-4/5 space-y-12 mx-auto">
        

        <div className="bg-black p-8 rounded-lg shadow-xl flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-white">AIChatbot</h2>
          <div className="h-80 overflow-y-auto mb-6 bg-gray-800 p-6 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg shadow-md ${
                  msg.sender === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-600 text-left'
                }`}
              >
                <p className="text-white text-lg">{msg.text}</p>
              </div>
            ))}
            {loading && <div className="text-gray-400">AI is thinking...</div>}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border border-gray-300 rounded-l-lg p-3 text-lg"
              placeholder="Type your message..."
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>

        {tableData && (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Generated Timetable</h2>
            <table className="min-w-full border-collapse border border-gray-300" id="timetable">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(tableData[0]).map((header, index) => (
                    <th key={index} className="border border-gray-300 p-4 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={downloadPDF}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Download as PDF
            </button>
          </div>
        )}

        {structuredResponse && structuredResponse.length > 0 && (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">AI Suggestions</h2>
            <ul className="list-disc pl-5">
              {structuredResponse.map((item, index) => (
                <li key={index} className="text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
