export interface Participant {
  id: string;
  slug: string;
  role: 'mentee' | 'mentor' | 'counselor' | 'fellow';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  company?: string;
  website?: string;
  bio?: string;
  headshotUrl?: string;
  classYear?: number;
  industries: string[];
  expertises: string[];
  businessAddress?: Address;
  contact: Contact;
  homeAddress?: Address;
  availability?: boolean; // mentors
  isPublic: boolean;
  showEmail: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ParticipantFilters {
  q?: string;
  role?: 'mentee' | 'mentor' | 'counselor' | 'fellow' | 'all';
  industries?: string[];
  expertises?: string[];
  classYear?: number[];
  location?: string;
  availability?: boolean;
  sort?: 'name' | 'company' | 'classYear' | 'recent';
  page?: number;
  limit?: number;
}

export interface ParticipantResponse {
  items: Participant[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Contact {
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
}
