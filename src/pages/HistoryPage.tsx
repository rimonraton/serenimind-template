import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { 
  Clock, 
  Calendar, 
  RefreshCw, 
  Download, 
  Filter,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { getAssessmentsForPatient } from '../data/mockData';

const HistoryPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedAssessments, setExpandedAssessments] = useState<Set<string>>(new Set());

  // Get mock assessment data
  const allAssessments = getAssessmentsForPatient('2');
  
  // Filter assessments by date range
  const filteredAssessments = allAssessments.filter(assessment => {
    if (!startDate && !endDate) return true;
    
    const assessmentDate = new Date(assessment.timestamp);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && assessmentDate < start) return false;
    if (end && assessmentDate > end) return false;
    
    return true;
  }).sort((a, b) => b.timestamp - a.timestamp);

  const handleDateFilter = () => {
    console.log('Filtering by date range:', { startDate, endDate });
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const toggleAssessmentDetails = (assessmentId: string) => {
    const newExpanded = new Set(expandedAssessments);
    if (newExpanded.has(assessmentId)) {
      newExpanded.delete(assessmentId);
    } else {
      newExpanded.add(assessmentId);
    }
    setExpandedAssessments(newExpanded);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'success';
    if (intensity <= 5) return 'warning';
    return 'danger';
  };

  const getIntensityTrend = (currentIndex: number) => {
    if (currentIndex >= filteredAssessments.length - 1) return null;
    
    const current = filteredAssessments[currentIndex].intensity;
    const previous = filteredAssessments[currentIndex + 1].intensity;
    const difference = current - previous;
    
    if (Math.abs(difference) < 1) return null;
    
    return {
      direction: difference > 0 ? 'up' : 'down',
      value: Math.abs(difference)
    };
  };

  return (
    <PageLayout
      title="Assessment History"
      subtitle={`Track your progress over time • ${filteredAssessments.length} assessments`}
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw size={16} />}
            onClick={() => console.log('Refresh')}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={16} />}
            onClick={() => console.log('Export history')}
          >
            Export
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader title="Filter Assessments" subtitle="Filter by date range" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mb-0"
                />
                <Input
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mb-0"
                />
                <div className="flex items-end space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDateFilter}
                  >
                    Apply Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline */}
        {filteredAssessments.length > 0 ? (
          <Card>
            <CardHeader
              title="Assessment Timeline"
              subtitle={`${filteredAssessments.length} assessments shown`}
            />
            <CardContent className="relative">
              <div className="space-y-6">
                {filteredAssessments.map((assessment, index) => {
                  const { date, time } = formatDate(assessment.timestamp);
                  const isExpanded = expandedAssessments.has(assessment.id);
                  const trend = getIntensityTrend(index);
                  
                  return (
                    <div key={assessment.id} className="relative">
                      {/* Timeline line */}
                      {index !== filteredAssessments.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      <div className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="relative flex items-center justify-center flex-none w-12 h-12 rounded-full bg-teal-50 text-teal-600">
                          <Clock size={20} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-white rounded-lg border border-gray-100 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <div>
                                <span className="text-sm font-medium text-gray-900">{date}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{time}</span>
                              </div>
                              {trend && (
                                <div className={`flex items-center text-sm ${
                                  trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {trend.direction === 'up' ? (
                                    <TrendingUp size={14} className="mr-1" />
                                  ) : (
                                    <TrendingDown size={14} className="mr-1" />
                                  )}
                                  <span>{trend.direction === 'up' ? '+' : '-'}{trend.value}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getIntensityColor(assessment.intensity)}>
                                Intensity: {assessment.intensity}/7
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAssessmentDetails(assessment.id)}
                                rightIcon={isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              >
                                {isExpanded ? 'Hide' : 'Show'} Details
                              </Button>
                            </div>
                          </div>
                          
                          {/* Basic info */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Trigger:</span>
                              <span className="ml-2 text-gray-900">{assessment.trigger}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Emotion:</span>
                              <span className="ml-2 text-gray-900">{assessment.emotion}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <span className="ml-2 text-gray-900">{assessment.location}</span>
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <h4 className="text-sm font-medium text-gray-900 mb-3">Additional Details</h4>
                              {assessment.notes ? (
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                  {assessment.notes}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-500 italic">No additional notes</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
              <p className="text-gray-500 mb-4">
                {startDate || endDate 
                  ? 'No assessments found for the selected date range.'
                  : 'You haven\'t submitted any assessments yet.'
                }
              </p>
              {startDate || endDate ? (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button variant="primary" onClick={() => navigate('/assessment')}>
                  Create Your First Assessment
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default HistoryPage;