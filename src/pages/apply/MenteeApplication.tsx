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
import { Layout } from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

// Import step components
import { MenteeStep1 } from './steps/mentee/MenteeStep1';
import { MenteeStep2 } from './steps/mentee/MenteeStep2';
import { MenteeStep3 } from './steps/mentee/MenteeStep3';
import { MenteeStep4 } from './steps/mentee/MenteeStep4';
import { MenteeStep5 } from './steps/mentee/MenteeStep5';
import { MenteeStep6 } from './steps/mentee/MenteeStep6';
import { MenteeStep7 } from './steps/mentee/MenteeStep7';
import { MenteeStep8 } from './steps/mentee/MenteeStep8';
import { MenteeSummary } from './steps/mentee/MenteeSummary';

// Import validation schemas
import { 
  menteeStep1Schema,
  menteeStep2Schema,
  menteeStep3Schema,
  menteeStep4Schema,
  menteeStep5Schema,
  menteeStep6Schema,
  menteeStep7Schema,
  menteeStep8Schema
} from '@/schemas/menteeSchema';

const STEPS = [
  { id: 'step1', title: 'Applicant & Business', description: 'Basic information' },
  { id: 'step2', title: 'Company Basics', description: 'Ownership & governance' },
  { id: 'step3', title: 'Team', description: 'Staffing levels' },
  { id: 'step4', title: 'Financial Snapshot', description: 'Three-year overview' },
  { id: 'step5', title: 'Strengths & Needs', description: 'Assessment & narratives' },
  { id: 'step6', title: 'References', description: 'Professional contacts' },
  { id: 'step7', title: 'Uploads', description: 'Required documents' },
  { id: 'step8', title: 'Signature', description: 'Legal authorization' },
  { id: 'summary', title: 'Summary', description: 'Review & submit' }
];

const VALIDATION_SCHEMAS = [
  menteeStep1Schema,
  menteeStep2Schema,
  menteeStep3Schema,
  menteeStep4Schema,
  menteeStep5Schema,
  menteeStep6Schema,
  menteeStep7Schema,
  menteeStep8Schema,
  z.object({}) // Summary step has no validation
];

export const MenteeApplication: React.FC = () => {
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
    const savedData = localStorage.getItem('mentee-application');
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
        localStorage.setItem('mentee-application', JSON.stringify(saveData));
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
      // Update resolver for next step
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
      description: "Thank you! Your mentee application has been submitted successfully.",
    });
    // Clear saved data
    localStorage.removeItem('mentee-application');
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
      case 0: return <MenteeStep1 {...stepProps} />;
      case 1: return <MenteeStep2 {...stepProps} />;
      case 2: return <MenteeStep3 {...stepProps} />;
      case 3: return <MenteeStep4 {...stepProps} />;
      case 4: return <MenteeStep5 {...stepProps} />;
      case 5: return <MenteeStep6 {...stepProps} />;
      case 6: return <MenteeStep7 {...stepProps} />;
      case 7: return <MenteeStep8 {...stepProps} />;
      case 8: return <MenteeSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentee Application</h1>
          <p className="text-muted-foreground text-center">
            Complete your application to join the HEMP mentee program
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