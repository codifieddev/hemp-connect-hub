import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { RepeatableList } from '@/components/application/RepeatableList';
import { Reference } from '@/types/application';

interface MentorStep5Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep5: React.FC<MentorStep5Props> = ({ form }) => {
  const businessRefs = form.watch('references.business') || [];

  const addBusinessRef = () => {
    const newRef: Reference = { name: '', company: '', phone: '', email: '' };
    form.setValue('references.business', [...businessRefs, newRef]);
  };

  const removeBusinessRef = (index: number) => {
    form.setValue('references.business', businessRefs.filter((_: any, i: number) => i !== index));
  };

  const renderBusinessRef = (ref: Reference, index: number) => (
    <div className="space-y-4">
      <h4 className="font-medium">Reference #{index + 1}</h4>
      <FieldRow columns={2}>
        <FormField
          control={form.control}
          name={`references.business.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`references.business.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`references.business.${index}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(816) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`references.business.${index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldRow>
    </div>
  );

  return (
    <div className="space-y-8">
      <FormSection 
        title="Business References" 
        description="At least 3 business contacts who can speak to your professional capabilities and leadership"
      >
        <RepeatableList
          items={businessRefs}
          onAdd={addBusinessRef}
          onRemove={removeBusinessRef}
          renderItem={renderBusinessRef}
          addLabel="Add Business Reference"
          minItems={3}
          maxItems={6}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Reference Guidelines</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Please provide references who can speak to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Your business leadership and management skills</li>
              <li>Your ability to mentor and develop others</li>
              <li>Your professional integrity and character</li>
              <li>Your industry expertise and knowledge</li>
            </ul>
            <p className="mt-2">
              <strong>Note:</strong> We may contact these references as part of our review process.
            </p>
          </div>
        </div>
      </FormSection>
    </div>
  );
};