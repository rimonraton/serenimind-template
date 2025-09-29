export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'clinician' | 'admin';
  profilePicture?: string;
}

export interface CravingAssessment {
  id: string;
  patientId: string;
  timestamp: number;
  intensity: number; // 1-7 scale
  location: string;
  emotion: string;
  trigger: string;
  notes?: string;
}

export interface PatientData {
  id: string;
  name: string;
  email: string;
  assessments: CravingAssessment[];
  clinicianId: string;
}

export type ChartTimeframe = 'day' | 'week' | 'month' | 'year';

export interface AssessmentResponse {
  questionId: number;
  answer: string;
  triggers?: string[];
}

export interface SubmissionHistoryItem {
  submissionId: string;
  userId: string;
  submittedAt: string;
  responses: {
    questionId: number;
    answer: string;
    timestamp: string;
  }[];
  averageIntensity: number;
}