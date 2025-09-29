import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  statement: string;
}

const DetailedAssessmentPage = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: AssessmentQuestion[] = [
    {
      id: 'q1',
      statement: 'Right now my urge to drink or use feels overwhelming.'
    },
    {
      id: 'q2',
      statement: 'I feel like I would do almost anything to drink or use right now.'
    },
    {
      id: 'q3',
      statement: 'I\'m thinking about drinking or using as soon as I can.'
    },
    {
      id: 'q4',
      statement: 'Drinking or using has been on my mind most of the time today.'
    },
    {
      id: 'q5',
      statement: 'Even serious problems wouldn\'t bother me if I drank or used right now.'
    },
    {
      id: 'q6',
      statement: 'If I drank or used right now, it would feel like all my problems disappeared.'
    },
    {
      id: 'q7',
      statement: 'If I drank or used right now, I\'d feel less worried about my daily problems.'
    }
  ];

  const ratingOptions = [
    { value: 0, label: 'Not at all', color: 'text-purple-600' },
    { value: 1, label: 'A little', color: 'text-purple-600' },
    { value: 2, label: 'Somewhat', color: 'text-purple-600' },
    { value: 3, label: 'Quite a bit', color: 'text-purple-600' },
    { value: 4, label: 'Extremely', color: 'text-purple-600' }
  ];

  const handleRatingSelect = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log('Assessment responses:', responses);
    setIsCompleted(true);
    
    // Redirect after success
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/');
  };

  const allQuestionsAnswered = questions.every(q => responses[q.id] !== undefined);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Assessment Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for completing your detailed assessment.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 text-lg rounded-2xl"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="SERENIMiND" className="h-8" />
          </div>
          
          <div className="text-sm text-gray-500">
            {Object.keys(responses).length} of {questions.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-2">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-3 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Please tell us how much you agree with each statement right now
              </h1>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-lg font-medium text-gray-900 mb-4">
                      "{question.statement}"
                    </p>
                    
                    {/* Rating Options */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleRatingSelect(question.id, option.value)}
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${responses[question.id] === option.value
                              ? 'bg-purple-600 text-white shadow-lg scale-105'
                              : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Visual separator */}
                  {index < questions.length - 1 && (
                    <div className="border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className="w-full py-4 text-lg rounded-2xl"
                rightIcon={<ArrowRight size={20} />}
              >
                Complete Assessment
              </Button>
              
              {!allQuestionsAnswered && (
                <p className="text-sm text-gray-500 mt-2">
                  Please answer all questions to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAssessmentPage;