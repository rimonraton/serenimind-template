import type { User, CravingAssessment, PatientData } from "../types";

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "clinician",
    profilePicture:
      "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "2",
    name: "Michael Thompson",
    email: "michael.t@example.com",
    role: "patient",
    profilePicture:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "3",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    role: "patient",
  },
  {
    id: "4",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    role: "patient",
  },
];

// Generate random craving assessments for demo
const emotions = [
  "Stressed",
  "Anxious",
  "Sad",
  "Bored",
  "Angry",
  "Happy",
  "Social",
];
const locations = [
  "Home",
  "Work",
  "Social gathering",
  "Restaurant",
  "Bar",
  "Outdoors",
  "Friend's place",
];
const triggers = [
  "Work stress",
  "Argument",
  "Social pressure",
  "Seeing others drinking",
  "Celebration",
  "Habit",
  "Boredom",
];

const generateMockAssessments = (
  patientId: string,
  count: number
): CravingAssessment[] => {
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return Array.from({ length: count }, (_, i) => {
    const date = generateRandomDate(oneMonthAgo, now);
    return {
      id: `a${patientId}-${i}`,
      patientId,
      timestamp: date.getTime(),
      intensity: Math.floor(Math.random() * 7) + 1,
      location: locations[Math.floor(Math.random() * locations.length)],
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      trigger: triggers[Math.floor(Math.random() * triggers.length)],
      notes:
        Math.random() > 0.7
          ? "Additional context about this craving event."
          : undefined,
    };
  });
};

// Mock Patient Data
export const mockPatientData: PatientData[] = [
  {
    id: "2",
    name: "Michael Thompson",
    email: "michael.t@example.com",
    assessments: generateMockAssessments("2", 25),
    clinicianId: "1",
  },
  {
    id: "3",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    assessments: generateMockAssessments("3", 18),
    clinicianId: "1",
  },
  {
    id: "4",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    assessments: generateMockAssessments("4", 12),
    clinicianId: "1",
  },
];

// Get current user (for demo purposes)
let currentUserEmail: string | null = null;

export const getCurrentUser = (): User => {
  if (!currentUserEmail) {
    return mockUsers[0]; // Default to clinician
  }
  const user = mockUsers.find((u) => u.email === currentUserEmail);
  return user || mockUsers[0];
};

export const setCurrentUser = (email: string) => {
  currentUserEmail = email;
};

// Get patient data for a clinician
export const getPatientDataForClinician = (
  clinicianId: string
): PatientData[] => {
  return mockPatientData.filter((p) => p.clinicianId === clinicianId);
};

// Get assessments for a specific patient
export const getAssessmentsForPatient = (
  patientId: string
): CravingAssessment[] => {
  const patient = mockPatientData.find((p) => p.id === patientId);
  return patient?.assessments || [];
};
