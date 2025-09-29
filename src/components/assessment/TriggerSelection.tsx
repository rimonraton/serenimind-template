import React, { useState } from 'react';

interface TriggerOption {
  icon: string;
  label: string;
}

interface TriggerGroup {
  title: string;
  category: string;
  options: TriggerOption[];
}

interface TriggerSelectionProps {
  selectedTriggers: string[];
  onSelectTrigger: (trigger: string) => void;
}

const triggerGroups: TriggerGroup[] = [
  {
    title: 'How are you feeling right now?',
    category: 'Emotional triggers',
    options: [
      { icon: '😟', label: 'Anxious or overwhelmed' },
      { icon: '😔', label: 'Sad or hopeless' },
      { icon: '😠', label: 'Angry or frustrated' },
      { icon: '😣', label: 'Guilty or ashamed' },
      { icon: '😑', label: 'Bored or restless' },
      { icon: '😕', label: 'Lonely or disconnected' },
    ],
  },
  {
    title: "Where are you and what's around you?",
    category: 'Environmental triggers',
    options: [
      { icon: '🏠', label: "I'm in a place where I used before" },
      { icon: '👃', label: 'I smell something that reminds me of using' },
      { icon: '🎵', label: 'I heard music that takes me back' },
      { icon: '👥', label: "I'm around people who are drinking or using" },
    ],
  },
  {
    title: 'Have you been around anyone or felt isolated?',
    category: 'Social triggers',
    options: [
      { icon: '💔', label: 'I had an argument or felt rejected' },
      { icon: '🙅', label: 'I felt judged or misunderstood' },
      { icon: '👤', label: "I've been alone too long" },
      { icon: '🍻', label: "I'm around people who are drinking or using" },
    ],
  },
  {
    title: 'How is your body feeling today?',
    category: 'Physical triggers',
    options: [
      { icon: '😴', label: "I didn't sleep well" },
      { icon: '🤕', label: "I'm in physical pain" },
      { icon: '😫', label: 'I feel tired or drained' },
      { icon: '🤢', label: 'I feel sick or nauseous' },
    ],
  },
  {
    title: 'What thoughts are going through your mind?',
    category: 'Cognitive triggers',
    options: [
      { icon: '💭', label: 'I keep thinking about using' },
      { icon: '🥺', label: 'I feel like I deserve it or need a break' },
      { icon: '😇', label: "I'm romanticizing the past" },
      { icon: '😬', label: 'I already messed up, so why not? Done.' },
    ],
  },
  {
    title: "What's going on today?",
    category: 'Situational triggers',
    options: [
      { icon: '🏢', label: "It's after a stressful workday" },
      { icon: '📅', label: "It's the weekend or I have free time" },
      { icon: '🎉', label: 'There was a party or event' },
      { icon: '💵', label: 'I just got paid or have extra money' },
      { icon: '🎂', label: "It's a holiday, anniversary, or special date" },
    ],
  },
];

const TriggerSelection: React.FC<TriggerSelectionProps> = ({
  selectedTriggers,
  onSelectTrigger,
}) => {
  const [customTrigger, setCustomTrigger] = useState('');

  const handleCustomTriggerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTrigger.trim()) {
      onSelectTrigger(customTrigger.trim());
      setCustomTrigger('');
    }
  };

  return (
    <div className="space-y-8 mt-10">
      <h2 className="text-lg font-semibold mb-6">
        What might be triggering your craving right now?
      </h2>
      <p className="text-gray-600 mb-4">Select all that apply</p>

      {triggerGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <h3 className="text-lg font-medium text-green-600">{group.title}</h3>
          <span className="pl-3 text-slate-600 text-md font-extralight">
            ({group.category})
          </span> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.options.map((option, optionIndex) => {
              const isSelected = selectedTriggers.includes(option.label);
              return (
                <button
                  type="button"
                  key={optionIndex}
                  onClick={() => onSelectTrigger(option.label)}
                  className={`
                    flex items-center p-3 rounded-lg border transition-all duration-200
                    ${
                      isSelected
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                    }
                  `}
                >
                  <span className="text-2xl mr-3">{option.icon}</span>
                  <span className="text-left">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-green-600">Something else?</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTrigger}
            onChange={(e) => setCustomTrigger(e.target.value)}
            placeholder="Type your own trigger..."
            className="flex-1 p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
          <button
            onClick={handleCustomTriggerSubmit}
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!customTrigger.trim()}
          >
            Add
          </button>
        </div>
      </div>

      {selectedTriggers.length > 0 && (
        <div className="pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected triggers:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedTriggers.map((trigger, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
              >
                {trigger}
                <button
                  type="button"
                  onClick={() => onSelectTrigger(trigger)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerSelection;