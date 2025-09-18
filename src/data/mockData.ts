import { Participant } from '@/types/participant';

// Mock industries and expertises
export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Construction',
  'Food & Beverage',
  'Marketing',
  'Legal',
  'Education',
  'Non-profit',
  'Energy',
  'Transportation'
];

export const EXPERTISES = [
  'Business Strategy',
  'Financial Management',
  'Marketing & Sales',
  'Operations',
  'Human Resources',
  'Technology & Innovation',
  'Leadership Development',
  'Legal Affairs',
  'International Business',
  'Fundraising',
  'Product Development',
  'Digital Marketing',
  'Supply Chain',
  'Compliance',
  'Data Analytics'
];

// Mock participants data
export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    slug: 'sarah-johnson',
    role: 'mentor',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@techstartup.com',
    phone: '(816) 555-0101',
    title: 'CEO & Founder',
    company: 'TechStartup KC',
    website: 'https://techstartupkc.com',
    bio: 'Serial entrepreneur with 15 years of experience in technology and startups. Founded three successful companies, with two exits. Passionate about helping the next generation of entrepreneurs navigate the challenges of building a business.',
    headshotUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612e4c1?w=400&h=400&fit=crop&crop=face',
    classYear: 2015,
    industries: ['Technology', 'Marketing'],
    expertises: ['Business Strategy', 'Fundraising', 'Technology & Innovation'],
    businessAddress: {
      street: '1200 Main St, Suite 400',
      city: 'Kansas City',
      state: 'MO',
      zip: '64111',
      country: 'USA'
    },
    availability: true,
    isPublic: true,
    showEmail: true,
    status: 'approved',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'michael-chen',
    role: 'mentee',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael@greentech.com',
    title: 'Founder',
    company: 'GreenTech Solutions',
    bio: 'Building sustainable technology solutions for smart cities. Looking for guidance on scaling operations and securing Series A funding.',
    headshotUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    classYear: 2023,
    industries: ['Technology', 'Energy'],
    expertises: ['Product Development', 'Technology & Innovation'],
    businessAddress: {
      street: '800 Baltimore Ave',
      city: 'Kansas City',
      state: 'MO',
      zip: '64105',
      country: 'USA'
    },
    isPublic: true,
    showEmail: false,
    status: 'approved',
    createdAt: '2023-08-20T14:30:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  },
  {
    id: '3',
    slug: 'jennifer-davis',
    role: 'mentor',
    firstName: 'Jennifer',
    lastName: 'Davis',
    email: 'jennifer@davislaw.com',
    title: 'Managing Partner',
    company: 'Davis Law Firm',
    bio: 'Experienced business attorney specializing in startup legal affairs, contracts, and intellectual property. Helping entrepreneurs protect and structure their businesses for growth.',
    headshotUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    classYear: 2012,
    industries: ['Legal', 'Consulting'],
    expertises: ['Legal Affairs', 'Business Strategy', 'Compliance'],
    businessAddress: {
      street: '4801 Main St, Suite 200',
      city: 'Kansas City',
      state: 'MO',
      zip: '64112',
      country: 'USA'
    },
    availability: true,
    isPublic: true,
    showEmail: true,
    status: 'approved',
    createdAt: '2022-03-10T11:20:00Z',
    updatedAt: '2024-01-08T16:45:00Z'
  },
  {
    id: '4',
    slug: 'robert-martinez',
    role: 'mentee',
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert@kcdeli.com',
    title: 'Owner',
    company: 'KC Artisan Deli',
    bio: 'Third-generation family business owner looking to modernize operations and expand to multiple locations. Seeking guidance on digital transformation and growth strategies.',
    headshotUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    classYear: 2024,
    industries: ['Food & Beverage', 'Retail'],
    expertises: ['Operations', 'Marketing & Sales'],
    businessAddress: {
      street: '39th & State Line Rd',
      city: 'Kansas City',
      state: 'KS',
      zip: '66103',
      country: 'USA'
    },
    isPublic: true,
    showEmail: false,
    status: 'approved',
    createdAt: '2024-02-14T13:10:00Z',
    updatedAt: '2024-02-20T10:30:00Z'
  },
  {
    id: '5',
    slug: 'amanda-wilson',
    role: 'mentor',
    firstName: 'Amanda',
    lastName: 'Wilson',
    email: 'amanda@wilsonfinancial.com',
    title: 'CFO',
    company: 'Wilson Financial Advisory',
    bio: 'Financial strategist with expertise in helping small businesses optimize their financial operations, secure funding, and plan for sustainable growth.',
    headshotUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face',
    classYear: 2018,
    industries: ['Finance', 'Consulting'],
    expertises: ['Financial Management', 'Business Strategy', 'Fundraising'],
    businessAddress: {
      street: '1100 Walnut St, Suite 1800',
      city: 'Kansas City',
      state: 'MO',
      zip: '64106',
      country: 'USA'
    },
    availability: true,
    isPublic: true,
    showEmail: true,
    status: 'approved',
    createdAt: '2021-09-05T09:45:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  {
    id: '6',
    slug: 'carlos-rodriguez',
    role: 'mentee',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    email: 'carlos@builditright.com',
    title: 'General Contractor',
    company: 'BuildItRight Construction',
    bio: 'Construction company owner focused on sustainable building practices. Looking for mentorship on business development and building strategic partnerships.',
    headshotUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    classYear: 2023,
    industries: ['Construction', 'Real Estate'],
    expertises: ['Operations', 'Project Management'],
    businessAddress: {
      street: '2500 Grand Blvd',
      city: 'Kansas City',
      state: 'MO',
      zip: '64108',
      country: 'USA'
    },
    isPublic: true,
    showEmail: true,
    status: 'approved',
    createdAt: '2023-11-01T16:00:00Z',
    updatedAt: '2024-01-05T11:30:00Z'
  }
];

// Helper function to filter participants
export const filterParticipants = (participants: Participant[], filters: any) => {
  let filtered = [...participants];

  // Filter by role
  if (filters.role && filters.role !== 'all') {
    filtered = filtered.filter(p => p.role === filters.role);
  }

  // Filter by search query
  if (filters.q) {
    const query = filters.q.toLowerCase();
    filtered = filtered.filter(p => 
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query) ||
      p.company?.toLowerCase().includes(query) ||
      p.title?.toLowerCase().includes(query)
    );
  }

  // Filter by industries
  if (filters.industries?.length > 0) {
    filtered = filtered.filter(p => 
      p.industries.some(industry => filters.industries.includes(industry))
    );
  }

  // Filter by expertises
  if (filters.expertises?.length > 0) {
    filtered = filtered.filter(p => 
      p.expertises.some(expertise => filters.expertises.includes(expertise))
    );
  }

  // Filter by availability (mentors only)
  if (filters.availability !== undefined && filters.role === 'mentor') {
    filtered = filtered.filter(p => p.availability === filters.availability);
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case 'name':
        filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'company':
        filtered.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
        break;
      case 'classYear':
        filtered.sort((a, b) => (b.classYear || 0) - (a.classYear || 0));
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }
  }

  return filtered;
};