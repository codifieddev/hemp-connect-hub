import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Participant } from '@/types/participant';

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'mentor':
        return 'default';
      case 'mentee':
        return 'secondary';
      case 'fellow':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleDisplay = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Card className="card-hover group h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={participant.headshotUrl} alt={`${participant.firstName} ${participant.lastName}`} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {getInitials(participant.firstName, participant.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {participant.firstName} {participant.lastName}
                </h3>
                {participant.title && participant.company && (
                  <p className="text-sm text-muted-foreground">
                    {participant.title} at {participant.company}
                  </p>
                )}
              </div>
              <Badge variant={getRoleBadgeVariant(participant.role)}>
                {getRoleDisplay(participant.role)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Location */}
        {participant.businessAddress && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <span>{participant.businessAddress.city}, {participant.businessAddress.state}</span>
          </div>
        )}

        {/* Bio Preview */}
        {participant.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {participant.bio}
          </p>
        )}

        {/* Industries */}
        {participant.industries.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Industries</p>
            <div className="flex flex-wrap gap-1">
              {participant.industries.slice(0, 3).map((industry) => (
                <Badge key={industry} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
              {participant.industries.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{participant.industries.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Expertises */}
        {participant.expertises.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Expertise</p>
            <div className="flex flex-wrap gap-1">
              {participant.expertises.slice(0, 2).map((expertise) => (
                <Badge key={expertise} variant="secondary" className="text-xs">
                  {expertise}
                </Badge>
              ))}
              {participant.expertises.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{participant.expertises.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Availability (for mentors) */}
        {participant.role === 'mentor' && participant.availability !== undefined && (
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full mr-2 ${
              participant.availability ? 'bg-success' : 'bg-muted-foreground'
            }`} />
            <span className="text-xs text-muted-foreground">
              {participant.availability ? 'Available for mentoring' : 'Currently unavailable'}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/participant/${participant.slug}`}>
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </Button>

          <div className="flex items-center space-x-2">
            {participant.showEmail && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`mailto:${participant.email}`}>
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            )}
            {participant.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={participant.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;