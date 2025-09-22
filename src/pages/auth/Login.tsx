import { useEffect, useState } from 'react';
// Admin note: This login page authenticates via Supabase.

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/service/authService/authService';
import { AppDispatch, RootState } from '@/redux/slice/user/store';
import { login } from '@/redux/slice/user/AuthSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchMentorData } from '@/redux/slice/participant/participantSlice';

const Login = () => {
  // const { signIn, isAdmin, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user, userProfile } = useSelector((state: RootState) => state.auth);

  // Navigate once the auth context reflects a logged-in user
  // This avoids racing on stale isAdmin value right after signIn
  useEffect(() => {
    if (isAuthenticated && 
      user && user.id && 
      user.role==="admin" ) {

      navigate('/admin');

    }else if (user && user.id 
      && user.role==="mentor" && userProfile && userProfile.id) {
      getMentorDetails(user.id, userProfile.id);
    }
  }, [isAuthenticated, user,userProfile,navigate]);

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    await dispatch(login({ email, password }));
  };


  const getMentorDetails=async(userId:string, profileId:number)=>{
    try{
      const response=await  dispatch(fetchMentorData(userId));

     navigate(`/profile/${profileId}`);
    }catch(error){
      console.error("Error fetching mentor details:", error);
      throw error;
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
function useAppDispatch<T>() {
  throw new Error('Function not implemented.');
}

