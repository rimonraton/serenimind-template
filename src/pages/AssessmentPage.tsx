import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import AssessmentForm from '../components/assessment/AssessmentForm';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmitAssessment = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log('Submitting assessment:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mb-6">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Completed!</h2>
            <p className="text-gray-600">
              Thank you for completing your assessment. Your responses have been recorded.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="New Assessment"
      subtitle="Track your current state and cravings"
      actions={
        <Button
          variant="outline"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      }
    >
      <div className="max-w-4xl mx-auto">
        <Card className="animate-fadeIn">
          <CardHeader
            title="How are you feeling?"
            subtitle="Take a moment to reflect on your current state"
          />
          <CardContent className="mt-6">
            <AssessmentForm
              onSubmit={handleSubmitAssessment}
              isLoading={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AssessmentPage;