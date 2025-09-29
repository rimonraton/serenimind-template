import React from 'react';

interface CravingRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  question: string;
}

const CravingRatingInput: React.FC<CravingRatingInputProps> = ({
  value,
  onChange,
  question,
}) => {
  const ratings = [1, 2, 3, 4, 5, 6, 7];

  // Get color based on rating value
  const getRatingColor = (rating: number) => {
    if (rating <= 2) return 'bg-green-500';
    if (rating <= 5) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question}
      </label>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Strongly Disagree
          </span>
          <span className="text-sm font-medium text-gray-500">
            Strongly Agree
          </span>
        </div>

        <div className="flex justify-between">
          {ratings.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
                ${
                  value === rating
                    ? `${getRatingColor(rating)} text-white ring-2 ring-offset-2 ring-${getRatingColor(rating).replace('bg-', '')}`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              {rating}
            </button>
          ))}
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full ${getRatingColor(value)}`}
            style={{ width: `${(value / 7) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CravingRatingInput;