import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldRow } from './FieldRow';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface AddressData {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddressGroupProps<T extends FieldValues> {
  control: Control<T>;
  prefix: FieldPath<T>;
  label: string;
  required?: boolean;
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

export function AddressGroup<T extends FieldValues>({
  control,
  prefix,
  label,
  required = false
}: AddressGroupProps<T>) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </h4>
      
      <FormField
        control={control}
        name={`${prefix}.street1` as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address {required && <span className="text-destructive">*</span>}</FormLabel>
            <FormControl>
              <Input placeholder="123 Main Street" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${prefix}.street2` as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address 2</FormLabel>
            <FormControl>
              <Input placeholder="Apartment, suite, etc. (optional)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FieldRow columns={2}>
        <FormField
          control={control}
          name={`${prefix}.city` as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City {required && <span className="text-destructive">*</span>}</FormLabel>
              <FormControl>
                <Input placeholder="Kansas City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${prefix}.state` as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State {required && <span className="text-destructive">*</span>}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
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
          control={control}
          name={`${prefix}.postalCode` as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP Code {required && <span className="text-destructive">*</span>}</FormLabel>
              <FormControl>
                <Input placeholder="64111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${prefix}.country` as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country {required && <span className="text-destructive">*</span>}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "US"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="MX">Mexico</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldRow>
    </div>
  );
}