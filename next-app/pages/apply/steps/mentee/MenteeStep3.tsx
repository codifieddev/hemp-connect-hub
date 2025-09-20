import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';

interface MenteeStep3Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep3: React.FC<MenteeStep3Props> = ({ form }) => {
  const fullTime = form.watch('team.fullTime') || 0;
  const partTime = form.watch('team.partTime') || 0;
  const contractors = form.watch('team.contractors') || 0;
  const total = fullTime + partTime + contractors;

  // Update total whenever individual counts change
  React.useEffect(() => {
    form.setValue('team.total', total);
  }, [fullTime, partTime, contractors, form]);

  return (
    <div className="space-y-8">
      <FormSection title="Team Size" description="Current staffing levels">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="team.fullTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full-time Employees <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team.partTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part-time Employees <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="team.contractors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contractors/Consultants <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team.total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Team Size</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    value={total}
                    readOnly
                    className="bg-muted"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Team Composition Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-primary">{fullTime}</div>
              <div className="text-muted-foreground">Full-time</div>
            </div>
            <div>
              <div className="font-medium text-primary">{partTime}</div>
              <div className="text-muted-foreground">Part-time</div>
            </div>
            <div>
              <div className="font-medium text-primary">{contractors}</div>
              <div className="text-muted-foreground">Contractors</div>
            </div>
            <div>
              <div className="font-medium text-accent">{total}</div>
              <div className="text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      </FormSection>
    </div>
  );
};