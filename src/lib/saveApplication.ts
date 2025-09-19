import supabase from '@/lib/supabaseClient';

export type AppType = 'mentee' | 'mentor';

function serializeUploads(uploads: any): any {
  if (!uploads || typeof uploads !== 'object') return uploads;
  const out: any = {};
  for (const [k, v] of Object.entries(uploads)) {
    const arr = Array.isArray(v) ? v : [];
    out[k] = arr.map((item: any) => {
      if (typeof item === 'string') return { filename: item };
      if (item && item.file) {
        return {
          filename: item.file.name,
          mime: item.file.type || 'application/octet-stream',
          size: item.file.size || 0,
          status: item.status || 'completed',
        };
      }
      return { filename: String(item ?? '') };
    });
  }
  return out;
}

export async function saveApplication(appType: AppType, values: any) {
  if (!supabase) {
    console.warn('Supabase client is not initialized; skipping remote save.');
    return { skipped: true } as const;
  }

  // Prepare payload
  const email = values?.applicant?.email || values?.person?.email || null;
  const uploads = serializeUploads(values?.uploads);
  const payload = {
    type: appType,
    email,
    data: { ...values, uploads },
  };

  // Create table if it doesn't exist (best-effort). This may fail depending on RLS; ignore errors.
  try {
    await supabase.rpc('exec', {
      sql: `create table if not exists applications (
        id uuid primary key default gen_random_uuid(),
        type text not null check (type in ('mentee','mentor')),
        email text,
        data jsonb not null,
        created_at timestamptz not null default now()
      );`
    } as any);
  } catch (e) {
    // Silently ignore
  }

  const { error } = await supabase.from('applications').insert(payload as any);
  if (error) throw error;
  return { ok: true } as const;
}
