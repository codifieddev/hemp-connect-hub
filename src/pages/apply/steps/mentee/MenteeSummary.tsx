import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, CheckCircle, AlertCircle } from 'lucide-react';

interface MenteeSummaryProps {
  form: UseFormReturn<any>;
  onSubmit: () => void;
  onPrevious: () => void;
}

export const MenteeSummary: React.FC<MenteeSummaryProps> = ({ form, onSubmit, onPrevious }) => {
  const formData = form.getValues();
  
  const isNonEmpty = (v: any) => v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');

  const validateSection = (sectionData: any, requiredFields: string[]): boolean => {
    return requiredFields.every(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], sectionData);
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return value && Object.keys(value).length > 0;
      return isNonEmpty(value);
    });
  };

  const sections = [
    {
      title: 'Applicant & Business',
      step: 0,
      data: formData,
      isValid: validateSection(formData, [
        'applicant.firstName',
        'applicant.lastName', 
        'applicant.email',
        'company.name'
      ])
    },
    {
      title: 'Company Basics',
      step: 1,
      data: formData,
      isValid: validateSection(formData, [
        'company.yearsInBusiness',
        'company.fiscalYearEnd'
      ])
    },
    {
      title: 'Team',
      step: 2,
      data: formData,
      isValid: validateSection(formData, ['team.total'])
    },
    {
      title: 'Financial Snapshot',
      step: 3,
      data: formData,
      isValid: validateSection(formData, [
        'finance.wasProfitableLastYear',
        'finance.currentlyProfitable'
      ])
    },
    {
      title: 'Strengths & Needs',
      step: 4,
      data: formData,
      isValid: validateSection(formData, [
        'narratives.biggestSuccess',
        'narratives.whyHEMP'
      ])
    },
    {
      title: 'References',
      step: 5,
      data: formData,
      isValid: validateSection(formData, [
        'references.accountant.name',
        'references.attorney.name'
      ])
    },
    {
      title: 'Uploads',
      step: 6,
      data: formData,
      isValid: formData.uploads?.coverLetter?.length > 0
    },
    {
      title: 'Signature',
      step: 7,
      data: formData,
      isValid: formData.signature?.consent && formData.signature?.typedName
    }
  ];

  const allValid = sections.every(section => section.isValid);
  const invalidSections = sections.filter(section => !section.isValid);

  return (
    <div className="space-y-6">
      {!allValid && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              Application Incomplete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Please complete the following sections before submitting:
            </p>
            <div className="space-y-2">
              {invalidSections.map((section) => (
                <div key={section.step} className="flex items-center justify-between">
                  <span className="text-sm">{section.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* Navigate to step */}}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Fix
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Application Summary</CardTitle>
          <p className="text-muted-foreground">
            Review your information before submitting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Applicant Information */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[0].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Applicant Information
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {formData.applicant?.firstName} {formData.applicant?.lastName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {formData.applicant?.email}
              </div>
              <div>
                <span className="font-medium">Title:</span> {formData.applicant?.title}
              </div>
              <div>
                <span className="font-medium">Company:</span> {formData.company?.name}
              </div>
            </div>
          </div>

          <Separator />

          {/* Company Information */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[1].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Company Details
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span> {formData.company?.type}
              </div>
              <div>
                <span className="font-medium">Years in Business:</span> {formData.company?.yearsInBusiness}
              </div>
              <div>
                <span className="font-medium">Industries:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.company?.industry?.map((ind: string) => (
                    <Badge key={ind} variant="outline" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Team Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[2].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Team Composition
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Full-time:</span> {formData.team?.fullTime || 0}
              </div>
              <div>
                <span className="font-medium">Part-time:</span> {formData.team?.partTime || 0}
              </div>
              <div>
                <span className="font-medium">Contractors:</span> {formData.team?.contractors || 0}
              </div>
              <div>
                <span className="font-medium">Total:</span> {formData.team?.total || 0}
              </div>
            </div>
          </div>

          <Separator />

          {/* Uploads Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[6].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Document Uploads
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { key: 'coverLetter', label: 'Cover Letter' },
                { key: 'orgChart', label: 'Organization Chart' },
                { key: 'personalBioOrResume', label: 'Bio/Resume' },
                { key: 'businessDescription', label: 'Business Description' },
                { key: 'releaseGeneral', label: 'General Release' },
                { key: 'releaseInfoAuthorization', label: 'Info Authorization' },
                { key: 'releaseApplicationInfo', label: 'Application Release' },
                { key: 'headshot', label: 'Headshot (Optional)' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center">
                  {formData.uploads?.[key]?.length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                  )}
                  <span className={formData.uploads?.[key]?.length > 0 ? '' : 'text-muted-foreground'}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Signature Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[7].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Electronic Signature
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              {formData.signature?.consent ? (
                <div className="space-y-1">
                  <div><span className="font-medium">Signed by:</span> {formData.signature.typedName}</div>
                  <div><span className="font-medium">Method:</span> {formData.signature.method === 'typed' ? 'Typed Name' : 'Digital Signature'}</div>
                  <div><span className="font-medium">Date:</span> {formData.signature.timestamp ? new Date(formData.signature.timestamp).toLocaleString() : 'Not signed'}</div>
                </div>
              ) : (
                <span className="text-muted-foreground">Not signed</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={!allValid}
          className="bg-primary"
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
};