import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { INDUSTRIES, EXPERTISES } from '@/data/mockData';
import { ParticipantFilters as FilterType } from '@/types/participant';

interface ParticipantFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  showRoleFilter?: boolean;
}

const ParticipantFilters = ({ filters, onFiltersChange, showRoleFilter = true }: ParticipantFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'industries' | 'expertises', value: string) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({
      q: '',
      role: filters.role || 'all',
      sort: 'name'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.q) count++;
    if (filters.industries?.length) count++;
    if (filters.expertises?.length) count++;
    if (filters.location) count++;
    if (filters.availability !== undefined) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name, company, or title..."
            value={filters.q || ''}
            onChange={(e) => updateFilter('q', e.target.value)}
            className="pl-10"
          />
        </div>

      </div>

      {/* Role Filter */}
      {showRoleFilter && (
        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={filters.role || 'all'} onValueChange={(value) => updateFilter('role', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Participants</SelectItem>
              <SelectItem value="mentee">Mentees</SelectItem>
              <SelectItem value="mentor">Mentors</SelectItem>
              <SelectItem value="fellow">Fellows</SelectItem>
              <SelectItem value="counselor">Counselors</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Sort */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={filters.sort || 'name'} onValueChange={(value) => updateFilter('sort', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="classYear">Class Year</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Industries */}
      <div className="space-y-3">
        <Label>Industries</Label>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {INDUSTRIES.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={`industry-${industry}`}
                checked={filters.industries?.includes(industry) || false}
                onCheckedChange={() => toggleArrayFilter('industries', industry)}
              />
              <Label htmlFor={`industry-${industry}`} className="text-sm font-normal">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Expertises */}
      <div className="space-y-3">
        <Label>Areas of Expertise</Label>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {EXPERTISES.map((expertise) => (
            <div key={expertise} className="flex items-center space-x-2">
              <Checkbox
                id={`expertise-${expertise}`}
                checked={filters.expertises?.includes(expertise) || false}
                onCheckedChange={() => toggleArrayFilter('expertises', expertise)}
              />
              <Label htmlFor={`expertise-${expertise}`} className="text-sm font-normal">
                {expertise}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability (for mentors) */}
      {filters.role === 'mentor' && (
        <div className="space-y-2">
          <Label>Availability</Label>
          <Select 
            value={filters.availability?.toString() || 'all'} 
            onValueChange={(value) => updateFilter('availability', value === 'all' ? undefined : value === 'true')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Mentors</SelectItem>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Clear Filters */}
      {getActiveFilterCount() > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-80 p-6 border-r bg-muted/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary">{getActiveFilterCount()}</Badge>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      
    </>
  );
};

export default ParticipantFilters;