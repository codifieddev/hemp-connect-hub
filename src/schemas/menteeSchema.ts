import * as z from 'zod';

export const menteeStep1Schema = z.object({
  applicant: z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid email is required"),
    title: z.string().min(2, "Title is required")
  }),
  company: z.object({
    name: z.string().min(2, "Company name is required"),
    type: z.string().min(1, "Company type is required"),
    typeOther: z.string().optional(),
    industry: z.array(z.string()).min(1, "At least one industry is required"),
    website: z.string().url().optional().or(z.literal("")),
    phoneBusiness: z.string().min(10, "Business phone is required")
  }),
  applicant_phoneMobile: z.string().min(10, "Mobile phone is required"),
  referral: z.object({
    source: z.string().min(1, "Referral source is required")
  }),
  address: z.object({
    business: z.object({
      street1: z.string().min(1, "Street address is required"),
      street2: z.string().optional(),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(5, "ZIP code is required"),
      country: z.string().min(1, "Country is required")
    })
  })
});

export const menteeStep2Schema = z.object({
  company: z.object({
    yearsInBusiness: z.number().min(0, "Years in business must be 0 or greater"),
    fiscalYearEnd: z.string().min(1, "Fiscal year end is required"),
    founderIsApplicant: z.boolean(),
    ultimateDecisionMaker: z.boolean(),
    ownership: z.array(z.object({
      name: z.string().min(1, "Owner name is required"),
      title: z.string().min(1, "Owner title is required"),
      equityPercent: z.number().min(0).max(100, "Equity percent must be between 0-100")
    })).min(1, "At least one owner is required")
  }),
  governance: z.object({
    hasBoardOfDirectors: z.boolean(),
    hasAdvisoryBoard: z.boolean(),
    directorsCount: z.number().optional()
  })
});

export const menteeStep3Schema = z.object({
  team: z.object({
    fullTime: z.number().min(0, "Full-time count must be 0 or greater"),
    partTime: z.number().min(0, "Part-time count must be 0 or greater"),
    contractors: z.number().min(0, "Contractors count must be 0 or greater"),
    total: z.number().min(0)
  })
});

export const menteeStep4Schema = z.object({
  finance: z.object({
    years: z.record(z.string(), z.object({
      fullTimeEmployees: z.number().min(0),
      annualRevenue: z.number().min(0),
      revenueGrowthPercent: z.number().min(-100).max(1000),
      profitGrowthPercent: z.number().min(-100).max(1000),
      equityPercent: z.number().min(0).max(100)
    })),
    wasProfitableLastYear: z.boolean(),
    currentlyProfitable: z.boolean(),
    largestCustomerSharePercent: z.number().min(0).max(100),
    takesAnnualSalary: z.boolean(),
    contextNotes: z.string().optional()
  })
});

export const menteeStep5Schema = z.object({
  strengths: z.object({
    matrix: z.record(z.string(), z.string())
  }),
  narratives: z.object({
    biggestSuccess: z.string().min(100, "Must be at least 100 characters").max(1000, "Must be less than 1000 characters"),
    helpAreas: z.string().min(100, "Must be at least 100 characters").max(1000, "Must be less than 1000 characters"),
    extraStrength: z.string().max(500, "Must be less than 500 characters").optional(),
    extraHelp: z.string().max(500, "Must be less than 500 characters").optional(),
    mistakes: z.array(z.object({
      whatHappened: z.string().min(50, "Must be at least 50 characters").max(500, "Must be less than 500 characters"),
      lesson: z.string().min(50, "Must be at least 50 characters").max(500, "Must be less than 500 characters")
    })).length(3, "Exactly 3 mistakes are required"),
    whyHEMP: z.string().min(150, "Must be at least 150 characters").max(800, "Must be less than 800 characters")
  })
});

export const menteeStep6Schema = z.object({
  references: z.object({
    accountant: z.object({
      name: z.string().min(1, "Name is required"),
      firm: z.string().min(1, "Firm is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    }),
    attorney: z.object({
      name: z.string().min(1, "Name is required"),
      firm: z.string().min(1, "Firm is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    }),
    bank: z.object({
      name: z.string().min(1, "Contact name is required"),
      bankName: z.string().min(1, "Bank name is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    }),
    business: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      company: z.string().min(1, "Company is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    })).min(2, "At least 2 business references are required"),
    customer: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      company: z.string().min(1, "Company is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    })).min(2, "At least 2 customer references are required"),
    supplier: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      company: z.string().min(1, "Company is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    })).min(2, "At least 2 supplier references are required")
  })
});

export const menteeStep7Schema = z.object({
  uploads: z.object({
    coverLetter: z.array(z.any()).min(1, "Cover letter is required"),
    orgChart: z.array(z.any()).min(1, "Organization chart is required"),
    personalBioOrResume: z.array(z.any()).min(1, "Personal bio or resume is required"),
    businessDescription: z.array(z.any()).min(1, "Business description is required"),
    releaseGeneral: z.array(z.any()).min(1, "General release is required"),
    releaseInfoAuthorization: z.array(z.any()).min(1, "Information authorization release is required"),
    releaseApplicationInfo: z.array(z.any()).min(1, "Application info release is required"),
    headshot: z.array(z.any()).optional()
  })
});

export const menteeStep8Schema = z.object({
  signature: z.object({
    typedName: z.string().min(1, "Typed name is required"),
    consent: z.boolean().refine(val => val === true, "Consent is required"),
    drawn: z.string().optional(),
    method: z.enum(['typed', 'drawn']),
    timestamp: z.string(),
    ip: z.string().optional()
  })
});