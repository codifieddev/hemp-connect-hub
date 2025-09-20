import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { getCurrentYears } from '@/data/applicationData';

interface MenteeStep4Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep4: React.FC<MenteeStep4Props> = ({ form }) => {
  const years = getCurrentYears();
  const yearLabels = {
    [years.last2]: `${years.last2}`,
    [years.last1]: `${years.last1}`,
    [years.currentEst]: `${years.currentEst} (Est.)`
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Financial Snapshot" 
        description="Three-year financial overview (all figures in USD)"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-3 text-left font-medium">Metric</th>
                {Object.entries(yearLabels).map(([year, label]) => (
                  <th key={year} className="border border-border p-3 text-center font-medium min-w-[120px]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium">Full-time Employees</td>
                {Object.keys(yearLabels).map((year) => (
                  <td key={year} className="border border-border p-2">
                    <FormField
                      control={form.control}
                      name={`finance.years.${year}.fullTimeEmployees`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              placeholder="0"
                              className="text-center"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="border border-border p-3 font-medium">Annual Revenue ($)</td>
                {Object.keys(yearLabels).map((year) => (
                  <td key={year} className="border border-border p-2">
                    <FormField
                      control={form.control}
                      name={`finance.years.${year}.annualRevenue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              placeholder="0"
                              className="text-center"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-border p-3 font-medium">Revenue Growth (%)</td>
                {Object.keys(yearLabels).map((year) => (
                  <td key={year} className="border border-border p-2">
                    <FormField
                      control={form.control}
                      name={`finance.years.${year}.revenueGrowthPercent`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="-100" 
                              max="1000"
                              placeholder="0"
                              className="text-center"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-border p-3 font-medium">Profit Growth (%)</td>
                {Object.keys(yearLabels).map((year) => (
                  <td key={year} className="border border-border p-2">
                    <FormField
                      control={form.control}
                      name={`finance.years.${year}.profitGrowthPercent`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="-100" 
                              max="1000"
                              placeholder="0"
                              className="text-center"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border border-border p-3 font-medium">Your Equity (%)</td>
                {Object.keys(yearLabels).map((year) => (
                  <td key={year} className="border border-border p-2">
                    <FormField
                      control={form.control}
                      name={`finance.years.${year}.equityPercent`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              max="100"
                              placeholder="0"
                              className="text-center"
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection title="Current Financial Status" description="Additional financial context">
        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="finance.wasProfitableLastYear"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Was your company profitable last year? <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="profitable-last-yes" />
                      <Label htmlFor="profitable-last-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="profitable-last-no" />
                      <Label htmlFor="profitable-last-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finance.currentlyProfitable"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Is your company currently profitable? <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="profitable-current-yes" />
                      <Label htmlFor="profitable-current-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="profitable-current-no" />
                      <Label htmlFor="profitable-current-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="finance.largestCustomerSharePercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Largest Customer Share (%) <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100"
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
            name="finance.takesAnnualSalary"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you take an annual salary? <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value?.toString()}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="salary-yes" />
                      <Label htmlFor="salary-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="salary-no" />
                      <Label htmlFor="salary-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>

        <FormField
          control={form.control}
          name="finance.contextNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Context (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide any additional context about your financial situation..."
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
        <h4 className="font-medium text-blue-900 mb-2">Financial Statement Requirement</h4>
        <p className="text-sm text-blue-800">
          Please provide last 3 years accrual-basis financial statements (balance sheets & income statements) 
          physically or as instructed by HEMP office. These will be requested separately from this application.
        </p>
      </div>
    </div>
  );
};