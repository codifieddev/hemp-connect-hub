import * as z from 'zod';

export const mentorStep1Schema = z.object({
  person: z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid email is required"),
    title: z.string().min(2, "Title is required")
  }),
  company: z.object({
    name: z.string().min(2, "Company name is required"),
    industry: z.array(z.string()).min(1, "At least one industry is required"),
    website: z.string().url().optional().or(z.literal(""))
  }),
  phones: z.object({
    business: z.string().min(10, "Business phone is required"),
    mobile: z.string().min(10, "Mobile phone is required")
  }),
  address: z.object({
    business: z.object({
      street1: z.string().min(1, "Street address is required"),
      street2: z.string().optional(),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(5, "ZIP code is required"),
      country: z.string().min(1, "Country is required")
    }),
    home: z.object({
      street1: z.string().optional(),
      street2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional()
    }).optional()
  }),
  referral: z.object({
    source: z.string().min(1, "Referral source is required")
  })
});

export const mentorStep2Schema = z.object({
  background: z.object({
    yearsInLeadershipOrOwnership: z.number().min(0, "Years must be 0 or greater")
  }),
  team: z.object({
    fullTime: z.number().min(0, "Full-time count must be 0 or greater"),
    partTime: z.number().min(0, "Part-time count must be 0 or greater"),
    contractors: z.number().min(0, "Contractors count must be 0 or greater"),
    total: z.number().min(0)
  }),
  company: z.object({
    type: z.string().min(1, "Company type is required"),
    typeOther: z.string().optional(),
    experienceNotes: z.string().optional()
  })
});

export const mentorStep3Schema = z.object({
  preferences: z.object({
    expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
    availabilityHoursPerMonth: z.number().min(0).max(40, "Hours must be between 0-40"),
    meetingPreference: z.string().min(1, "Meeting preference is required"),
    capacityMentees: z.number().min(0).max(10, "Capacity must be between 0-10"),
    geography: z.string().optional(),
    notes: z.string().optional()
  })
});

export const mentorStep4Schema = z.object({
  strengths: z.object({
    matrix: z.record(z.string(), z.string())
  }),
  narratives: z.object({
    biggestSuccess: z.string().min(100, "Must be at least 100 characters").max(1000, "Must be less than 1000 characters"),
    mistakes: z.array(z.object({
      whatHappened: z.string().min(50, "Must be at least 50 characters").max(500, "Must be less than 500 characters"),
      lesson: z.string().min(50, "Must be at least 50 characters").max(500, "Must be less than 500 characters")
    })).length(3, "Exactly 3 mistakes are required"),
    helpAreasAsLeader: z.string().min(100, "Must be at least 100 characters").max(1000, "Must be less than 1000 characters"),
    whyHEMP: z.string().min(150, "Must be at least 150 characters").max(800, "Must be less than 800 characters")
  })
});

export const mentorStep5Schema = z.object({
  references: z.object({
    business: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      company: z.string().min(1, "Company is required"),
      phone: z.string().min(10, "Valid phone is required"),
      email: z.string().email("Valid email is required")
    })).min(3, "At least 3 business references are required")
  })
});

export const mentorStep6Schema = z.object({
  uploads: z.object({
    bio: z.array(z.any()).min(1, "Bio is required"),
    headshot: z.array(z.any()).optional(),
    additionalDocs: z.array(z.any()).optional()
  })
});

export const mentorStep7Schema = z.object({
  signature: z.object({
    typedName: z.string().min(1, "Typed name is required"),
    consent: z.boolean().refine(val => val === true, "Consent is required"),
    drawn: z.string().optional(),
    method: z.enum(['typed', 'drawn']),
    timestamp: z.string(),
    ip: z.string().optional()
  })
});