import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSection } from '@/components/application/FormSection';
import { FileUploader } from '@/components/application/FileUploader';

interface MentorStep6Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep6: React.FC<MentorStep6Props> = ({ form }) => {
  const handleFileChange = (fieldName: string, files: any[]) => {
    form.setValue(`uploads.${fieldName}`, files);
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Required Documents" 
        description="Please upload the following documents"
      >
        <div className="space-y-6">
          <FileUploader
            label="Professional Bio"
            description="A detailed professional biography highlighting your experience, achievements, and expertise"
            value={form.watch('uploads.bio') || []}
            onFilesChange={(files) => handleFileChange('bio', files)}
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
        title="Optional Documents" 
        description="Additional materials to enhance your mentor profile"
      >
        <div className="space-y-6">
          <FileUploader
            label="Professional Headshot"
            description="A professional photo for your mentor profile (recommended for public directory)"
            value={form.watch('uploads.headshot') || []}
            onFilesChange={(files) => handleFileChange('headshot', files)}
            maxFiles={1}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg']
            }}
          />

          <FileUploader
            label="Additional Documents"
            description="Any additional documents that showcase your expertise (awards, certifications, articles, etc.)"
            value={form.watch('uploads.additionalDocs') || []}
            onFilesChange={(files) => handleFileChange('additionalDocs', files)}
            maxFiles={5}
            multiple
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg']
            }}
          />
        </div>
      </FormSection>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Profile Visibility</h4>
        <p className="text-sm text-green-800">
          Your professional bio and headshot may be featured in our public mentor directory 
          to help mentees learn about your background and expertise. You can opt out of 
          public visibility during the final review process.
        </p>
      </div>
    </div>
  );
};