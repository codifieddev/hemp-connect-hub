import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const tabs = [
  { key: 'users', label: 'Users' },
  { key: 'mentees', label: 'Mentees' },
  { key: 'mentors', label: 'Mentors' },
  { key: 'fellows', label: 'Fellows' },
  { key: 'counselors', label: 'Counselors' },
  { key: 'events', label: 'Events' },
] as const;

type UserRow = { id: string; email: string; name: string; role: string; created_at: string };
type MenteeRow = { id: string; user_id: string; bio: string; goals: string; created_at: string; updated_at: string };
type MentorRow = { id: string; user_id: string; bio: string; expertise: string[]; availability: boolean; created_at: string; updated_at: string };
type FellowRow = { id: string; user_id: string; bio: string; program: string; cohort: string; created_at: string; updated_at: string };
type CounselorRow = { id: string; user_id: string; bio: string; specialization: string[]; availability_hours: string; created_at: string; updated_at: string };
type EventRow = { id: string; title: string; description: string; date: string; created_by: string; created_at: string };

function Table({ 
  rows, 
  loading, 
  error,
  type
}: { 
  rows: (UserRow | MenteeRow | MentorRow | FellowRow | CounselorRow | EventRow)[]; 
  loading: boolean; 
  error?: string;
  type: typeof tabs[number]['key'];
}) {
  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;
  
  const renderRow = (row: UserRow | MenteeRow | MentorRow | FellowRow | CounselorRow | EventRow) => {
    switch (type) {
      case 'users':
        const userRow = row as UserRow;
        return (
          <tr key={userRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{userRow.id}</td>
            <td className="px-4 py-2">{userRow.email}</td>
            <td className="px-4 py-2">{userRow.name || '-'}</td>
            <td className="px-4 py-2 capitalize">{userRow.role}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(userRow.created_at).toLocaleString()}</td>
          </tr>
        );
      case 'mentees':
        const menteeRow = row as MenteeRow;
        return (
          <tr key={menteeRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{menteeRow.id}</td>
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{menteeRow.user_id}</td>
            <td className="px-4 py-2">{menteeRow.bio ? menteeRow.bio.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2">{menteeRow.goals ? menteeRow.goals.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(menteeRow.created_at).toLocaleString()}</td>
          </tr>
        );
      case 'mentors':
        const mentorRow = row as MentorRow;
        return (
          <tr key={mentorRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{mentorRow.id}</td>
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{mentorRow.user_id}</td>
            <td className="px-4 py-2">{mentorRow.bio ? mentorRow.bio.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2">{Array.isArray(mentorRow.expertise) ? mentorRow.expertise.join(', ') : '-'}</td>
            <td className="px-4 py-2">{mentorRow.availability ? 'Available' : 'Not Available'}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(mentorRow.created_at).toLocaleString()}</td>
          </tr>
        );
      case 'fellows':
        const fellowRow = row as FellowRow;
        return (
          <tr key={fellowRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{fellowRow.id}</td>
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{fellowRow.user_id}</td>
            <td className="px-4 py-2">{fellowRow.bio ? fellowRow.bio.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2">{fellowRow.program || '-'}</td>
            <td className="px-4 py-2">{fellowRow.cohort || '-'}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(fellowRow.created_at).toLocaleString()}</td>
          </tr>
        );
      case 'counselors':
        const counselorRow = row as CounselorRow;
        return (
          <tr key={counselorRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{counselorRow.id}</td>
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{counselorRow.user_id}</td>
            <td className="px-4 py-2">{counselorRow.bio ? counselorRow.bio.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2">{Array.isArray(counselorRow.specialization) ? counselorRow.specialization.join(', ') : '-'}</td>
            <td className="px-4 py-2">{counselorRow.availability_hours || '-'}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(counselorRow.created_at).toLocaleString()}</td>
          </tr>
        );
      case 'events':
        const eventRow = row as EventRow;
        return (
          <tr key={eventRow.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{eventRow.id}</td>
            <td className="px-4 py-2">{eventRow.title}</td>
            <td className="px-4 py-2">{eventRow.description ? eventRow.description.substring(0, 50) + '...' : '-'}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(eventRow.date).toLocaleString()}</td>
            <td className="px-4 py-2 font-mono text-xs truncate max-w-[120px]">{eventRow.created_by}</td>
            <td className="px-4 py-2 text-sm text-gray-500">{new Date(eventRow.created_at).toLocaleString()}</td>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderHeaders = () => {
    switch (type) {
      case 'users':
        return ['id', 'email', 'name', 'role', 'created_at'];
      case 'mentees':
        return ['id', 'user_id', 'bio', 'goals', 'created_at'];
      case 'mentors':
        return ['id', 'user_id', 'bio', 'expertise', 'availability', 'created_at'];
      case 'fellows':
        return ['id', 'user_id', 'bio', 'program', 'cohort', 'created_at'];
      case 'counselors':
        return ['id', 'user_id', 'bio', 'specialization', 'availability_hours', 'created_at'];
      case 'events':
        return ['id', 'title', 'description', 'date', 'created_by', 'created_at'];
      default:
        return [];
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {renderHeaders().map((h) => (
              <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h.replace('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [active, setActive] = useState<typeof tabs[number]['key']>('users');
  const [rows, setRows] = useState<(UserRow | MenteeRow | MentorRow | FellowRow | CounselorRow | EventRow)[]>([]);
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  useEffect(() => {
    const fetchRows = async () => {
      if (!supabase) return;
      setPending(true);
      setErr(undefined);
      
      try {
        let data: any[] = [];
        let error: any = null;
        
        switch (active) {
          case 'users':
            const usersResult = await supabase
              .from('users')
              .select('id, email, name, role, created_at')
              .order('created_at', { ascending: false });
            data = usersResult.data || [];
            error = usersResult.error;
            break;
          case 'mentees':
            const menteesResult = await supabase
              .from('mentees')
              .select('id, user_id, bio, goals, created_at')
              .order('created_at', { ascending: false });
            data = menteesResult.data || [];
            error = menteesResult.error;
            break;
          case 'mentors':
            const mentorsResult = await supabase
              .from('mentors')
              .select('id, user_id, bio, expertise, availability, created_at')
              .order('created_at', { ascending: false });
            data = mentorsResult.data || [];
            error = mentorsResult.error;
            break;
          case 'fellows':
            const fellowsResult = await supabase
              .from('fellows')
              .select('id, user_id, bio, program, cohort, created_at')
              .order('created_at', { ascending: false });
            data = fellowsResult.data || [];
            error = fellowsResult.error;
            break;
          case 'counselors':
            const counselorsResult = await supabase
              .from('counselors')
              .select('id, user_id, bio, specialization, availability_hours, created_at')
              .order('created_at', { ascending: false });
            data = counselorsResult.data || [];
            error = counselorsResult.error;
            break;
          case 'events':
            const eventsResult = await supabase
              .from('events')
              .select('id, title, description, date, created_by, created_at')
              .order('created_at', { ascending: false });
            data = eventsResult.data || [];
            error = eventsResult.error;
            break;
        }
        
        if (error) {
          setErr(error.message);
        } else {
          setRows(data);
        }
      } catch (e: any) {
        setErr(e?.message || 'Unknown error occurred');
      } finally {
        setPending(false);
      }
    };
    
    fetchRows();
  }, [active]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="w-60 bg-white border-r">
          <div className="p-4 font-semibold">Admin Panel</div>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  active === t.key ? 'bg-gray-100 font-medium' : ''
                }`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="mb-4 text-2xl font-semibold">{tabs.find((t) => t.key === active)?.label}</div>
          <div className="bg-white rounded-lg shadow border">
            <Table rows={rows} loading={pending} error={err} type={active} />
          </div>
        </main>
      </div>
    </div>
  );
}
