import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Award, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Home = () => {
  const stats = [
    { label: 'Active Mentees', value: '150+', icon: Users },
    { label: 'Expert Mentors', value: '75+', icon: Award },
    { label: 'Monthly Events', value: '8+', icon: Calendar },
    { label: 'Partner Organizations', value: '25+', icon: Building2 },
  ];

  const features = [
    {
      title: 'Mentorship Matching',
      description: 'Connect with experienced business leaders who understand your challenges and can guide your growth.',
      href: '/participants/mentors'
    },
    {
      title: 'Peer Network',
      description: 'Build relationships with fellow entrepreneurs facing similar challenges and opportunities.',
      href: '/participants/mentees'
    },
    {
      title: 'Educational Events',
      description: 'Attend workshops, seminars, and networking events designed for business growth.',
      href: '/events'
    },
    {
      title: 'Resource Library',
      description: 'Access our comprehensive directory of expertise, tools, and professional services.',
      href: '/resource-guide'
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Building Kansas City's
              <span className="block text-accent">Business Future</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              HEMP connects emerging entrepreneurs with experienced business leaders through 
              mentorship, networking, and professional development programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-hero text-lg px-8 py-4">
                <Link to="/apply/mentee">
                  Apply as Mentee
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/apply/mentor">Become a Mentor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Accelerate Your Business Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access the resources, connections, and expertise you need to take 
              your business to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover group cursor-pointer">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={feature.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Whether you're an emerging entrepreneur or an experienced business leader, 
            HEMP has a place for you in our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
              <Link to="/participants">Browse Directory</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;