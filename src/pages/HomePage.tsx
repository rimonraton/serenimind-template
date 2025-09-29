import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Users, Shield, Stethoscope, Activity, ChartBar as BarChart3, FileText, Settings, CircleUser as UserCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const pages = [
    {
      id: 'checkin',
      title: 'Quick Check-in',
      description: 'Start your daily wellness check-in',
      icon: <Activity size={48} className="text-blue-600" />,
      color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
      path: '/checkin'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview and analytics dashboard',
      icon: <BarChart3 size={48} className="text-teal-600" />,
      color: 'border-teal-200 hover:border-teal-400 hover:bg-teal-50',
      path: '/dashboard'
    },
    {
      id: 'assessment',
      title: 'Full Assessment',
      description: 'Complete detailed craving assessment',
      icon: <FileText size={48} className="text-green-600" />,
      color: 'border-green-200 hover:border-green-400 hover:bg-green-50',
      path: '/assessment'
    },
    {
      id: 'detailed-assessment',
      title: 'Detailed Assessment',
      description: 'Comprehensive craving intensity evaluation',
      icon: <FileText size={48} className="text-indigo-600" />,
      color: 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50',
      path: '/detailed-assessment'
    },
    {
      id: 'history',
      title: 'History',
      description: 'View assessment history and trends',
      icon: <BarChart3 size={48} className="text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
      path: '/history'
    },
    {
      id: 'patients',
      title: 'Patients',
      description: 'Patient management and monitoring',
      icon: <Users size={48} className="text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
      path: '/patients'
    },
    {
      id: 'users',
      title: 'Users',
      description: 'User management and administration',
      icon: <Shield size={48} className="text-red-600" />,
      color: 'border-red-200 hover:border-red-400 hover:bg-red-50',
      path: '/users'
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'User profile and personal settings',
      icon: <UserCircle size={48} className="text-indigo-600" />,
      color: 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50',
      path: '/profile'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Application settings and configuration',
      icon: <Settings size={48} className="text-amber-600" />,
      color: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
      path: '/settings'
    }
  ];

  const handlePageSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assessment Platform
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Healthcare assessment platform with comprehensive page templates
          </p>
          <p className="text-gray-500">
            All pages are accessible without authentication restrictions for development
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pages.map((page) => (
            <Card
              key={page.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${page.color} hover:shadow-lg transform hover:-translate-y-1`}
              onClick={() => handlePageSelect(page.path)}
            >
              <CardContent className="text-center py-8 px-6">
                <div className="mb-6 flex justify-center">
                  {page.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {page.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {page.description}
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageSelect(page.path);
                  }}
                >
                  Open {page.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Overview */}
        <Card className="border-2 border-blue-200">
          <CardContent className="py-6 px-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Platform Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Activity size={32} className="mx-auto text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900">Assessment Tools</h4>
                <p className="text-sm text-gray-600">Comprehensive craving assessment forms</p>
              </div>
              <div className="text-center">
                <BarChart3 size={32} className="mx-auto text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Analytics Dashboard</h4>
                <p className="text-sm text-gray-600">Data visualization and insights</p>
              </div>
              <div className="text-center">
                <Users size={32} className="mx-auto text-purple-600 mb-2" />
                <h4 className="font-medium text-gray-900">User Management</h4>
                <p className="text-sm text-gray-600">Patient and clinician administration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;