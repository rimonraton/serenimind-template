import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import CravingChart from '../components/dashboard/CravingChart';
import Badge from '../components/ui/Badge';
import { 
  Plus, 
  Download, 
  Award, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Calendar
} from 'lucide-react';
import { getAssessmentsForPatient } from '../data/mockData';

const DashboardPage = () => {
  const assessments = getAssessmentsForPatient('2'); // Mock patient data

  // Calculate streak
  const getStreak = () => {
    if (assessments.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const assessmentsByDay: Record<string, boolean> = {};
    assessments.forEach((a) => {
      const date = new Date(a.timestamp);
      date.setHours(0, 0, 0, 0);
      assessmentsByDay[date.toISOString()] = true;
    });

    // Check if logged today or yesterday to continue streak
    const mostRecentLogged =
      assessmentsByDay[today.toISOString()] ||
      assessmentsByDay[yesterday.toISOString()];
    if (!mostRecentLogged) return 0;

    let streak = 1;
    let currentDate = yesterday;

    while (assessmentsByDay[currentDate.toISOString()]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streak = getStreak();

  // Calculate stats
  const totalAssessments = assessments.length;
  const averageIntensity = assessments.length > 0 
    ? Math.round((assessments.reduce((sum, a) => sum + a.intensity, 0) / assessments.length) * 10) / 10
    : 0;

  return (
    <PageLayout
      title="Dashboard"
      subtitle="Assessment overview and analytics"
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Download size={18} />}
            onClick={() => console.log('Export data')}
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => console.log('New assessment')}
          >
            New Assessment
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Assessments</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalAssessments}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Intensity</p>
                <h3 className="text-2xl font-bold text-gray-900">{averageIntensity}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Streak</p>
                <h3 className="text-2xl font-bold text-gray-900">{streak} days</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader
            title="Your Progress"
            subtitle="Assessment tracking overview"
          />
          <CardContent>
            <div className="flex flex-wrap items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-gray-900">
                  Your craving intensity has been stable lately
                </h3>
                <p className="text-gray-500">
                  Continue tracking to see more personalized insights
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download size={16} />}
                onClick={() => console.log('Download report')}
              >
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center h-full py-6">
            <div className="mb-2">
              <Award size={36} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {streak} Day Streak
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              {streak > 0
                ? `You've logged assessments for ${streak} consecutive days!`
                : 'Start logging daily to build your streak!'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <CravingChart
          assessments={assessments}
          title="Assessment History"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader
          title="Recent Activity"
          subtitle="Latest assessments and updates"
        />
        <CardContent>
          <div className="space-y-4">
            {assessments.slice(0, 5).map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Assessment completed</p>
                    <p className="text-sm text-gray-500">{new Date(assessment.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant={assessment.intensity <= 3 ? 'success' : assessment.intensity <= 5 ? 'warning' : 'danger'}>
                  Intensity: {assessment.intensity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DashboardPage;