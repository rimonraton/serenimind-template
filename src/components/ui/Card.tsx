import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  onClick,
  hoverEffect = false
}) => {
  const hoverClasses = hoverEffect 
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  action 
}) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Card;