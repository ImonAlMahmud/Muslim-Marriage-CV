export type Language = 'en' | 'bn' | 'bilingual';

export interface Biodata {
  // Basic Information
  fullName: string;
  gender: 'Male' | 'Female' | '';
  dob: string;
  age: string;
  height: string;
  weight: string;
  bloodGroup: string;
  maritalStatus: string;
  nationality: string;
  presentAddress: string;
  permanentAddress: string;
  contactNumber: string;
  email: string;
  profilePhoto?: string;

  // Religious Information
  religion: string;
  orientation: string;
  madhhab: string;
  salahStatus: string;
  fastingStatus: string;
  quranAbility: string;
  religiousBackground: string;
  dressStatus?: string; // Hijab/Beard
  lifestyleSummary: string;

  // Education
  highestQualification: string;
  institution: string;
  subject: string;
  passingYear: string;
  additionalEducation: string;

  // Profession
  occupation: string;
  jobTitle: string;
  workplace: string;
  income: string;
  workLocation: string;
  careerSummary: string;

  // Family Information
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brothersCount: string;
  sistersCount: string;
  familyType: string;
  familyEnvironment: string;
  familyBackground: string;

  // Personal Overview
  complexion: string;
  healthCondition: string;
  languages: string[];
  hobbies: string;
  personality: string;
  lifestyle: string;
  futureGoals: string;

  // Marriage Preferences
  prefAgeRange: { min: string; max: string };
  prefHeightRange: { min: string; max: string };
  prefEducation: string;
  prefOccupation: string;
  prefLocation: string;
  prefReligiousQualities: string;
  prefFamilyExpectations: string;
  prefOther: string;

  // Additional Notes
  selfDescription: string;
  marriageReason: string;
  specialNotes: string;
  guardianContact: string;

  // Custom Fields
  customFields?: Array<{ id: string; label: string; value: string }>;
}

export const INITIAL_BIODATA: Biodata = {
  fullName: '',
  gender: '',
  dob: '',
  age: '',
  height: '',
  weight: '',
  bloodGroup: '',
  maritalStatus: '',
  nationality: 'Bangladeshi',
  presentAddress: '',
  permanentAddress: '',
  contactNumber: '',
  email: '',
  religion: 'Islam',
  orientation: '',
  madhhab: '',
  salahStatus: '',
  fastingStatus: '',
  quranAbility: '',
  religiousBackground: '',
  lifestyleSummary: '',
  highestQualification: '',
  institution: '',
  subject: '',
  passingYear: '',
  additionalEducation: '',
  occupation: '',
  jobTitle: '',
  workplace: '',
  income: '',
  workLocation: '',
  careerSummary: '',
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  brothersCount: '',
  sistersCount: '',
  familyType: '',
  familyEnvironment: '',
  familyBackground: '',
  complexion: '',
  healthCondition: '',
  languages: [],
  hobbies: '',
  personality: '',
  lifestyle: '',
  futureGoals: '',
  prefAgeRange: { min: '', max: '' },
  prefHeightRange: { min: '', max: '' },
  prefEducation: '',
  prefOccupation: '',
  prefLocation: '',
  prefReligiousQualities: '',
  prefFamilyExpectations: '',
  prefOther: '',
  selfDescription: '',
  marriageReason: '',
  specialNotes: '',
  guardianContact: '',
  customFields: [],
};
