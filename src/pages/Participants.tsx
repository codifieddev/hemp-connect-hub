import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ParticipantCard from '@/components/participants/ParticipantCard';
import ParticipantFilters from '@/components/participants/ParticipantFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticipantFilters as FilterType } from '@/types/participant';
import { MOCK_PARTICIPANTS, filterParticipants } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Participants = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterType>({
    role: 'all',
    sort: 'name'
  });

  // Set initial role based on route
  useEffect(() => {
    const path = location.pathname;
    let role: FilterType['role'] = 'all';
    
    if (path.includes('/mentees')) role = 'mentee';
    else if (path.includes('/mentors')) role = 'mentor';
    else if (path.includes('/fellows')) role = 'fellow';
    else if (path.includes('/counselors')) role = 'counselor';
    
    setFilters(prev => ({ ...prev, role }));
  }, [location.pathname]);

  const filteredParticipants = useMemo(() => {
    return filterParticipants(MOCK_PARTICIPANTS, filters);
  }, [filters]);

  // === FUNCTIONS ADDED HERE ===
  // These functions are now available for the active filter badges
  const updateFilter = (key: keyof FilterType, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'industries' | 'expertises', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray.length > 0 ? newArray : undefined };
    });
  };
  // ============================

  const menteeCount = MOCK_PARTICIPANTS.filter(p => p.role === 'mentee').length;
  const mentorCount = MOCK_PARTICIPANTS.filter(p => p.role === 'mentor').length;
  const fellowCount = MOCK_PARTICIPANTS.filter(p => p.role === 'fellow').length;
  const counselorCount = MOCK_PARTICIPANTS.filter(p => p.role === 'counselor').length;

  const handleTabChange = (role: string) => {
    // We create a new filter object to reset other filters when tab changes
    const newFilters: FilterType = {
        q: '',
        role: role as any,
        sort: 'name',
    };
    setFilters(newFilters);
    
    const basePath = '/participants';
    if (role === 'all') {
      navigate(basePath);
    } else {
      navigate(`${basePath}/${role}s`);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.q && filters.q.trim() !== '') count++;
    if (filters.industries?.length) count++;
    if (filters.expertises?.length) count++;
    if (filters.location) count++;
    if (filters.availability !== undefined) count++;
    return count;
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Participant Directory</h1>
              <p className="text-muted-foreground">
                Connect with {MOCK_PARTICIPANTS.length} entrepreneurs and business leaders in our community
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for different participant types */}
        <Tabs value={filters.role || 'all'} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="all" className="text-xs lg:text-sm">
              All ({MOCK_PARTICIPANTS.length})
            </TabsTrigger>
            <TabsTrigger value="mentee" className="text-xs lg:text-sm">
              Mentees ({menteeCount})
            </TabsTrigger>
            <TabsTrigger value="mentor" className="text-xs lg:text-sm">
              Mentors ({mentorCount})
            </TabsTrigger>
            <TabsTrigger value="fellow" className="text-xs lg:text-sm">
              Fellows ({fellowCount})
            </TabsTrigger>
            <TabsTrigger value="counselor" className="text-xs lg:text-sm">
              Counselors ({counselorCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <ParticipantFilters
              filters={filters}
              onFiltersChange={setFilters}
              showRoleFilter={false} // Tabs are controlling the role
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters and Results Count */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <ParticipantFilters
                filters={filters}
                onFiltersChange={setFilters}
                showRoleFilter={false}
              />
              <span className="text-sm text-muted-foreground">
                {filteredParticipants.length} results
              </span>
            </div>

            {/* Desktop Results Count */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {filters.role === 'all' ? 'All Participants' : 
                 filters.role?.charAt(0).toUpperCase() + filters.role?.slice(1) + 's'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredParticipants.length} results
              </span>
            </div>
            
            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {filters.q && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {filters.q}
                    <Button variant="ghost" size="sm" className="h-auto p-0.5 hover:bg-transparent" onClick={() => updateFilter('q', '')}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.industries?.map((industry) => (
                  <Badge key={industry} variant="secondary" className="gap-1">
                    {industry}
                    <Button variant="ghost" size="sm" className="h-auto p-0.5 hover:bg-transparent" onClick={() => toggleArrayFilter('industries', industry)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.expertises?.map((expertise) => (
                  <Badge key={expertise} variant="secondary" className="gap-1">
                    {expertise}
                    <Button variant="ghost" size="sm" className="h-auto p-0.5 hover:bg-transparent" onClick={() => toggleArrayFilter('expertises', expertise)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Grid */}
            {filteredParticipants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredParticipants.map((participant) => (
                  <ParticipantCard key={participant.id} participant={participant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No participants found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Participants;
