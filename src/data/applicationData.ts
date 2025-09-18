export const COMPANY_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'LLC',
  'S-Corp',
  'C-Corp',
  'Nonprofit',
  'Other'
];

export const REFERRAL_SOURCES = [
  'Alumni',
  'Event',
  'Web Search',
  'Social Media',
  'Board/Counselor',
  'Other'
];

export const FISCAL_MONTHS = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' }
];

export const MEETING_PREFERENCES = [
  'In-person',
  'Virtual',
  'Hybrid'
];

export const MATRIX_CATEGORIES = [
  { id: 'marketing', label: 'Marketing & Advertising', description: 'Brand awareness, customer acquisition' },
  { id: 'accounting', label: 'Accounting & Financial Mgmt', description: 'Bookkeeping, financial planning' },
  { id: 'personnel', label: 'Personnel & Staffing', description: 'Hiring, training, HR management' },
  { id: 'business_plan', label: 'Business Plan', description: 'Strategy, goals, planning' },
  { id: 'inventory', label: 'Inventory Mgmt', description: 'Stock control, supply chain' },
  { id: 'structure', label: 'Structure/Organization', description: 'Operations, processes' },
  { id: 'operations', label: 'Operations/Production', description: 'Manufacturing, delivery' },
  { id: 'management', label: 'Management/Leadership', description: 'Team leadership, decision making' },
  { id: 'expansion', label: 'Business Expansion', description: 'Growth, scaling, new markets' },
  { id: 'strategic', label: 'Strategic Planning', description: 'Long-term vision, competitive advantage' }
];

export const MATRIX_OPTIONS = [
  { value: 'S', label: 'S', description: 'Strength' },
  { value: 'C', label: 'C', description: 'Competent' },
  { value: 'N', label: 'N', description: 'Need' },
  { value: 'NA', label: 'N/A', description: 'Not Applicable' }
];

export const INDUSTRIES = [
  'Aerospace & Defense',
  'Agriculture & Food',
  'Automotive',
  'Banking & Finance',
  'Biotechnology',
  'Chemical',
  'Construction',
  'Consumer Goods',
  'Education',
  'Energy & Utilities',
  'Entertainment & Media',
  'Fashion & Apparel',
  'Government',
  'Healthcare',
  'Hospitality & Tourism',
  'Information Technology',
  'Insurance',
  'Legal Services',
  'Manufacturing',
  'Marketing & Advertising',
  'Non-profit',
  'Pharmaceutical',
  'Professional Services',
  'Real Estate',
  'Retail',
  'Sports & Recreation',
  'Telecommunications',
  'Transportation & Logistics',
  'Other'
];

export const EXPERTISE_AREAS = [
  'Accounting & Finance',
  'Business Development',
  'Customer Service',
  'Digital Marketing',
  'E-commerce',
  'Executive Leadership',
  'Fundraising',
  'Human Resources',
  'Information Technology',
  'International Business',
  'Legal & Compliance',
  'Manufacturing',
  'Marketing & Branding',
  'Operations Management',
  'Product Development',
  'Project Management',
  'Sales',
  'Strategic Planning',
  'Supply Chain',
  'Technology Innovation'
];

export const getCurrentYears = () => {
  const currentYear = new Date().getFullYear();
  return {
    last2: currentYear - 2,
    last1: currentYear - 1,
    currentEst: currentYear
  };
};

export const MENTEE_CONSENT_TEXT = `I certify that all information provided in this application is true and complete to the best of my knowledge. I understand that any false information may lead to rejection of my application or termination from the HEMP program. I authorize HEMP to verify the information provided and contact references listed. I agree to the terms and conditions of the HEMP mentee program.`;

export const MENTOR_CONSENT_TEXT = `I certify that all information provided in this application is true and complete to the best of my knowledge. I understand that any false information may lead to rejection of my application or termination from the HEMP program. I authorize HEMP to verify the information provided and contact references listed. I agree to volunteer my time as a mentor and abide by the HEMP mentor guidelines and code of conduct.`;