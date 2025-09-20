import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { EXPERTISE_AREAS, MEETING_PREFERENCES } from '@/data/applicationData';
import { Checkbox } from '@/components/ui/checkbox';

interface MentorStep3Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep3: React.FC<MentorStep3Props> = ({ form }) => {
  return (
    <div className="space-y-8">
      <FormSection title="Areas of Expertise" description="Select the areas where you can provide mentorship">
        <FormField
          control={form.control}
          name="preferences.expertiseAreas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expertise Areas <span className="text-destructive">*</span></FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {EXPERTISE_AREAS.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={field.value?.includes(area) || false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), area]);
                        } else {
                          field.onChange(field.value?.filter((a: string) => a !== area) || []);
                        }
                      }}
                    />
                    <label htmlFor={area} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {area}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Availability & Preferences" description="Your mentoring availability and preferences">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="preferences.availabilityHoursPerMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Hours per Month <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="40"
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Maximum 40 hours per month
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences.capacityMentees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mentee Capacity <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="10"
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  How many mentees can you work with simultaneously?
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FormField
          control={form.control}
          name="preferences.meetingPreference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Meeting Preference <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {MEETING_PREFERENCES.map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <RadioGroupItem value={preference} id={preference} />
                      <Label htmlFor={preference}>{preference}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences.geography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Geographic Preference (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Kansas City metro, Missouri, Midwest, No preference"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                Any geographic preferences for mentee location?
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences.notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional information about your mentoring preferences, availability, or approach..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Mentoring Commitment</h4>
        <p className="text-sm text-blue-800">
          HEMP mentors typically commit to working with mentees for 6-12 months, 
          meeting regularly to provide guidance, support, and expertise. Your time 
          investment helps shape the next generation of business leaders in Kansas City.
        </p>
      </div>
    </div>
  );
};