import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { TrendingUp, Calendar, Plus } from 'lucide-react';

const PatientHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentGreeting, setCurrentGreeting] = useState('');

  const greetings = [
    "Good morning, Alex. How are you starting your day?",
    "Hi Alex, how's your day going so far?",
    "Welcome back, Alex. How are things right now?",
    "Checking in again, Alex—what's on your mind?",
    "Thanks for logging in Alex. How are you feeling this moment?",
    "Alex, how are you holding up right now?",
    "What's your mood at this moment Alex?",
    "Let's do a quick check-in—how are you Alex?",
    "Hi Alex, how's your day going so far?"
  ];

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    // Time-based greetings
    if (hour >= 5 && hour < 12) {
      return greetings[0]; // Good morning
    } else if (hour >= 12 && hour < 17) {
      return greetings[1]; // Day going so far
    } else if (hour >= 17 && hour < 22) {
      return greetings[2]; // Welcome back
    }
    
    // Situation-based greetings
    if (lastVisit) {
      const timeSinceLastVisit = now - parseInt(lastVisit);
      const hoursSince = timeSinceLastVisit / (1000 * 60 * 60);
      
      if (hoursSince < 2) {
        return greetings[3]; // Checking in again
      } else if (hoursSince < 6) {
        return greetings[4]; // Thanks for logging in
      } else if (hoursSince > 24) {
        return greetings[5]; // How are you holding up
      }
    }
    
    // Random fallback greetings
    const randomIndex = Math.floor(Math.random() * (greetings.length - 3)) + 6;
    return greetings[randomIndex];
  };

  useEffect(() => {
    setCurrentGreeting(getDynamicGreeting());
    localStorage.setItem('lastVisit', Date.now().toString());
  }, []);

  const handleMoodSelection = (mood: string) => {
    console.log('Selected mood:', mood);
    // Store mood selection and navigate to check-in
    localStorage.setItem('initialMood', mood);
    navigate('/checkin');
  };

  const handleQuickCheckin = () => {
    navigate('/checkin');
  };

  const handleMyProgress = () => {
    navigate('/dashboard');
  };

  const handleMyDailyPlan = () => {
    navigate('/history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src="/logo.png" alt="SERENIMiND" className="h-8 mx-auto" />
          </div>

          {/* Dynamic Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {currentGreeting}
            </h1>
          </div>

          {/* Mood Selection */}
          <div className="mb-8">
            <div className="flex justify-center space-x-6">
              {/* Happy/Good */}
              <button
                onClick={() => handleMoodSelection('good')}
                className="flex flex-col items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl mb-2 hover:border-teal-400 transition-colors">
                  😊
                </div>
              </button>

              {/* Neutral/Okay */}
              <button
                onClick={() => handleMoodSelection('okay')}
                className="flex flex-col items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl mb-2 hover:border-teal-400 transition-colors">
                  😐
                </div>
              </button>

              {/* Sad/Not Great */}
              <button
                onClick={() => handleMoodSelection('not_great')}
                className="flex flex-col items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl mb-2 hover:border-teal-400 transition-colors">
                  😔
                </div>
              </button>
            </div>
          </div>

          {/* Quick Check-in Button */}
          <div className="mb-8">
            <button
              onClick={handleQuickCheckin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center"
            >
              <Plus size={24} className="mr-2" />
              Quick Chek-in
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-center space-x-12">
            {/* My Progress */}
            <button
              onClick={handleMyProgress}
              className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <TrendingUp size={24} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">My Progress</span>
            </button>

            {/* My Daily Plan */}
            <button
              onClick={handleMyDailyPlan}
              className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Calendar size={24} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">My Daily Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHomePage;