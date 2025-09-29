import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import CravingChart from '../components/dashboard/CravingChart';
import Badge from '../components/ui/Badge';
import { ArrowLeft, Download, Mail, Phone, Clock, Calendar, Activity } from 'lucide-react';
import { mockPatientData } from '../data/mockData';
import { useParams, useNavigate } from 'react-router-dom';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const patient = mockPatientData.find(p => p.id === id);
  
  if (!patient) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Patient not found</h2>
          <p className="mt-2 text-gray-600">The requested patient could not be found.</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate('/patients')}
          >
            Return to Patients
          </Button>
        </div>
      </PageLayout>
    );
  }

  const lastAssessment = patient.assessments
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  const getAssessmentStatus = () => {
    if (!lastAssessment) return { label: 'No Data', variant: 'secondary' };
    
    const daysSinceLastAssessment = Math.floor(
      (Date.now() - lastAssessment.timestamp) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastAssessment === 0) return { label: 'Updated Today', variant: 'success' };
    if (daysSinceLastAssessment === 1) return { label: 'Yesterday', variant: 'success' };
    if (daysSinceLastAssessment <= 3) return { label: 'Recent', variant: 'success' };
    if (daysSinceLastAssessment <= 7) return { label: 'This Week', variant: 'warning' };
    return { label: 'Needs Update', variant: 'danger' };
  };

  const status = getAssessmentStatus();

  return (
    <PageLayout
      title={patient.name}
      subtitle="Patient Profile and Assessment History"
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={18} />}
            onClick={() => navigate('/patients')}
          >
            Back to Patients
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={18} />}
            onClick={() => console.log('Export patient data')}
          >
            Export Data
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info Card */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-2xl font-semibold">
                {patient.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <a href={`mailto:${patient.email}`} className="hover:text-teal-600">
                      {patient.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Patient since Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">Last Assessment</span>
                </div>
                <Badge variant={status.variant as any} size="sm">{status.label}</Badge>
              </div>
              
              {lastAssessment && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Intensity</span>
                    <span className="font-semibold">{lastAssessment.intensity}/7</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Trigger</span>
                    <span className="text-sm text-gray-600">{lastAssessment.trigger}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Date</span>
                    <span className="text-sm text-gray-600">
                      {new Date(lastAssessment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Analysis */}
        <div className="lg:col-span-2">
          <CravingChart 
            assessments={patient.assessments}
            title="Assessment History"
          />
        </div>

        {/* Assessment Summary */}
        <Card className="lg:col-span-3">
          <CardHeader
            title="Recent Assessments"
            subtitle="Latest assessment submissions"
          />
          <CardContent>
            <div className="space-y-4">
              {patient.assessments
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
                .map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                        <Activity size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(assessment.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {assessment.trigger} • {assessment.emotion}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={assessment.intensity <= 3 ? 'success' : assessment.intensity <= 5 ? 'warning' : 'danger'}>
                        {assessment.intensity}/7
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => console.log('View assessment:', assessment.id)}
                      >
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PatientDetailPage;