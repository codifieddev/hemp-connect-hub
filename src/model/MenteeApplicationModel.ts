

interface Owner {
  name: string;
  title: string;
  equityPercent: number;
}

export interface FinancialYear {
  fullTimeEmployees: number;
  annualRevenue: number;
  revenueGrowthPercent: number;
  profitGrowthPercent: number;
  equityPercent: number;
}

export interface MenteeFinance {
  years: {
    [year: string]: FinancialYear;
  };
  wasProfitableLastYear: boolean;
  currentlyProfitable: boolean;
  largestCustomerSharePercent: number;
  takesAnnualSalary: boolean;
  contextNotes?: string;
}

interface Mistake {
  whatHappened: string;
  lesson: string;
}

interface Narratives {
  biggestSuccess: string;
  helpAreas: string;
  extraStrength?: string;
  extraHelp?: string;
  mistakes: Mistake[];
  whyHEMP: string;
}

interface Strengths {
  matrix: Record<string, string>;
}

export interface MenteeApplication {
  id:string
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phoneMobile: string; // Note: In form it's "applicant_phoneMobile", but should be nested for consistency

  companyInfo: {
    name: string;
    type: string;
    typeOther?: string;
    industry: string[];
    website?: string;
    phoneBusiness: string;
    phoneMobile: string;
  };
  referral: {
    source: string;
  };
  business_address: {
 
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    
  };
  Company: {
    ownership: Owner[];
    yearsInBusiness: number;
    fiscalYearEnd: string;
    founderIsApplicant: boolean;
    ultimateDecisionMaker: boolean;
    governance: {
      hasBoardOfDirectors: boolean;
      hasAdvisoryBoard: boolean;
      directorsCount?: number;
    };
  };

  TeamInfo: {
    fullTime: number;
    partTime: number;
    contractors: number;
    total: number;
  };
  financial: MenteeFinance;
  mistakes: Mistake[];
  narratives: Narratives;
  strengths: Strengths[];
  references: MenteeStep6FormModel['references'];
  uploads: MenteeStep7Uploads;
  signature: SignatureValue;
}




export interface MenteeStep5Form {
  narratives: Narratives;
  strengths: Strengths;
}

export interface ProfessionalContact {
  name: string;
  firm?: string; // For accountant/attorney
  bankName?: string; // For bank contact
  phone: string;
  email: string;
}

export interface Reference {
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface MenteeStep6FormModel {
  references: {
    accountant: ProfessionalContact;
    attorney: ProfessionalContact;
    bank: ProfessionalContact;
    business: Reference[]; // At least 2, up to 5
    customer: Reference[]; // At least 2, up to 5
    supplier: Reference[]; // At least 2, up to 5
  };
}

export interface FileUploadItem {
  name: string; // File name
  url?: string; // Uploaded file URL or local preview
  file?: File; // Actual File object (if applicable)
  size?: number; // File size in bytes
  type?: string; // MIME type
  [key: string]: any; // For any extra metadata
}

export interface MenteeStep7Uploads {
  coverLetter?: FileUploadItem[];
  orgChart?: FileUploadItem[];
  personalBioOrResume?: FileUploadItem[];
  businessDescription?: FileUploadItem[];
  releaseGeneral?: FileUploadItem[];
  releaseInfoAuthorization?: FileUploadItem[];
  releaseApplicationInfo?: FileUploadItem[];
  headshot?: FileUploadItem[];
}

export interface MenteeStep7FormModel {
  uploads: MenteeStep7Uploads;
}
export interface SignatureValue {
  dataUrl: string; // The signature as a base64 image or SVG string
  name: string; // Name of the signer (should match applicant)
  timestamp: string; // ISO string of when signed
  ip: string; // IP address at signing (placeholder in UI)
}

export interface MenteeStep8FormModel {
  signature: SignatureValue;
}

