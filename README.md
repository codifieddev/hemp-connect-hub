# HEMP Connect Hub

Welcome to HEMP Connect Hub - a platform for connecting entrepreneurs with mentors, fellows, and counselors in the HEMP community.

## Features

### Authentication
- User registration and login with email/password
- Role-based access control (mentee, mentor, fellow, counselor, admin)
- Admin override via environment variables for testing

### Applications
- Multi-step mentee application form with autosave functionality
- Multi-step mentor application form with autosave functionality
- Autofill buttons for quick testing and demonstration

### Participant Directory
- Browse and filter participants by role (mentees, mentors, fellows, counselors)
- Search by name, company, title, industries, and expertise
- Sort by name, company, class year, or recent activity
- Detailed profile pages for each participant

### Admin Panel
- Role-based access to administrative functions
- View and manage mentees, mentors, fellows, and counselors
- Data sourced from Supabase database

### Responsive Design
- Mobile-friendly interface
- Consistent layout across all pages

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Supabase account for database and authentication

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hemp-connect-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_ADMIN_EMAILS`: Comma-separated list of admin email addresses for testing purposes

## Database Schema

The application uses the following tables in Supabase:

- `users`: Stores user information (id, email, role, name)
- `mentees`: Mentee application data
- `mentors`: Mentor application data
- `fellows`: Fellow information
- `counselors`: Counselor information

## Development

### Available Scripts
- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the built application
- `npm run lint`: Runs ESLint to check for code issues

### Technologies Used
- React with TypeScript
- Vite for build tooling
- Supabase for backend services
- shadcn/ui components
- Tailwind CSS for styling
- React Hook Form for form handling
- Zod for validation

## Deployment

The application can be deployed to any platform that supports static site hosting. We recommend using Vercel for seamless deployment integration with the frontend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
