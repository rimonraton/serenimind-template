import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  actions 
}) => {
  return (
    <div className="pt-16">
      {(title || actions) && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
              </div>
              {actions && <div>{actions}</div>}
            </div>
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;