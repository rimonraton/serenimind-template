import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';

interface CheckinStep {
  id: string;
  question: string;
  subtitle?: string;
  options: {
    emoji: string;
    label: string;
    value: string;
  }[];
}

const QuickCheckinPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const steps: CheckinStep[] = [
    {
      id: 'mood',
      question: 'Hi Alex, how are you today?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '😊', label: 'Good', value: 'good' },
        { emoji: '😐', label: 'Okay', value: 'okay' },
        { emoji: '😔', label: 'Not great', value: 'not_great' }
      ]
    },
    {
      id: 'emotional',
      question: 'How are you feeling emotionally right now?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '🤯', label: 'Stressed / Anxious', value: 'stressed_anxious' },
        { emoji: '😞', label: 'Low / Sad', value: 'low_sad' },
        { emoji: '😶', label: 'Alone', value: 'alone' },
        { emoji: '😌', label: 'Calm / Steady', value: 'calm_steady' },
        { emoji: '😊', label: 'Hopeful', value: 'hopeful' },
        { emoji: '💕', label: 'Connected', value: 'connected' }
      ]
    },
    {
      id: 'environment',
      question: 'Is your environment affecting you in any way right now?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '🏠', label: 'Place reminds me of using', value: 'place_reminds' },
        { emoji: '🎵', label: 'Music brings back old memories', value: 'music_memories' },
        { emoji: '🏡', label: 'Safe place', value: 'safe_place' },
        { emoji: '🎶', label: 'Uplifting music', value: 'uplifting_music' }
      ]
    },
    {
      id: 'social',
      question: 'How are your interactions with others today?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '💔', label: 'Argument / Rejected', value: 'argument_rejected' },
        { emoji: '🍺', label: 'Around people using', value: 'around_people_using' },
        { emoji: '💬', label: 'Good conversation', value: 'good_conversation' },
        { emoji: '👫', label: 'Supportive people', value: 'supportive_people' }
      ]
    },
    {
      id: 'physical',
      question: 'How is your body feeling right now?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '🛏️', label: "Didn't sleep well", value: 'didnt_sleep_well' },
        { emoji: '🤒', label: 'In pain / Run down', value: 'in_pain_run_down' },
        { emoji: '😴', label: 'Well-rested', value: 'well_rested' },
        { emoji: '💪', label: 'Strong / Energized', value: 'strong_energized' }
      ]
    },
    {
      id: 'thoughts',
      question: 'Where are your thoughts and focus right now?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '💭', label: 'Thinking about using', value: 'thinking_about_using' },
        { emoji: '🤔', label: 'Remembering "good times" with using', value: 'remembering_good_times' },
        { emoji: '🎯', label: 'Focused on what matters', value: 'focused_on_what_matters' },
        { emoji: '🔄', label: 'Reminding myself of progress', value: 'reminding_progress' }
      ]
    },
    {
      id: 'situation',
      question: 'What situation are you in at the moment?',
      subtitle: 'Just tap what feels closest.',
      options: [
        { emoji: '🏢', label: 'Stress after work', value: 'stress_after_work' },
        { emoji: '🎉', label: 'At a party or event', value: 'at_party_event' },
        { emoji: '🧘', label: 'Doing something relaxing', value: 'doing_something_relaxing' },
        { emoji: '🎊', label: 'Enjoying without cravings', value: 'enjoying_without_cravings' }
      ]
    }
  ];

  const handleOptionSelect = (value: string) => {
    const stepId = steps[currentStep].id;
    setResponses(prev => ({ ...prev, [stepId]: value }));
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    } else {
      // Complete the check-in
      setTimeout(() => {
        setIsCompleted(true);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleComplete = () => {
    console.log('Check-in responses:', responses);
    navigate('/dashboard');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check-in Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for taking the time to check in with yourself today.
            </p>
            <Button
              variant="primary"
              onClick={handleComplete}
              className="w-full py-4 text-lg rounded-2xl"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="SERENIMiND" className="h-6" />
          </div>
          
          <div className="text-xs text-gray-500">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 bg-gray-200">
          <div 
            className="h-full bg-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col justify-center">
            {/* Question */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {currentStepData.question}
              </h1>
              {currentStepData.subtitle && (
                <p className="text-sm text-gray-600 italic">
                  {currentStepData.subtitle}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentStepData.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`
                    w-full flex items-center p-3 rounded-xl border-2 transition-all duration-200
                    hover:border-teal-300 hover:bg-teal-50 hover:scale-105
                    ${responses[currentStepData.id] === option.value 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-200 bg-white'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span className="text-base font-medium text-gray-900 text-left">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-4 py-3 flex-shrink-0">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-teal-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>
    </div>
  );
};

export default QuickCheckinPage;