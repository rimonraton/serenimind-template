import React, { useState } from 'react';
import Button from '../ui/Button';
import { Save } from 'lucide-react';
import CravingRatingInput from './CravingRatingInput';
import TriggerSelection from './TriggerSelection';

interface AssessmentFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [ratings, setRatings] = useState({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
    q5: 1,
    q6: 1,
    q7: 1,
  });
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      text: 'My desire to drink or use drugs now seems overwhelming​.',
    },
    {
      id: 2,
      text: 'I would do almost anything to have a drink or take some drugs right now​.',
    },
    {
      id: 3,
      text: 'I thought about drinking or using drug as soon as I possibly could.​',
    },
    {
      id: 4,
      text: 'I thought about having a drink or use drug most of the time.​',
    },
    {
      id: 5,
      text: 'Even major problems in my life would not bother me if I drank or used drugs now',
    },
    {
      id: 6,
      text: 'I would feel as if all the bad things in my life had disappeared if I drank or used drugs now',
    },
    {
      id: 7,
      text: 'I would feel less worried about my daily problems if I drank or used drugs now',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const intensities = questions.map(q => ({
        questionId: q.id,
        answer: ratings[`q${q.id}` as keyof typeof ratings].toString(),
      }));

      const responses = {
        triggers: selectedTriggers,
        intensities: intensities
      };

      console.log('Submitting assessment with responses:', responses);

      const averageIntensity = Math.round(
        Object.values(ratings).reduce((sum, val) => sum + val, 0) /
          questions.length
      );

      const data = {
        timestamp: Date.now(),
        intensity: averageIntensity,
        ratings,
        triggers: selectedTriggers,
      };

      onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit assessment');
      console.error('Assessment submission error:', err);
    }
  };

  const handleTriggerSelection = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      <div className="space-y-6 animate-fadeIn">
        <div className="mb-10">
          <h2 className="text-lg font-semibold">Rate your craving intensity</h2>
          <p className="text-gray-600">
            How strongly do you agree with each statement?
          </p>
        </div>

        {questions.map((question) => (
          <CravingRatingInput
            key={question.id}
            value={ratings[`q${question.id}` as keyof typeof ratings]}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, [`q${question.id}`]: value }))
            }
            question={question.text}
          />
        ))}
      </div>

      <div className="space-y-6 animate-fadeIn">
        <TriggerSelection
          selectedTriggers={selectedTriggers}
          onSelectTrigger={handleTriggerSelection}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Save size={18} />}
        >
          Save Assessment
        </Button>
      </div>
    </form>
  );
};

export default AssessmentForm;