import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { AddressGroup } from '@/components/application/AddressGroup';
import { REFERRAL_SOURCES, INDUSTRIES } from '@/data/applicationData';
import { Checkbox } from '@/components/ui/checkbox';

interface MentorStep1Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep1: React.FC<MentorStep1Props> = ({ form }) => {
  return (
    <div className="space-y-8">
      <FormSection title="Personal Information" description="Tell us about yourself">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="person.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="person.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="person.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="person.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title/Position <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="CEO, President, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>
      </FormSection>

      <FormSection title="Company Information" description="Details about your business">
        <FormField
          control={form.control}
          name="company.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Your Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company.industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industries <span className="text-destructive">*</span></FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {INDUSTRIES.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={field.value?.includes(industry) || false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), industry]);
                        } else {
                          field.onChange(field.value?.filter((i: string) => i !== industry) || []);
                        }
                      }}
                    />
                    <label htmlFor={industry} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Contact Information" description="How can we reach you?">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="phones.business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Phone <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(816) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phones.mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Phone <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(816) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FormField
          control={form.control}
          name="referral.source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about HEMP? <span className="text-destructive">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select referral source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REFERRAL_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Business Address" description="Your company's primary location">
        <AddressGroup
          control={form.control}
          prefix="address.business"
          label="Business Address"
          required
        />
      </FormSection>

      <FormSection title="Home Address" description="Your personal address (optional, kept private)">
        <AddressGroup
          control={form.control}
          prefix="address.home"
          label="Home Address"
          required={false}
        />
      </FormSection>
    </div>
  );
};