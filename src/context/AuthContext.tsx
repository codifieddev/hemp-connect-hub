// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// import { AuthService } from '@/service/authService/authService';
// import { supabase } from '@/lib/supabaseClient';

// export type AppUser = {
//   id: string;
//   email: string | null;
//   role: string | null;
// };

// type AuthContextType = {
//   user: AppUser | null;
//   loading: boolean;
//   isAdmin: boolean;
//   signIn: (email: string, password: string) => Promise<{ error?: any }>;
//   signUp: (email: string, password: string) => Promise<{ error?: any }>;
//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<AppUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
//     .split(',')
//     .map((e: string) => e.trim().toLowerCase())
//     .filter(Boolean);

//   const hydrateRole = async (email: string | null | undefined) => {
//     if (!email || !supabase) return null;

//     // Admin override via env list
//     if (adminEmails.includes(email.toLowerCase())) return 'admin';

//     // Look up the user's role from the app "users" table by email
//     const { data, error } = await supabase
//       .from('users')
//       .select('role')
//       .eq('email', email)
//       .maybeSingle();
//     if (error) {
//       console.warn('Role fetch failed:', error.message);
//       return null;
//     }
//     if (!data) return null;
//     return data.role ?? null;
//   };

//   const ensureUserRecord = async (email: string | null | undefined, name?: string | null) => {
//     if (!email || !supabase) return;
//     try {
//       const desiredRole = adminEmails.includes(email.toLowerCase()) ? 'admin' : undefined;
//       const { data: existing } = await supabase
//         .from('users')
//         .select('id, role')
//         .eq('email', email)
//         .maybeSingle();
//         console.log('Existing user record:', existing);
//       if (!existing) {
//         await supabase.from('users').upsert({ email, name: name || null, role: desiredRole || 'mentee' }, { onConflict: 'email' });
//       } else if (desiredRole && existing.role !== desiredRole) {
//         await supabase.from('users').update({ role: desiredRole }).eq('email', email);
//       }
//     } catch (e: any) {
//       console.warn('ensureUserRecord failed:', e?.message || e);
//     }
//   };

//   useEffect(() => {
//     if (!supabase) return;
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       const sUser = session?.user;
//       if (sUser?.email) await ensureUserRecord(sUser.email, sUser.user_metadata?.name);
//       const role = sUser ? await hydrateRole(sUser.email) : null;
//       const u = sUser ? { id: sUser.id, email: sUser.email, role } : null;
//       setUser(u);
//       setLoading(false);
//     });

//     supabase.auth.getSession().then(async ({ data }) => {
//       const sUser = data.session?.user;
//       if (sUser?.email) await ensureUserRecord(sUser.email, sUser.user_metadata?.name);
//       const role = sUser ? await hydrateRole(sUser.email) : null;
//       const u = sUser ? { id: sUser.id, email: sUser.email, role } : null;
//       setUser(u);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);
  
//       const signIn = async (email: string, password: string) => {
//         if (!supabase) return { error: 'Supabase not configured' };
//         // auth service
//         //const result = await AuthService.signIn({ email, password });
//         // console.log('SignIn result:--->', result);
//         // if ('error' in result) {
//         //   return { error: result.error };
//         // }
//         return { error: undefined };
//       };


//   const signUp = async (email: string, password: string) => {
//     if (!supabase) return { error: 'Supabase not configured' } as any;
//     const { error } = await supabase.auth.signUp({ email, password });
//     return { error } as any;
//   };

//   const signOut = async () => {
//     if (!supabase) return;
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   const isAdmin = user?.role === 'admin' || false;

//   return (
//     <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
//   return ctx;
// };
