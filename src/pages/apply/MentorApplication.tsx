import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Stepper } from '@/components/application/Stepper';
import { AutosaveIndicator } from '@/components/application/AutosaveIndicator';
import { ErrorSummary } from '@/components/application/ErrorSummary';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

// Import step components
import { MentorStep1 } from './steps/mentor/MentorStep1';
import { MentorStep2 } from './steps/mentor/MentorStep2';
import { MentorStep3 } from './steps/mentor/MentorStep3';
import { MentorStep4 } from './steps/mentor/MentorStep4';
import { MentorStep5 } from './steps/mentor/MentorStep5';
import { MentorStep6 } from './steps/mentor/MentorStep6';
import { MentorStep7 } from './steps/mentor/MentorStep7';
import { MentorSummary } from './steps/mentor/MentorSummary';

// Import validation schemas
import { 
  mentorStep1Schema,
  mentorStep2Schema,
  mentorStep3Schema,
  mentorStep4Schema,
  mentorStep5Schema,
  mentorStep6Schema,
  mentorStep7Schema
} from '@/schemas/mentorSchema';

const STEPS = [
  { id: 'step1', title: 'Person & Business', description: 'Basic information' },
  { id: 'step2', title: 'Background', description: 'Experience & leadership' },
  { id: 'step3', title: 'Mentor Preferences', description: 'Expertise & availability' },
  { id: 'step4', title: 'Strengths & Reflection', description: 'Assessment & experience' },
  { id: 'step5', title: 'References', description: 'Business contacts' },
  { id: 'step6', title: 'Uploads', description: 'Documents & bio' },
  { id: 'step7', title: 'Signature', description: 'Legal authorization' },
  { id: 'summary', title: 'Summary', description: 'Review & submit' }
];

const VALIDATION_SCHEMAS = [
  mentorStep1Schema,
  mentorStep2Schema,
  mentorStep3Schema,
  mentorStep4Schema,
  mentorStep5Schema,
  mentorStep6Schema,
  mentorStep7Schema,
  z.object({}) // Summary step has no validation
];

export const MentorApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(VALIDATION_SCHEMAS[currentStep]),
    mode: 'onChange',
    defaultValues: {}
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mentor-application');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData.formData);
        setCurrentStep(parsedData.currentStep || 0);
        setLastSaved(new Date(parsedData.lastSaved));
      } catch (error) {
        console.error('Failed to load saved application:', error);
      }
    }
  }, [form]);

  // Autosave functionality
  useEffect(() => {
    const subscription = form.watch((data) => {
      setAutosaveStatus('saving');
      
      const saveData = {
        formData: data,
        currentStep,
        lastSaved: new Date().toISOString()
      };

      try {
        localStorage.setItem('mentor-application', JSON.stringify(saveData));
        setTimeout(() => {
          setAutosaveStatus('saved');
          setLastSaved(new Date());
        }, 1000);
      } catch (error) {
        setAutosaveStatus('error');
        console.error('Failed to save application:', error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, currentStep]);

  const validateCurrentStep = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = Object.entries(form.formState.errors).map(([field, error]) => ({
        field,
        message: error?.message || 'Invalid field',
        step: currentStep
      }));
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors([]);
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      form.clearErrors();
    } else if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      form.clearErrors();
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      form.clearErrors();
    }
  };

  const handleSaveAndFinishLater = () => {
    toast({
      title: "Application Saved",
      description: "You can return to complete your application later using the link in your email.",
    });
    // In a real app, this would send an email with a magic link
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Thank you! Your mentor application has been submitted successfully.",
    });
    // Clear saved data
    localStorage.removeItem('mentor-application');
    // In a real app, this would submit to the backend
  };

  const renderCurrentStep = () => {
    const stepProps = {
      form,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === STEPS.length - 1
    };

    switch (currentStep) {
      case 0: return <MentorStep1 {...stepProps} />;
      case 1: return <MentorStep2 {...stepProps} />;
      case 2: return <MentorStep3 {...stepProps} />;
      case 3: return <MentorStep4 {...stepProps} />;
      case 4: return <MentorStep5 {...stepProps} />;
      case 5: return <MentorStep6 {...stepProps} />;
      case 6: return <MentorStep7 {...stepProps} />;
      case 7: return <MentorSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentor Application</h1>
          <p className="text-muted-foreground text-center">
            Complete your application to join the HEMP mentor program
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Application Progress</CardTitle>
              <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
            </div>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </CardContent>
        </Card>

        {validationErrors.length > 0 && (
          <ErrorSummary
            errors={validationErrors}
            className="mb-6"
          />
        )}

        <Form {...form}>
          <form>
            <Card>
              <CardHeader>
                <CardTitle>{STEPS[currentStep].title}</CardTitle>
                <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
                <Separator />
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveAndFinishLater}
              >
                Save & Finish Later
              </Button>
              
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                
                {currentStep < STEPS.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    className="bg-primary"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};