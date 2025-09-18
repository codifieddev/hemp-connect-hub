import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '@/components/application/FormSection';
import { FileUploader } from '@/components/application/FileUploader';

interface MenteeStep7Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep7: React.FC<MenteeStep7Props> = ({ form }) => {
  const handleFileChange = (fieldName: string, files: any[]) => {
    form.setValue(`uploads.${fieldName}`, files);
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Required Documents" 
        description="Please upload the following required documents"
      >
        <div className="space-y-6">
          <FileUploader
            label="Cover Letter"
            description="A brief cover letter explaining your interest in HEMP"
            value={form.watch('uploads.coverLetter') || []}
            onFilesChange={(files) => handleFileChange('coverLetter', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
            }}
          />

          <FileUploader
            label="Organization Chart"
            description="Current organizational structure of your company"
            value={form.watch('uploads.orgChart') || []}
            onFilesChange={(files) => handleFileChange('orgChart', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf'],
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg']
            }}
          />

          <FileUploader
            label="Personal Bio or Resume"
            description="Your professional background and experience"
            value={form.watch('uploads.personalBioOrResume') || []}
            onFilesChange={(files) => handleFileChange('personalBioOrResume', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
            }}
          />

          <FileUploader
            label="Business Description"
            description="Detailed description of your business, products, and services"
            value={form.watch('uploads.businessDescription') || []}
            onFilesChange={(files) => handleFileChange('businessDescription', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
            }}
          />
        </div>
      </FormSection>

      <FormSection 
        title="Legal Releases" 
        description="Required legal documentation"
      >
        <div className="space-y-6">
          <FileUploader
            label="General Release"
            description="General liability release form"
            value={form.watch('uploads.releaseGeneral') || []}
            onFilesChange={(files) => handleFileChange('releaseGeneral', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf']
            }}
          />

          <FileUploader
            label="Information Authorization Release"
            description="Authorization to verify information provided"
            value={form.watch('uploads.releaseInfoAuthorization') || []}
            onFilesChange={(files) => handleFileChange('releaseInfoAuthorization', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf']
            }}
          />

          <FileUploader
            label="Application Information Release"
            description="Release for sharing application information with mentors"
            value={form.watch('uploads.releaseApplicationInfo') || []}
            onFilesChange={(files) => handleFileChange('releaseApplicationInfo', files)}
            maxFiles={1}
            required
            accept={{
              'application/pdf': ['.pdf']
            }}
          />
        </div>
      </FormSection>

      <FormSection 
        title="Optional Documents" 
        description="Additional materials to enhance your application"
      >
        <FileUploader
          label="Professional Headshot"
          description="A professional photo for your profile (optional but recommended)"
          value={form.watch('uploads.headshot') || []}
          onFilesChange={(files) => handleFileChange('headshot', files)}
          maxFiles={1}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
          }}
        />
      </FormSection>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 mb-2">Financial Statements</h4>
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Please provide last 3 years accrual-basis financial statements 
          (balance sheets & income statements) physically or as instructed by HEMP office. 
          These will be requested separately from this online application.
        </p>
      </div>
    </div>
  );
};