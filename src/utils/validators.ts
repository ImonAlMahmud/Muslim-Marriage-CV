import { z } from 'zod';

export const biodataSchema = z.object({
  // Basic Information
  fullName: z.string().min(2, 'Full name is required / নাম আবশ্যক'),
  gender: z.enum(['Male', 'Female', '']).refine((val) => val !== '', 'Gender is required / লিঙ্গ আবশ্যক'),
  dob: z.string().min(1, 'Date of birth is required / জন্মতারিখ আবশ্যক'),
  age: z.string().optional(),
  height: z.string().min(1, 'Height is required / উচ্চতা আবশ্যক'),
  weight: z.string().optional(),
  bloodGroup: z.string().optional(),
  maritalStatus: z.string().min(1, 'Marital status is required / বৈবাহিক অবস্থা আবশ্যক'),
  nationality: z.string().min(1, 'Nationality is required / জাতীয়তা আবশ্যক'),
  presentAddress: z.string().min(5, 'Present address is required / বর্তমান ঠিকানা আবশ্যক'),
  permanentAddress: z.string().min(5, 'Permanent address is required / স্থায়ী ঠিকানা আবশ্যক'),
  contactNumber: z.string().optional(),
  email: z.string().email('Invalid email / ইমেইল সঠিক নয়').optional().or(z.literal('')),
  profilePhoto: z.string().optional(),

  // Religious Information
  religion: z.string().min(1, 'Religion is required'),
  orientation: z.string().optional(),
  madhhab: z.string().optional(),
  salahStatus: z.string().optional(),
  fastingStatus: z.string().optional(),
  quranAbility: z.string().optional(),
  religiousBackground: z.string().optional(),
  dressStatus: z.string().optional(),
  lifestyleSummary: z.string().optional(),

  // Education
  highestQualification: z.string().min(1, 'Highest qualification is required / শিক্ষাগত যোগ্যতা আবশ্যক'),
  institution: z.string().min(2, 'Institution is required / প্রতিষ্ঠানের নাম আবশ্যক'),
  subject: z.string().optional(),
  passingYear: z.string().optional(),
  additionalEducation: z.string().optional(),

  // Profession
  occupation: z.string().min(1, 'Occupation is required / পেশা আবশ্যক'),
  jobTitle: z.string().optional(),
  workplace: z.string().optional(),
  income: z.string().optional(),
  workLocation: z.string().optional(),
  careerSummary: z.string().optional(),

  // Family Information
  fatherName: z.string().min(2, 'Father\'s name is required / পিতার নাম আবশ্যক'),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(2, 'Mother\'s name is required / মাতার নাম আবশ্যক'),
  motherOccupation: z.string().optional(),
  brothersCount: z.string().optional(),
  sistersCount: z.string().optional(),
  familyType: z.string().optional(),
  familyEnvironment: z.string().optional(),
  familyBackground: z.string().min(10, 'Family background is required / পরিবার সম্পর্কে লিখুন'),

  // Personal Overview
  complexion: z.string().optional(),
  healthCondition: z.string().optional(),
  languages: z.array(z.string()).optional(),
  hobbies: z.string().optional(),
  personality: z.string().min(10, 'Personality breakdown is required / নিজের সম্পর্কে লিখুন'),
  lifestyle: z.string().optional(),
  futureGoals: z.string().optional(),

  // Marriage Preferences
  prefAgeRange: z.object({
    min: z.string().optional(),
    max: z.string().optional(),
  }),
  prefHeightRange: z.object({
    min: z.string().optional(),
    max: z.string().optional(),
  }),
  prefEducation: z.string().optional(),
  prefOccupation: z.string().optional(),
  prefLocation: z.string().optional(),
  prefReligiousQualities: z.string().min(10, 'Preferred religious qualities is required / ধর্মীয় বৈশিষ্ট্য আবশ্যক'),
  prefFamilyExpectations: z.string().optional(),
  prefOther: z.string().optional(),

  // Additional Notes
  selfDescription: z.string().min(20, 'Self description is required / সংক্ষিপ্ত জীবনবৃত্তান্ত আবশ্যক'),
  marriageReason: z.string().optional(),
  specialNotes: z.string().optional(),
  guardianContact: z.string().optional(),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
  })).optional(),
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
