import Layout from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  // Mock events data
  const upcomingEvents = [
    {
      id: '1',
      title: 'Monthly Mentor Mixer',
      date: '2024-03-15',
      time: '6:00 PM - 8:00 PM',
      location: 'Innovation Center, Kansas City',
      description: 'Network with fellow entrepreneurs and mentors over cocktails and conversation.',
      type: 'Networking',
      audience: 'All',
      capacity: 50,
      registered: 32
    },
    {
      id: '2',
      title: 'Financial Planning Workshop',
      date: '2024-03-22',
      time: '1:00 PM - 4:00 PM',
      location: 'Virtual Event',
      description: 'Learn essential financial planning strategies for your growing business.',
      type: 'Workshop',
      audience: 'Mentees',
      capacity: 25,
      registered: 18
    },
    {
      id: '3',
      title: 'Pitch Practice Session',
      date: '2024-03-29',
      time: '10:00 AM - 12:00 PM',
      location: 'Crossroads Arts District',
      description: 'Practice your pitch and get feedback from experienced mentors and peers.',
      type: 'Workshop',
      audience: 'Mentees',
      capacity: 15,
      registered: 12
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Events & Workshops</h1>
              <p className="text-muted-foreground">
                Join our community events designed to accelerate your business growth
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{event.audience}</Badge>
                    <Button size="sm" className="btn-accent">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Event Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Networking Events</h4>
              <p className="text-sm text-muted-foreground">
                Connect with fellow entrepreneurs and build meaningful business relationships
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent text-accent-foreground mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Educational Workshops</h4>
              <p className="text-sm text-muted-foreground">
                Learn from experts on topics like finance, marketing, and leadership
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-success text-success-foreground mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Pitch Sessions</h4>
              <p className="text-sm text-muted-foreground">
                Practice your pitch and get valuable feedback from mentors and peers
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;