import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import supabase from '@/lib/supabaseClient';

const tabs = [
  { key: 'mentees', label: 'Mentees' },
  { key: 'mentors', label: 'Mentors' },
  { key: 'fellows', label: 'Fellows' },
  { key: 'counselors', label: 'Counselors' },
] as const;

type Row = { id: string; name: string; email: string; role: string; created_at: string };

function Table({ rows, loading, error }: { rows: Row[]; loading: boolean; error?: string }) {
  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['id', 'name', 'email', 'role', 'created_at'].map((h) => (
              <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-mono text-xs truncate max-w-[240px]">{r.id}</td>
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2">{r.email}</td>
              <td className="px-4 py-2 capitalize">{r.role}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [active, setActive] = useState<typeof tabs[number]['key']>('mentees');
  const [rows, setRows] = useState<Row[]>([]);
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  useEffect(() => {
    const fetchRows = async () => {
      if (!supabase) return;
      setPending(true);
      setErr(undefined);
      let table = active;
      const { data, error } = await supabase
        .from(table)
        .select('id, name, email, role, created_at')
        .order('created_at', { ascending: false });
      if (error) setErr(error.message);
      setRows((data as Row[]) || []);
      setPending(false);
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
          <div className="p-4 font-semibold">Admin</div>
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
            <Table rows={rows} loading={pending} error={err} />
          </div>
        </main>
      </div>
    </div>
  );
}
