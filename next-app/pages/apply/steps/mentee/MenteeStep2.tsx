import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { RepeatableList } from '@/components/application/RepeatableList';
import { FISCAL_MONTHS } from '@/data/applicationData';
import { Owner } from '@/types/application';

interface MenteeStep2Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep2: React.FC<MenteeStep2Props> = ({ form }) => {
  const owners = form.watch('company.ownership') || [];

  const addOwner = () => {
    const newOwner: Owner = { name: '', title: '', equityPercent: 0 };
    form.setValue('company.ownership', [...owners, newOwner]);
  };

  const removeOwner = (index: number) => {
    form.setValue('company.ownership', owners.filter((_: any, i: number) => i !== index));
  };

  const renderOwner = (owner: Owner, index: number) => (
    <div className="space-y-4">
      <FieldRow columns={3}>
        <FormField
          control={form.control}
          name={`company.ownership.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Owner name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`company.ownership.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Owner title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`company.ownership.${index}.equityPercent`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equity % <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="0" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldRow>
    </div>
  );

  const totalEquity = owners.reduce((sum: number, owner: Owner) => sum + (owner.equityPercent || 0), 0);

  return (
    <div className="space-y-8">
      <FormSection title="Company Basics" description="Tell us about your company structure">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="company.yearsInBusiness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years in Business <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.fiscalYearEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiscal Year End <span className="text-destructive">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FISCAL_MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="company.founderIsApplicant"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you a founder of this company? <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="founder-yes" />
                      <Label htmlFor="founder-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="founder-no" />
                      <Label htmlFor="founder-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.ultimateDecisionMaker"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you the ultimate decision maker? <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="decision-yes" />
                      <Label htmlFor="decision-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="decision-no" />
                      <Label htmlFor="decision-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>
      </FormSection>

      <FormSection 
        title="Ownership Structure" 
        description="List all owners and their equity percentages"
      >
        <RepeatableList
          items={owners}
          onAdd={addOwner}
          onRemove={removeOwner}
          renderItem={renderOwner}
          addLabel="Add Owner"
          minItems={1}
          maxItems={10}
        />
        
        {totalEquity > 0 && (
          <div className="text-sm text-muted-foreground">
            Total Equity: {totalEquity}%
            {totalEquity > 100 && (
              <span className="text-destructive ml-2">
                (Total cannot exceed 100%)
              </span>
            )}
          </div>
        )}
      </FormSection>

      <FormSection title="Governance" description="Board and advisory structure">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="governance.hasBoardOfDirectors"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have a Board of Directors?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="board-yes" />
                      <Label htmlFor="board-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="board-no" />
                      <Label htmlFor="board-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="governance.hasAdvisoryBoard"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have an Advisory Board?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="advisory-yes" />
                      <Label htmlFor="advisory-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="advisory-no" />
                      <Label htmlFor="advisory-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        {form.watch('governance.hasBoardOfDirectors') && (
          <FormField
            control={form.control}
            name="governance.directorsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Directors</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    placeholder="3" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </FormSection>
    </div>
  );
};