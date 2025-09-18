import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { MOCK_PARTICIPANTS } from '@/data/mockData';
import { Participant } from '@/types/participant';

interface TransformedParticipant {
  id: string;
  name: string;
  title: string | undefined;
  company: string | undefined;
  role: string;
  industry: string[];
  location: string;
  yearsInBusiness: number;
  bio: string | undefined;
  avatar: string | undefined;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    website: string;
  };
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [participant, setParticipant] = useState<TransformedParticipant | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    const foundParticipant = MOCK_PARTICIPANTS.find(p => p.id === id);
    if (foundParticipant) {
      const transformedParticipant: TransformedParticipant = {
        id: foundParticipant.id,
        name: `${foundParticipant.firstName} ${foundParticipant.lastName}`,
        title: foundParticipant.title,
        company: foundParticipant.company,
        role: foundParticipant.role,
        industry: foundParticipant.industries,
        location: foundParticipant.businessAddress 
          ? `${foundParticipant.businessAddress.city}, ${foundParticipant.businessAddress.state}`
          : 'Location not specified',
        yearsInBusiness: new Date().getFullYear() - 2000, // Placeholder calculation
        bio: foundParticipant.bio,
        avatar: foundParticipant.headshotUrl,
        contact: foundParticipant.contact
      };
      setParticipant(transformedParticipant);
      
      // Check if this is the logged-in user's profile
      setIsOwnProfile(user?.id === id);
    } else {
      setParticipant(null);
    }
  }, [id, user]);

  if (!participant) {
    return (
      <Layout>
        <div className="container px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
            <p className="text-muted-foreground">The requested profile could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="text-2xl">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{participant.name}</h1>
                    <p className="text-muted-foreground">{participant.title}</p>
                    <Badge variant="secondary" className="mt-1 capitalize">
                      {participant.role}
                    </Badge>
                  </div>
                </div>
                {isOwnProfile && (
                  <Button>Edit Profile</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Company:</span> {participant.company}
                </div>
                <div>
                  <span className="font-medium">Industry:</span> {participant.industry.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {participant.location}
                </div>
                <div>
                  <span className="font-medium">Years in Business:</span> {participant.yearsInBusiness}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{participant.bio}</p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <p>{participant.contact.email}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Phone</h3>
                  <p>{participant.contact.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">LinkedIn</h3>
                  <p className="text-primary">{participant.contact.linkedin}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Website</h3>
                  <p className="text-primary">{participant.contact.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;