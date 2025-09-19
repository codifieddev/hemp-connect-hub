import { useEffect, useState } from 'react';
// Admin note: This login page authenticates via Supabase.

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/service/authService/authService';

const Login = () => {
  // const { signIn, isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigate once the auth context reflects a logged-in user
  // This avoids racing on stale isAdmin value right after signIn
  // useEffect(() => {
  //   if (!authLoading && user) {
  //     navigate(isAdmin ? '/admin' : '/');
  //   }
  // }, [authLoading, user, isAdmin, navigate]);

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      console.log("Login attempt with:", email, password);
      const response = await AuthService.login(email, password);
      console.log("Login response:", response);
      alert("Signed in!");
    } catch (error) {
      setError("Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
