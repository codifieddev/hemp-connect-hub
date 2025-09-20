export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Owner {
  name: string;
  title: string;
  equityPercent: number;
}

export interface Reference {
  name: string;
  company?: string;
  firm?: string;
  bankName?: string;
  phone: string;
  email: string;
}

export interface Mistake {
  whatHappened: string;
  lesson: string;
}

export interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

export interface SignatureData {
  typedName: string;
  consent: boolean;
  drawn?: string;
  method: 'typed' | 'drawn';
  timestamp: string;
  ip?: string;
}

// Mentee Application Types
export interface MenteeStep1 {
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
  };
  company: {
    name: string;
    type: string;
    typeOther?: string;
    industry: string[];
    website?: string;
    phoneBusiness: string;
  };
  applicant_phoneMobile: string;
  referral: {
    source: string;
  };
  address: {
    business: Address;
  };
}

export interface MenteeStep2 {
  company: {
    yearsInBusiness: number;
    fiscalYearEnd: string;
    founderIsApplicant: boolean;
    ultimateDecisionMaker: boolean;
    ownership: Owner[];
  };
  governance: {
    hasBoardOfDirectors: boolean;
    hasAdvisoryBoard: boolean;
    directorsCount?: number;
  };
}

export interface MenteeStep3 {
  team: {
    fullTime: number;
    partTime: number;
    contractors: number;
    total: number;
  };
}

export interface FinancialYear {
  fullTimeEmployees: number;
  annualRevenue: number;
  revenueGrowthPercent: number;
  profitGrowthPercent: number;
  equityPercent: number;
}

export interface MenteeStep4 {
  finance: {
    years: {
      [year: string]: FinancialYear;
    };
    wasProfitableLastYear: boolean;
    currentlyProfitable: boolean;
    largestCustomerSharePercent: number;
    takesAnnualSalary: boolean;
    contextNotes?: string;
  };
}

export interface MenteeStep5 {
  strengths: {
    matrix: Record<string, string>;
  };
  narratives: {
    biggestSuccess: string;
    helpAreas: string;
    extraStrength?: string;
    extraHelp?: string;
    mistakes: Mistake[];
    whyHEMP: string;
  };
}

export interface MenteeStep6 {
  references: {
    accountant: Reference;
    attorney: Reference;
    bank: Reference;
    business: Reference[];
    customer: Reference[];
    supplier: Reference[];
  };
}

export interface MenteeStep7 {
  uploads: {
    coverLetter?: FileUpload[];
    orgChart?: FileUpload[];
    personalBioOrResume?: FileUpload[];
    businessDescription?: FileUpload[];
    releaseGeneral?: FileUpload[];
    releaseInfoAuthorization?: FileUpload[];
    releaseApplicationInfo?: FileUpload[];
    headshot?: FileUpload[];
  };
}

export interface MenteeStep8 {
  signature: SignatureData;
}

export type MenteeApplication = MenteeStep1 & MenteeStep2 & MenteeStep3 & MenteeStep4 & MenteeStep5 & MenteeStep6 & MenteeStep7 & MenteeStep8;

// Mentor Application Types
export interface MentorStep1 {
  person: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
  };
  company: {
    name: string;
    industry: string[];
    website?: string;
  };
  phones: {
    business: string;
    mobile: string;
  };
  address: {
    business: Address;
    home?: Address;
  };
  referral: {
    source: string;
  };
}

export interface MentorStep2 {
  background: {
    yearsInLeadershipOrOwnership: number;
  };
  team: {
    fullTime: number;
    partTime: number;
    contractors: number;
    total: number;
  };
  company: {
    type: string;
    typeOther?: string;
    experienceNotes?: string;
  };
}

export interface MentorStep3 {
  preferences: {
    expertiseAreas: string[];
    availabilityHoursPerMonth: number;
    meetingPreference: string;
    capacityMentees: number;
    geography?: string;
    notes?: string;
  };
}

export interface MentorStep4 {
  strengths: {
    matrix: Record<string, string>;
  };
  narratives: {
    biggestSuccess: string;
    mistakes: Mistake[];
    helpAreasAsLeader: string;
    whyHEMP: string;
  };
}

export interface MentorStep5 {
  references: {
    business: Reference[];
  };
}

export interface MentorStep6 {
  uploads: {
    bio?: FileUpload[];
    headshot?: FileUpload[];
    additionalDocs?: FileUpload[];
  };
}

export interface MentorStep7 {
  signature: SignatureData;
}

export type MentorApplication = MentorStep1 & MentorStep2 & MentorStep3 & MentorStep4 & MentorStep5 & MentorStep6 & MentorStep7;

export type ApplicationType = 'mentee' | 'mentor';

export interface ApplicationPayload {
  type: ApplicationType;
  steps: Record<string, any>;
  files: Array<{
    fieldKey: string;
    filename: string;
    mime: string;
    size: number;
    storageId: string;
    url: string;
  }>;
  signature: SignatureData;
  meta: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}