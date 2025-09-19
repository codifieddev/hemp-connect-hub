import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSection } from '@/components/application/FormSection';
import { FieldRow } from '@/components/application/FieldRow';
import { RepeatableList } from '@/components/application/RepeatableList';
import { Reference } from '@/types/application';

interface MenteeStep6Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep6: React.FC<MenteeStep6Props> = ({ form }) => {
  const businessRefs = form.watch('references.business') || [];
  const customerRefs = form.watch('references.customer') || [];
  const supplierRefs = form.watch('references.supplier') || [];

  const addBusinessRef = () => {
    const newRef: Reference = { name: '', company: '', phone: '', email: '' };
    form.setValue('references.business', [...businessRefs, newRef]);
  };

  const removeBusinessRef = (index: number) => {
    form.setValue('references.business', businessRefs.filter((_: any, i: number) => i !== index));
  };

  const addCustomerRef = () => {
    const newRef: Reference = { name: '', company: '', phone: '', email: '' };
    form.setValue('references.customer', [...customerRefs, newRef]);
  };

  const removeCustomerRef = (index: number) => {
    form.setValue('references.customer', customerRefs.filter((_: any, i: number) => i !== index));
  };

  const addSupplierRef = () => {
    const newRef: Reference = { name: '', company: '', phone: '', email: '' };
    form.setValue('references.supplier', [...supplierRefs, newRef]);
  };

  const removeSupplierRef = (index: number) => {
    form.setValue('references.supplier', supplierRefs.filter((_: any, i: number) => i !== index));
  };

  const renderBusinessRef = (ref: Reference, index: number) => (
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
  );

  const renderCustomerRef = (ref: Reference, index: number) => (
    <FieldRow columns={2}>
      <FormField
        control={form.control}
        name={`references.customer.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Jane Smith" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`references.customer.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Customer Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`references.customer.${index}.phone`}
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
        name={`references.customer.${index}.email`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input type="email" placeholder="jane@customer.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FieldRow>
  );

  const renderSupplierRef = (ref: Reference, index: number) => (
    <FieldRow columns={2}>
      <FormField
        control={form.control}
        name={`references.supplier.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Bob Johnson" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`references.supplier.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Supplier Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`references.supplier.${index}.phone`}
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
        name={`references.supplier.${index}.email`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input type="email" placeholder="bob@supplier.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FieldRow>
  );

  return (
    <div className="space-y-8">
      <FormSection 
        title="Professional Service Providers" 
        description="Your key professional contacts"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Accountant <span className="text-destructive">*</span></h4>
            <FieldRow columns={1}>
              <FormField
                control={form.control}
                name="references.accountant.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Accountant name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.accountant.firm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Accounting firm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.accountant.phone"
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
                name="references.accountant.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="accountant@firm.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldRow>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Attorney <span className="text-destructive">*</span></h4>
            <FieldRow columns={1}>
              <FormField
                control={form.control}
                name="references.attorney.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Attorney name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.attorney.firm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Law firm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.attorney.phone"
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
                name="references.attorney.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="attorney@firm.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldRow>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Bank Contact <span className="text-destructive">*</span></h4>
            <FieldRow columns={1}>
              <FormField
                control={form.control}
                name="references.bank.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Banker name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.bank.bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references.bank.phone"
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
                name="references.bank.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="banker@bank.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldRow>
          </div>
        </div>
      </FormSection>

      <FormSection 
        title="Business References" 
        description="At least 2 business contacts who can speak to your professional capabilities"
      >
        <RepeatableList
          items={businessRefs}
          onAdd={addBusinessRef}
          onRemove={removeBusinessRef}
          renderItem={renderBusinessRef}
          addLabel="Add Business Reference"
          minItems={2}
          maxItems={5}
        />
      </FormSection>

      <FormSection 
        title="Customer References" 
        description="At least 2 customers who can speak to your business relationship"
      >
        <RepeatableList
          items={customerRefs}
          onAdd={addCustomerRef}
          onRemove={removeCustomerRef}
          renderItem={renderCustomerRef}
          addLabel="Add Customer Reference"
          minItems={2}
          maxItems={5}
        />
      </FormSection>

      <FormSection 
        title="Supplier References" 
        description="At least 2 suppliers who can speak to your business relationship"
      >
        <RepeatableList
          items={supplierRefs}
          onAdd={addSupplierRef}
          onRemove={removeSupplierRef}
          renderItem={renderSupplierRef}
          addLabel="Add Supplier Reference"
          minItems={2}
          maxItems={5}
        />
      </FormSection>
    </div>
  );
};