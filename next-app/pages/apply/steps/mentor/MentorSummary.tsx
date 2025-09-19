import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, CheckCircle, AlertCircle } from 'lucide-react';

interface MentorSummaryProps {
  form: UseFormReturn<any>;
  onSubmit: () => void;
  onPrevious: () => void;
}

export const MentorSummary: React.FC<MentorSummaryProps> = ({ form, onSubmit, onPrevious }) => {
  const formData = form.getValues();
  
  const validateSection = (sectionData: any, requiredFields: string[]): boolean => {
    return requiredFields.every(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], sectionData);
      return value !== undefined && value !== null && value !== '';
    });
  };

  const sections = [
    {
      title: 'Person & Business',
      step: 0,
      data: formData,
      isValid: validateSection(formData, [
        'person.firstName',
        'person.lastName', 
        'person.email',
        'company.name'
      ])
    },
    {
      title: 'Background',
      step: 1,
      data: formData,
      isValid: validateSection(formData, [
        'background.yearsInLeadershipOrOwnership',
        'company.type'
      ])
    },
    {
      title: 'Mentor Preferences',
      step: 2,
      data: formData,
      isValid: validateSection(formData, [
        'preferences.expertiseAreas',
        'preferences.meetingPreference'
      ]) && formData.preferences?.expertiseAreas?.length > 0
    },
    {
      title: 'Strengths & Reflection',
      step: 3,
      data: formData,
      isValid: validateSection(formData, [
        'narratives.biggestSuccess',
        'narratives.whyHEMP'
      ])
    },
    {
      title: 'References',
      step: 4,
      data: formData,
      isValid: formData.references?.business?.length >= 3
    },
    {
      title: 'Uploads',
      step: 5,
      data: formData,
      isValid: formData.uploads?.bio?.length > 0
    },
    {
      title: 'Signature',
      step: 6,
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
          <CardTitle>Mentor Application Summary</CardTitle>
          <p className="text-muted-foreground">
            Review your information before submitting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[0].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Personal Information
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {formData.person?.firstName} {formData.person?.lastName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {formData.person?.email}
              </div>
              <div>
                <span className="font-medium">Title:</span> {formData.person?.title}
              </div>
              <div>
                <span className="font-medium">Company:</span> {formData.company?.name}
              </div>
            </div>
          </div>

          <Separator />

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[1].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Leadership Experience
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Years in Leadership:</span> {formData.background?.yearsInLeadershipOrOwnership}
              </div>
              <div>
                <span className="font-medium">Company Type:</span> {formData.company?.type}
              </div>
              <div>
                <span className="font-medium">Team Size:</span> {formData.team?.total || 0} people
              </div>
              <div>
                <span className="font-medium">Industries:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.company?.industry?.slice(0, 3).map((ind: string) => (
                    <Badge key={ind} variant="outline" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                  {formData.company?.industry?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{formData.company.industry.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Mentoring Preferences */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[2].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                Mentoring Preferences
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Hours/Month:</span> {formData.preferences?.availabilityHoursPerMonth || 0}
              </div>
              <div>
                <span className="font-medium">Mentee Capacity:</span> {formData.preferences?.capacityMentees || 0}
              </div>
              <div>
                <span className="font-medium">Meeting Preference:</span> {formData.preferences?.meetingPreference}
              </div>
              <div>
                <span className="font-medium">Expertise Areas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.preferences?.expertiseAreas?.slice(0, 3).map((area: string) => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                  {formData.preferences?.expertiseAreas?.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{formData.preferences.expertiseAreas.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* References */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[4].isValid ? (
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                )}
                References
              </h4>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              <span className="font-medium">Business References:</span> {formData.references?.business?.length || 0} provided
              {formData.references?.business?.length < 3 && (
                <span className="text-destructive ml-2">(minimum 3 required)</span>
              )}
            </div>
          </div>

          <Separator />

          {/* Uploads Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center">
                {sections[5].isValid ? (
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
                { key: 'bio', label: 'Professional Bio', required: true },
                { key: 'headshot', label: 'Headshot (Optional)', required: false },
                { key: 'additionalDocs', label: 'Additional Documents (Optional)', required: false }
              ].map(({ key, label, required }) => (
                <div key={key} className="flex items-center">
                  {formData.uploads?.[key]?.length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                  ) : (
                    <AlertCircle className={`h-4 w-4 mr-2 ${required ? 'text-destructive' : 'text-muted-foreground'}`} />
                  )}
                  <span className={formData.uploads?.[key]?.length > 0 ? '' : required ? 'text-destructive' : 'text-muted-foreground'}>
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
                {sections[6].isValid ? (
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