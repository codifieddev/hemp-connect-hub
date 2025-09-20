import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                H
              </div>
              <span className="text-xl font-bold">HEMP</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting entrepreneurs and business leaders in Kansas City through mentorship, 
              networking, and professional development.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-semibold">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/participants/mentees" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentee Program
                </Link>
              </li>
              <li>
                <Link to="/participants/mentors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentor Network
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/resource-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resource Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/apply/mentee" className="text-muted-foreground hover:text-foreground transition-colors">
                  Apply as Mentee
                </Link>
              </li>
              <li>
                <Link to="/apply/mentor" className="text-muted-foreground hover:text-foreground transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/participants" className="text-muted-foreground hover:text-foreground transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Member Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Kansas City, MO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@hempkc.org" className="hover:text-foreground transition-colors">
                  info@hempkc.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+1-816-555-0123" className="hover:text-foreground transition-colors">
                  (816) 555-0123
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 HEMP Kansas City. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;