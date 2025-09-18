import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '@/components/application/FormSection';
import { SignatureField } from '@/components/application/SignatureField';
import { MENTOR_CONSENT_TEXT } from '@/data/applicationData';

interface MentorStep7Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep7: React.FC<MentorStep7Props> = ({ form }) => {
  const mentorName = `${form.watch('person.firstName') || ''} ${form.watch('person.lastName') || ''}`.trim();

  const handleSignatureChange = (signature: any) => {
    form.setValue('signature', {
      ...signature,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1' // In a real app, this would be captured from the request
    });
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Legal Authorization" 
        description="Please review and sign to complete your mentor application"
      >
        <div className="bg-muted/50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Mentor Agreement and Authorization</h4>
          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed">
              {MENTOR_CONSENT_TEXT}
            </p>
          </div>
        </div>

        <SignatureField
          value={form.watch('signature')}
          onChange={handleSignatureChange}
          requiredName={mentorName}
          consentText="I have read, understood, and agree to the terms and conditions stated above. I certify that all information provided in this application is true and complete to the best of my knowledge. I commit to serving as a mentor in accordance with HEMP guidelines and code of conduct."
          title="Electronic Signature"
        />
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
        <div className="text-sm text-blue-800 space-y-2">
          <p>After submitting your mentor application:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>You'll receive a confirmation email with your application summary</li>
            <li>Our team will review your application and references within 1-2 weeks</li>
            <li>If selected, you'll be invited to a mentor orientation session</li>
            <li>Upon completion of orientation, you'll be matched with mentees</li>
            <li>Your mentoring relationships will typically last 6-12 months</li>
          </ul>
        </div>
      </div>
    </div>
  );
};